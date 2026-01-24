import { Request, Response, NextFunction } from 'express';
import { tasksService, usersService } from '../services';
import { sendSuccess } from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

export async function completeTask(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = (req as AuthRequest).userId!;
        const { taskId } = req.params;
        const { metadata } = req.body;
        const result = await tasksService.completeTask(userId, taskId, metadata);
        sendSuccess(res, result);
    } catch (error) {
        next(error);
    }
}

