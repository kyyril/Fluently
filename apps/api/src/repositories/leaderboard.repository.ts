import { prisma } from '../config/database';

export async function getWeeklyLeaderboard(limit: number = 50) {
    const startOfWeek = new Date();
    const day = startOfWeek.getDay();
    const diff = (day + 6) % 7; // Monday is 0, Sunday is 6
    startOfWeek.setDate(startOfWeek.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);

    // 1. Get top users by XP gained this week using groupBy
    const weeklyAggregates = await prisma.dailyLog.groupBy({
        by: ['userId'],
        where: {
            date: { gte: startOfWeek },
            totalXp: { gt: 0 },
            user: {
                role: 'USER' // Only count regular users
            }
        },
        _sum: {
            totalXp: true
        },
        orderBy: {
            _sum: {
                totalXp: 'desc'
            }
        },
        take: limit
    });

    if (weeklyAggregates.length === 0) return [];

    // 2. Fetch user details for these users
    const userIds = weeklyAggregates.map((a: { userId: string }) => a.userId);
    const users = await prisma.user.findMany({
        where: {
            id: { in: userIds },
            role: 'USER'
        },
        select: {
            id: true,
            displayName: true,
            avatarUrl: true,
            targetLanguage: true,
            level: true,
        },
    });

    // 3. Map back to entries
    return weeklyAggregates
        .map((agg: { userId: string; _sum: { totalXp: number | null } }, index: number) => {
            const user = users.find((u: { id: string }) => u.id === agg.userId);
            if (!user) return null;
            return {
                rank: index + 1,
                user,
                xp: agg._sum.totalXp || 0,
            };
        })
        .filter(Boolean);
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
        where: {
            role: 'USER'
        },
        orderBy: {
            totalXp: 'desc',
        },
        take: limit,
    } as any);

    return users.map((user: any, index: number) => ({
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
        select: { totalXp: true, role: true },
    });

    if (!user || user.role === 'ADMIN') return null;

    const rank = await prisma.user.count({
        where: {
            totalXp: { gt: user.totalXp },
            role: 'USER'
        },
    } as any);

    return rank + 1;
}

export async function getWeeklyUserRank(userId: string): Promise<number | null> {
    const startOfWeek = new Date();
    const day = startOfWeek.getDay();
    const diff = (day + 6) % 7;
    startOfWeek.setDate(startOfWeek.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);

    // Get current user's weekly XP
    const userWeeklyLog = await prisma.dailyLog.aggregate({
        _sum: { totalXp: true },
        where: {
            userId,
            date: { gte: startOfWeek }
        }
    });

    const userXp = userWeeklyLog._sum.totalXp || 0;
    if (userXp === 0) return null;

    // Count how many users have more weekly XP
    const higherXpUsers = await prisma.dailyLog.groupBy({
        by: ['userId'],
        where: {
            date: { gte: startOfWeek },
            user: { role: 'USER' }
        },
        _sum: { totalXp: true },
        having: {
            totalXp: {
                _sum: { gt: userXp }
            }
        }
    });

    return higherXpUsers.length + 1;
}

