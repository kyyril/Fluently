import { prisma } from '../config/database';

export async function getWeeklyLeaderboard(limit: number = 50) {
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() || 7)); // Ensure Monday is start of week

    // 1. Get top users by XP gained this week using groupBy
    const weeklyAggregates = await prisma.dailyLog.groupBy({
        by: ['userId'],
        where: {
            date: { gte: startOfWeek },
            totalXp: { gt: 0 }
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
    const userIds = weeklyAggregates.map(a => a.userId);
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
        .map((agg, index) => {
            const user = users.find(u => u.id === agg.userId);
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
            role: 'USER'
        },
    } as any);

    return rank + 1;
}
