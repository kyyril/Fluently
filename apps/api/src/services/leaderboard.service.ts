import { leaderboardRepository } from '../repositories';
import { redis } from '../config';

const CACHE_TTL = 600; // 10 minutes in seconds

async function getCachedLeaderboard(key: string, fetchFresh: () => Promise<any>) {
    const cached = await redis.get(key);

    if (cached) {
        try {
            return JSON.parse(cached);
        } catch {
            await redis.del(key);
        }
    }

    const freshEntries = await fetchFresh();
    await redis.set(key, JSON.stringify(freshEntries), 'EX', CACHE_TTL);
    return freshEntries;
}

export async function getWeeklyLeaderboard(userId?: string) {
    const [entries, userRank] = await Promise.all([
        getCachedLeaderboard('leaderboard:weekly', () => leaderboardRepository.getWeeklyLeaderboard()),
        userId ? leaderboardRepository.getWeeklyUserRank(userId) : Promise.resolve(null)
    ]);

    return {
        entries,
        userRank,
        period: 'weekly' as const,
    };
}

export async function getAllTimeLeaderboard(userId?: string) {
    const [entries, userRank] = await Promise.all([
        getCachedLeaderboard('leaderboard:all-time', () => leaderboardRepository.getAllTimeLeaderboard()),
        userId ? leaderboardRepository.getUserRank(userId) : Promise.resolve(null)
    ]);

    return {
        entries,
        userRank,
        period: 'all-time' as const,
    };
}
