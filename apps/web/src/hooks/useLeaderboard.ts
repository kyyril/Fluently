'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

interface LeaderboardUser {
    id: string;
    displayName: string;
    avatarUrl: string | null;
    targetLanguage: string;
    level: string;
    currentStreak?: number;
}

interface LeaderboardEntry {
    rank: number;
    user: LeaderboardUser;
    xp: number;
}

interface Leaderboard {
    entries: LeaderboardEntry[];
    userRank: number | null;
    period: 'weekly' | 'all-time';
}

export function useWeeklyLeaderboard() {
    return useQuery({
        queryKey: ['leaderboard', 'weekly'],
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: Leaderboard }>(
                '/leaderboard/weekly'
            );
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 15,   // 15 minutes cache
    });
}

export function useAllTimeLeaderboard() {
    return useQuery({
        queryKey: ['leaderboard', 'all-time'],
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: Leaderboard }>(
                '/leaderboard/all-time'
            );
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 15,   // 15 minutes cache
    });
}

export { type LeaderboardEntry, type Leaderboard };
