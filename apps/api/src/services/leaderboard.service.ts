import { leaderboardRepository } from '../repositories';
import { redis } from '../config';

const CACHE_TTL = 600; // 10 minutes in seconds

export async function getWeeklyLeaderboard(userId?: string) {
    const fetchEntries = async () => {
        const cached = await redis.get('leaderboard:weekly');
        if (cached) return JSON.parse(cached);

        const freshEntries = await leaderboardRepository.getWeeklyLeaderboard();
        await redis.set('leaderboard:weekly', JSON.stringify(freshEntries), 'EX', CACHE_TTL);
        return freshEntries;
    };

    const [entries, userRank] = await Promise.all([
        fetchEntries(),
        userId ? leaderboardRepository.getWeeklyUserRank(userId) : Promise.resolve(null)
    ]);

    return {
        entries,
        userRank,
        period: 'weekly' as const,
    };
}

export async function getAllTimeLeaderboard(userId?: string) {
    const fetchEntries = async () => {
        const cached = await redis.get('leaderboard:all-time');
        if (cached) return JSON.parse(cached);

        const freshEntries = await leaderboardRepository.getAllTimeLeaderboard();
        await redis.set('leaderboard:all-time', JSON.stringify(freshEntries), 'EX', CACHE_TTL);
        return freshEntries;
    };

    const [entries, userRank] = await Promise.all([
        fetchEntries(),
        userId ? leaderboardRepository.getUserRank(userId) : Promise.resolve(null)
    ]);

    return {
        entries,
        userRank,
        period: 'all-time' as const,
    };
}
