import { Request, Response, NextFunction } from 'express';
import { routineService } from '../services';
import { sendSuccess } from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

export async function getToday(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = (req as AuthRequest).userId!;
        const routine = await routineService.getTodayRoutine(userId);
        sendSuccess(res, routine);
    } catch (error) {
        next(error);
    }
}

export async function getHistory(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = (req as AuthRequest).userId!;
        const limit = parseInt(req.query.limit as string) || 30;
        const offset = parseInt(req.query.offset as string) || 0;

        const history = await routineService.getHistory(userId, limit, offset);
        sendSuccess(res, history);
    } catch (error) {
        next(error);
    }
}
