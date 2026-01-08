import { Request, Response, NextFunction } from 'express';
import { leaderboardService } from '../services';
import { sendSuccess } from '../utils/api-response';
import { AuthRequest } from '../middleware/auth.middleware';

export async function getWeekly(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = (req as AuthRequest).userId;
        const leaderboard = await leaderboardService.getWeeklyLeaderboard(userId);
        sendSuccess(res, leaderboard);
    } catch (error) {
        next(error);
    }
}

export async function getAllTime(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = (req as AuthRequest).userId;
        const leaderboard = await leaderboardService.getAllTimeLeaderboard(userId);
        sendSuccess(res, leaderboard);
    } catch (error) {
        next(error);
    }
}
