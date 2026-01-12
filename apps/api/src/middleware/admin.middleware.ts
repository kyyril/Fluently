import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendError } from '../utils/api-response';

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).userId;

        if (!userId) {
            return sendError(res, 'Unauthorized', 401);
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        } as any);

        if (!user || (user as any).role !== 'ADMIN') {
            return sendError(res, 'Admin access required', 403);
        }

        next();
    } catch (error) {
        next(error);
    }
}
