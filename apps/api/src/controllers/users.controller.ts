import { Request, Response, NextFunction } from 'express';
import { usersService, routineService } from '../services';
import { sendSuccess } from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

export async function getMe(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as AuthRequest).userId!;
        const user = await usersService.getProfile(userId);
        sendSuccess(res, user);
    } catch (error) {
        next(error);
    }
}

export async function updateMe(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = (req as AuthRequest).userId!;
        const { displayName, avatarUrl, nativeLanguage, targetLanguage, level } =
            req.body;
        const user = await usersService.updateProfile(userId, {
            displayName,
            avatarUrl,
            nativeLanguage,
            targetLanguage,
            level,
        });
        sendSuccess(res, user);
    } catch (error) {
        next(error);
    }
}

export async function getPublicProfile(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } = req.params;
        const user = await usersService.getPublicProfile(id);
        sendSuccess(res, user);
    } catch (error) {
        next(error);
    }
}

export async function getMyStats(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = (req as AuthRequest).userId!;
        const stats = await usersService.getStats(userId);
        sendSuccess(res, stats);
    } catch (error) {
        next(error);
    }
}

export async function getUserStats(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } = req.params;
        const stats = await usersService.getStats(id);
        sendSuccess(res, stats);
    } catch (error) {
        next(error);
    }
}

export async function getUserHistory(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } = req.params;
        const { limit } = req.query;
        const history = await routineService.getHistory(
            id,
            limit ? parseInt(limit as string) : 30
        );
        sendSuccess(res, history);
    } catch (error) {
        next(error);
    }
}

export async function getMyHistory(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = (req as AuthRequest).userId!;
        const { limit } = req.query;
        const history = await routineService.getHistory(
            userId,
            limit ? parseInt(limit as string) : 30
        );
        sendSuccess(res, history);
    } catch (error) {
        next(error);
    }
}
