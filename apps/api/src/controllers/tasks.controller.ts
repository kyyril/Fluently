import { Request, Response, NextFunction } from 'express';
import { tasksService, aiService, usersService, routineService } from '../services';
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
        const result = await tasksService.completeTask(userId, taskId);
        sendSuccess(res, result);
    } catch (error) {
        next(error);
    }
}

export async function updateTask(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = (req as AuthRequest).userId!;
        const { taskId } = req.params;
        const { metadata } = req.body;
        const result = await tasksService.updateTaskMetadata(userId, taskId, metadata);
        sendSuccess(res, result);
    } catch (error) {
        next(error);
    }
}

export async function reviewDayRecap(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = (req as AuthRequest).userId!;
        const { content, dailyLogId } = req.body;

        // Get user's target language
        const user = await usersService.getProfile(userId);

        // Get AI review
        const review = await aiService.reviewGrammar(content, user.targetLanguage);

        // Save day recap with AI review
        if (dailyLogId) {
            await tasksService.saveDayRecap(
                userId,
                dailyLogId,
                content,
                JSON.stringify(review)
            );
        }

        sendSuccess(res, {
            ...review,
            saved: !!dailyLogId,
        });
    } catch (error) {
        next(error);
    }
}

export async function generateSentences(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = (req as AuthRequest).userId!;
        const { verbs } = req.body;

        const user = await usersService.getProfile(userId);
        const sentences = await aiService.generatePracticeSentences(
            verbs,
            user.targetLanguage,
            user.level
        );

        sendSuccess(res, { sentences });
    } catch (error) {
        next(error);
    }
}
