import { prisma } from '../config/database';
import { TaskType } from '../prisma-client';

const ALL_TASK_TYPES: TaskType[] = [
    'PODCAST_LISTENING',
    'CREATE_SENTENCES',
    'SPEAKING_SESSION',
    'DAY_RECAP',
];

export async function findDailyLog(userId: string, date: Date) {
    return prisma.dailyLog.findUnique({
        where: {
            userId_date: { userId, date },
        },
        include: {
            tasks: {
                orderBy: { taskType: 'asc' },
            },
        },
    });
}

export async function findDailyLogById(id: string) {
    return prisma.dailyLog.findUnique({
        where: { id },
        include: {
            tasks: true,
        },
    });
}

export async function createDailyLog(userId: string, date: Date) {
    return prisma.dailyLog.create({
        data: {
            userId,
            date,
            tasks: {
                create: ALL_TASK_TYPES.map((taskType) => ({
                    taskType,
                    completed: false,
                    xpEarned: 0,
                })),
            },
        },
        include: {
            tasks: {
                orderBy: { taskType: 'asc' },
            },
        },
    });
}

export async function getDailyLogHistory(
    userId: string,
    limit: number = 30,
    offset: number = 0
) {
    return prisma.dailyLog.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: limit,
        skip: offset,
        include: {
            tasks: {
                orderBy: { taskType: 'asc' },
            },
        },
    });
}

export async function updateDayRecap(
    dailyLogId: string,
    dayRecap: string,
    aiReview?: string
) {
    return prisma.dailyLog.update({
        where: { id: dailyLogId },
        data: {
            dayRecap,
            aiReview,
        },
    });
}

export async function addXpToLog(dailyLogId: string, xp: number) {
    return prisma.dailyLog.update({
        where: { id: dailyLogId },
        data: {
            totalXp: { increment: xp },
        },
    });
}
