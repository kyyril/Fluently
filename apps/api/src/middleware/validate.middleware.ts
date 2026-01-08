import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { sendError } from '../utils/api-response';

/**
 * Validation middleware using Zod schemas
 * 
 * Usage:
 * router.post('/endpoint', validate(MySchema), controller.handler)
 */
export function validate(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
                return sendError(res, messages.join(', '), 400, 'VALIDATION_ERROR');
            }
            next(error);
        }
    };
}
