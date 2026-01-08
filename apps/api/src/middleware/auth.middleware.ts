import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UnauthorizedError } from '../utils/errors';

export interface AuthRequest extends Request {
    userId?: string;
}

/**
 * JWT authentication middleware
 */
export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedError('Missing or invalid authorization header');
        }

        const token = authHeader.slice(7);
        const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };

        req.userId = decoded.userId;
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
