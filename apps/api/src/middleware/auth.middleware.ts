import { Request, Response, NextFunction } from 'express';
import * as jose from 'jose';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import { userRepository } from '../repositories';

// Configure JWKS from Neon Auth
const JWKS = jose.createRemoteJWKSet(new URL(process.env.NEON_AUTH_JWKS_URL!));

export interface AuthRequest extends Request {
    userId?: string;
    userEmail?: string;
    role?: string;
}

/**
 * JWT authentication middleware using jose (supports EdDSA)
 */
export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return next(new UnauthorizedError('Missing authorization header'));
    }

    const token = authHeader.slice(7);

    try {
        // jose.jwtVerify handles EdDSA and JWKS automatically
        const { payload } = await jose.jwtVerify(token, JWKS);

        const neonUserId = payload.sub;
        if (!neonUserId) {
            throw new Error('Token subject missing');
        }

        // Try to find or auto-provision user
        let user: any = await userRepository.findById(neonUserId);
        const adminEmail = process.env.ADMIN_EMAIL;
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
