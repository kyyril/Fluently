import * as fs from 'fs';
import * as crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import * as jose from 'jose';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import { userRepository } from '../repositories';
import { prisma } from '../config/database';
import { config } from '../config';

// Configure JWKS from Neon Auth
const JWKS = jose.createRemoteJWKSet(new URL(config.neonAuthJwksUrl));

export interface AuthRequest extends Request {
    userId?: string;
    userEmail?: string;
    role?: string;
}

/**
 * JWT authentication middleware using jose (supports EdDSA from Neon Auth)
 */
export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return next(new UnauthorizedError('Missing authorization header'));
    }

    const token = authHeader.slice(7);

    try {
        let payload: any;
        let neonUserId: string | undefined;

        // Try Local JWT first (standard HMAC-SHA256)
        try {
            const secret = new TextEncoder().encode(config.jwtSecret);
            const verified = await jose.jwtVerify(token, secret);
            payload = verified.payload;
            neonUserId = payload.sub;
            console.log('[API Auth] Verified via Local JWT');
        } catch (localErr: any) {
            // Try Neon Auth JWKS (standard Remote JWKS)
            try {
                const verified = await jose.jwtVerify(token, JWKS);
                payload = verified.payload;
                neonUserId = payload.sub;
                console.log('[API Auth] Verified via Neon JWKS');
            } catch (neonErr: any) {
                // FALLBACK: Try Session Token verification (direct DB check for Better Auth)
                try {
                    const sessionTable = (prisma as any).session;
                    if (!sessionTable) {
                        throw new Error('Prisma session table not found');
                    }

                    // Better Auth stores the SHA-256 hash of the session token
                    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
                    console.log(`[API Auth] Checking DB for token hash: ${hashedToken.substring(0, 10)}...`);

                    // Try both raw and hashed (just in case)
                    let sessionSize = await sessionTable.count();
                    console.log(`[API Auth] Total sessions in DB: ${sessionSize}`);

                    const session = await sessionTable.findFirst({
                        where: {
                            OR: [
                                { token: token },
                                { token: hashedToken }
                            ]
                        },
                        include: { user: true }
                    });

                    if (session && session.expiresAt > new Date()) {
                        if (!session.user) {
                            throw new Error('Session found but user is missing from database');
                        }
                        payload = {
                            sub: session.userId,
                            email: session.user.email,
                            name: session.user.displayName || (session.user as any).name || (session.user as any).email
                        };
                        neonUserId = session.userId;
                        console.log('[API Auth] Verified via Session Token DB');
                    } else {
                        // FINAL FALLBACK: Ask Neon Auth API directly (for Opaque Tokens)
                        const neonBaseUrl = config.neonAuthJwksUrl.split('/.well-known')[0];
                        console.log(`[API Auth] Verification fallback via Neon API: ${neonBaseUrl}/get-session`);

                        const neonResponse = await fetch(`${neonBaseUrl}/get-session`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Origin': 'http://localhost:3000'
                            }
                        });

                        if (neonResponse.ok) {
                            const neonData = await neonResponse.json();
                            fs.appendFileSync('auth_debug.log', `[${new Date().toISOString()}] Neon Data: ${JSON.stringify(neonData)}\n`);

                            if (neonData && (neonData.user || neonData.session)) {
                                const userData = neonData.user || neonData.session?.user;
                                if (!userData) throw new Error('User data missing in Neon session');

                                payload = {
                                    sub: userData.id,
                                    email: userData.email,
                                    name: userData.name || userData.email
                                };
                                neonUserId = payload.sub;
                                console.log(`[API Auth] Verified via Neon Auth API for user: ${payload.email}`);
                            } else {
                                console.error('[API Auth] Neon API returned empty session:', JSON.stringify(neonData));
                                throw new Error('Neon API session not found or user data empty');
                            }
                        } else {
                            const errBody = await neonResponse.text().catch(() => 'No body');
                            console.error(`[API Auth] Neon API Error Status: ${neonResponse.status}, Body: ${errBody}`);
                            throw new Error(`Neon API rejected token with status: ${neonResponse.status}`);
                        }
                    }
                } catch (sessionErr: any) {
                    console.error('[API Auth] Session/API verification failed:', sessionErr.message);
                    throw new Error(`Invalid token format or signature. (Local: ${localErr.message}, Neon: ${neonErr.message}, Session/API: ${sessionErr.message})`);
                }
            }
        }

        if (!neonUserId) {
            throw new Error('Token subject (userId/sub) missing from payload');
        }

        // Try to find or auto-provision user
        let user: any = await userRepository.findById(neonUserId);
        const adminEmail = config.adminEmail;
        const isTargetAdmin = payload.email && adminEmail && payload.email === adminEmail;

        if (!user && payload.email) {
            // Fallback: Check if user was seeded by email
            const seededUser = await userRepository.findUserByEmail(payload.email as string);

            if (seededUser) {
                console.log('[API Auth] Linking seeded user to Neon ID:', payload.email);
                await userRepository.linkNeonAccount(seededUser.id, neonUserId);
                // Refresh user object after ID update
                user = await userRepository.findById(neonUserId);
            } else {
                console.log('[API Auth] Creating new account for:', payload.email);
                user = await userRepository.upsert({
                    id: neonUserId,
                    email: payload.email as string,
                    displayName: (payload.name as string) || (payload.email as string).split('@')[0],
                    role: isTargetAdmin ? 'ADMIN' : 'USER'
                });
            }
        } else if (user && isTargetAdmin && user.role !== 'ADMIN') {
            // Promote to admin if email matches and not already admin
            console.log('[API Auth] Promoting user to admin:', payload.email);
            user = await userRepository.updateProfile(user.id, { role: 'ADMIN' });
        }

        req.userId = neonUserId;
        req.userEmail = payload.email as string;
        req.role = user ? (user as any).role : (isTargetAdmin ? 'ADMIN' : 'USER');

        next();
    } catch (error: any) {
        console.error('[API Auth] Verification failed:', error.message);
        return next(new UnauthorizedError(`Invalid token: ${error.message}`));
    }
}

/**
 * Admin authorization middleware
 */
export function authorizeAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    if (req.role !== 'ADMIN') {
        return next(new ForbiddenError('Admin access required'));
    }
    next();
}

/**
 * Optional authentication
 */
export async function optionalAuth(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        try {
            const { payload } = await jose.jwtVerify(token, JWKS);
            req.userId = payload.sub;

            const user = await userRepository.findById(payload.sub!);
            if (user) req.role = (user as any).role;
        } catch (err) {
            // Silently fail for optional auth
        }
    }
    next();
}
