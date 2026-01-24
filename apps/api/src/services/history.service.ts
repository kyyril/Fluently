import { prisma } from '../config/database';
import { TaskType } from '@prisma/client';

export interface HistoryFilters {
    userId: string;
    startDate?: Date;
    endDate?: Date;
    taskType?: TaskType;
    limit?: number;
    offset?: number;
}

export interface DetailedHistoryEntry {
    id: string;
    date: string;
    totalXp: number;
    tasksCompleted: number;
    totalTasks: number;
    dayRecap: string | null;
    tasks: {
        id: string;
        taskType: string;
        completed: boolean;
        completedAt: string | null;
        xpEarned: number;
        metadata: Record<string, unknown> | null;
    }[];
}

export interface HistorySummary {
    totalSessions: number;
    totalXp: number;
    totalDays: number;
    taskBreakdown: Record<string, { count: number; totalXp: number }>;
}

/**
 * Get detailed learning history with filters
 */
export async function getDetailedHistory(filters: HistoryFilters): Promise<{
    entries: DetailedHistoryEntry[];
    summary: HistorySummary;
    pagination: { total: number; hasMore: boolean };
}> {
    const { userId, startDate, endDate, taskType, limit = 50, offset = 0 } = filters;

    // Build date filter
    const dateFilter: { gte?: Date; lte?: Date } = {};
    if (startDate) dateFilter.gte = startDate;
    if (endDate) dateFilter.lte = endDate;

    // Get daily logs with tasks
    const [logs, totalCount] = await Promise.all([
        prisma.dailyLog.findMany({
            where: {
                userId,
                ...(Object.keys(dateFilter).length > 0 && { date: dateFilter }),
            },
            orderBy: { date: 'desc' },
            take: limit,
            skip: offset,
            include: {
                tasks: {
                    where: taskType ? { taskType, completed: true } : { completed: true },
                    orderBy: { taskType: 'asc' },
                },
            },
        }),
        prisma.dailyLog.count({
            where: {
                userId,
                ...(Object.keys(dateFilter).length > 0 && { date: dateFilter }),
            },
        }),
    ]);

    // Filter out logs without completed tasks when filtering by task type
    const filteredLogs = taskType
        ? logs.filter(log => log.tasks.length > 0)
        : logs;

    // Get summary statistics
    const allCompletedTasks = await prisma.taskCompletion.findMany({
        where: {
            completed: true,
            dailyLog: {
                userId,
                ...(Object.keys(dateFilter).length > 0 && { date: dateFilter }),
            },
            ...(taskType && { taskType }),
        },
        select: {
            taskType: true,
            xpEarned: true,
        },
    });

    // Calculate task breakdown
    const taskBreakdown: Record<string, { count: number; totalXp: number }> = {};
    for (const task of allCompletedTasks) {
        if (!taskBreakdown[task.taskType]) {
            taskBreakdown[task.taskType] = { count: 0, totalXp: 0 };
        }
        taskBreakdown[task.taskType].count += 1;
        taskBreakdown[task.taskType].totalXp += task.xpEarned;
    }

    // Build response
    // Exclude deprecated tasks and SPEAKING_SESSION (no content to review)
    const EXCLUDED_TASKS = ['LEARN_VERBS', 'SPEAKING_SESSION'];

    const entries: DetailedHistoryEntry[] = filteredLogs.map(log => {
        const activeTasks = log.tasks.filter(t => !EXCLUDED_TASKS.includes(t.taskType));
        return {
            id: log.id,
            date: (log.date || new Date()).toISOString().split('T')[0],
            totalXp: log.totalXp,
            tasksCompleted: activeTasks.length,
            totalTasks: 3, // Active tasks: PODCAST, SENTENCES, DAY_RECAP (excluding SPEAKING_SESSION)
            dayRecap: log.dayRecap,
            tasks: activeTasks.map(task => ({
                id: task.id,
                taskType: task.taskType,
                completed: task.completed,
                completedAt: task.completedAt?.toISOString() || null,
                xpEarned: task.xpEarned,
                metadata: task.metadata as Record<string, unknown> | null,
            })),
        };
    });

    const summary: HistorySummary = {
        totalSessions: allCompletedTasks.length,
        totalXp: allCompletedTasks.reduce((sum, t) => sum + t.xpEarned, 0),
        totalDays: filteredLogs.length,
        taskBreakdown,
    };

    return {
        entries,
        summary,
        pagination: {
            total: totalCount,
            hasMore: offset + limit < totalCount,
        },
    };
}

/**
 * Get history periods for quick filtering
 */
export function getDateRangeForPeriod(period: 'week' | 'month' | '3months' | 'all'): {
    startDate?: Date;
    endDate?: Date;
} {
    const now = new Date();
    now.setHours(23, 59, 59, 999);

    switch (period) {
        case 'week': {
            const start = new Date(now);
            start.setDate(start.getDate() - 7);
            start.setHours(0, 0, 0, 0);
            return { startDate: start, endDate: now };
        }
        case 'month': {
            const start = new Date(now);
            start.setMonth(start.getMonth() - 1);
            start.setHours(0, 0, 0, 0);
            return { startDate: start, endDate: now };
        }
        case '3months': {
            const start = new Date(now);
            start.setMonth(start.getMonth() - 3);
            start.setHours(0, 0, 0, 0);
            return { startDate: start, endDate: now };
        }
        case 'all':
        default:
            return {};
    }
}
