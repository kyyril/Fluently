import { prisma } from '../config/database';

export async function getWeeklyLeaderboard(limit: number = 50) {
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    // Get users with their XP earned this week
    const users = await prisma.user.findMany({
        select: {
            id: true,
            displayName: true,
            avatarUrl: true,
            targetLanguage: true,
            level: true,
            dailyLogs: {
                where: {
                    date: { gte: startOfWeek },
                },
                select: {
                    totalXp: true,
                },
            },
        },
        orderBy: {
            totalXp: 'desc',
        },
        take: limit,
    });

    return users.map((user, index) => ({
        rank: index + 1,
        user: {
            id: user.id,
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
            targetLanguage: user.targetLanguage,
            level: user.level,
        },
        xp: user.dailyLogs.reduce((sum, log) => sum + log.totalXp, 0),
    }));
}

export async function getAllTimeLeaderboard(limit: number = 50) {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            displayName: true,
            avatarUrl: true,
            targetLanguage: true,
            level: true,
            totalXp: true,
            currentStreak: true,
        },
        orderBy: {
            totalXp: 'desc',
        },
        take: limit,
    });

    return users.map((user, index) => ({
        rank: index + 1,
        user: {
            id: user.id,
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
            targetLanguage: user.targetLanguage,
            level: user.level,
            currentStreak: user.currentStreak,
        },
        xp: user.totalXp,
    }));
}

export async function getUserRank(userId: string): Promise<number | null> {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { totalXp: true },
    });

    if (!user) return null;

    const rank = await prisma.user.count({
        where: {
            totalXp: { gt: user.totalXp },
        },
    });

    return rank + 1;
}
