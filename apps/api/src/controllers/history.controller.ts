import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { sendSuccess } from '../utils/api-response';
import * as historyService from '../services/history.service';
import { TaskType } from '@prisma/client';

export async function getDetailedHistory(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = (req as AuthRequest).userId!;
        const { period, taskType, limit, offset } = req.query;

        // Parse period to date range
        const dateRange = historyService.getDateRangeForPeriod(
            (period as 'week' | 'month' | '3months' | 'all') || 'all'
        );

        // Build filters
        const filters: historyService.HistoryFilters = {
            userId,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            taskType: taskType as TaskType | undefined,
            limit: limit ? parseInt(limit as string) : 50,
            offset: offset ? parseInt(offset as string) : 0,
        };

        const result = await historyService.getDetailedHistory(filters);
        sendSuccess(res, result);
    } catch (error) {
        next(error);
    }
}
