import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import { userRepository } from '../repositories';

export interface AuthRequest extends Request {
    userId?: string;
    role?: string;
}

/**
 * JWT authentication middleware
 */
export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedError('Missing or invalid authorization header');
        }

        const token = authHeader.slice(7);
        const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };

        // Fetch user to get role
        const user = await userRepository.findById(decoded.userId);
        if (!user) {
            throw new UnauthorizedError('User not found');
        }

        req.userId = decoded.userId;
        req.role = (user as any).role;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(new UnauthorizedError('Invalid token'));
        }
        if (error instanceof jwt.TokenExpiredError) {
            return next(new UnauthorizedError('Token expired'));
        }
        next(error);
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
 * Optional authentication - sets userId if token present but doesn't fail
 */
export function optionalAuth(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.slice(7);
            const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
            req.userId = decoded.userId;
        }

        next();
    } catch {
        // Ignore token errors for optional auth
        next();
    }
}
