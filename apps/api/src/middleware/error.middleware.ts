import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { sendError } from '../utils/api-response';

/**
 * Global error handler middleware
 * Must be registered last in the middleware chain
 */
export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(`[ERROR] ${error.message}`, {
        name: error.name,
        stack: error.stack,
        path: req.path,
        method: req.method,
    });

    // Handle known errors
    if (error instanceof AppError) {
        return sendError(res, error.message, error.statusCode, error.code);
    }

    // Handle Prisma errors
    if (error.name === 'PrismaClientKnownRequestError') {
        return sendError(res, 'Database operation failed', 400, 'DATABASE_ERROR');
    }

    if (error.name === 'PrismaClientValidationError') {
        return sendError(res, 'Invalid data provided', 400, 'VALIDATION_ERROR');
    }

    // Handle unexpected errors
    return sendError(
        res,
        process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : error.message,
        500,
        'INTERNAL_ERROR'
    );
}
