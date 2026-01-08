import { leaderboardRepository } from '../repositories';

export async function getWeeklyLeaderboard(userId?: string) {
    const entries = await leaderboardRepository.getWeeklyLeaderboard();

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
    const entries = await leaderboardRepository.getAllTimeLeaderboard();

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
