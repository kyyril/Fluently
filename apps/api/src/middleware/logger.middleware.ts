import { Request, Response, NextFunction } from 'express';

/**
 * Middleware for logging request details including execution time
 */
export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, path } = req;

    res.on('finish', () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const statusColor = status >= 400 ? '❌' : '✅';

        console.log(`${statusColor} [${method}] ${path} - ${status} (${duration}ms)`);
    });

    next();
}
