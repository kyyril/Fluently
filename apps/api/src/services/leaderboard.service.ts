import { leaderboardRepository } from '../repositories';
import { redis } from '../config';

const CACHE_TTL = 300; // 5 minutes in seconds

export async function getWeeklyLeaderboard(userId?: string) {
    let entries;
    const cached = await redis.get('leaderboard:weekly');

    if (cached) {
        entries = JSON.parse(cached);
    } else {
        entries = await leaderboardRepository.getWeeklyLeaderboard();
        await redis.set('leaderboard:weekly', JSON.stringify(entries), 'EX', CACHE_TTL);
    }

    let userRank: number | null = null;
    if (userId) {
        userRank = await leaderboardRepository.getUserRank(userId);
    }

    return {
        entries,
        userRank,
        period: 'weekly' as const,
    };
}

export async function getAllTimeLeaderboard(userId?: string) {
    let entries;
    const cached = await redis.get('leaderboard:all-time');

    if (cached) {
        entries = JSON.parse(cached);
    } else {
        entries = await leaderboardRepository.getAllTimeLeaderboard();
        await redis.set('leaderboard:all-time', JSON.stringify(entries), 'EX', CACHE_TTL);
    }

    let userRank: number | null = null;
    if (userId) {
        userRank = await leaderboardRepository.getUserRank(userId);
    }

    return {
        entries,
        userRank,
        period: 'all-time' as const,
    };
}
