'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// Types
export type HistoryPeriod = 'week' | 'month' | '3months' | 'all';
export type TaskTypeFilter = 'all' | 'PODCAST_LISTENING' | 'CREATE_SENTENCES' | 'DAY_RECAP';

export interface DetailedTask {
    id: string;
    taskType: string;
    completed: boolean;
    completedAt: string | null;
    xpEarned: number;
    metadata: Record<string, unknown> | null;
}

export interface DetailedHistoryEntry {
    id: string;
    date: string;
    totalXp: number;
    tasksCompleted: number;
    totalTasks: number;
    dayRecap: string | null;
    tasks: DetailedTask[];
}

export interface HistorySummary {
    totalSessions: number;
    totalXp: number;
    totalDays: number;
    taskBreakdown: Record<string, { count: number; totalXp: number }>;
}

export interface HistoryResponse {
    entries: DetailedHistoryEntry[];
    summary: HistorySummary;
    pagination: {
        total: number;
        hasMore: boolean;
    };
}

interface UseHistoryOptions {
    period?: HistoryPeriod;
    taskType?: TaskTypeFilter;
    limit?: number;
    offset?: number;
}

// Task display helpers (excluding SPEAKING_SESSION - no content to review)
export const TASK_LABELS: Record<string, string> = {
    PODCAST_LISTENING: 'Podcast Listening',
    CREATE_SENTENCES: 'Create Sentences',
    DAY_RECAP: 'Day Recap',
};

export const TASK_ICONS: Record<string, string> = {
    PODCAST_LISTENING: '🎧',
    CREATE_SENTENCES: '✍️',
    DAY_RECAP: '📝',
};

export const TASK_COLORS: Record<string, { text: string; bg: string }> = {
    PODCAST_LISTENING: { text: 'text-blue-500', bg: 'bg-blue-500/10' },
    CREATE_SENTENCES: { text: 'text-orange-500', bg: 'bg-orange-500/10' },
    DAY_RECAP: { text: 'text-green-500', bg: 'bg-green-500/10' },
};

export function useDetailedHistory(options: UseHistoryOptions = {}) {
    const { period = 'all', taskType = 'all', limit = 50, offset = 0 } = options;

    return useQuery({
        queryKey: ['history', 'detailed', period, taskType, limit, offset],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('period', period);
            if (taskType !== 'all') params.append('taskType', taskType);
            params.append('limit', limit.toString());
            params.append('offset', offset.toString());

            const response = await api.get<{ success: boolean; data: HistoryResponse }>(
                `/history?${params.toString()}`
            );
            return response.data.data;
        },
        staleTime: 1000 * 60 * 2, // 2 minutes
        gcTime: 1000 * 60 * 10,   // 10 minutes cache
        refetchOnWindowFocus: false,
    });
}

// Helper to format duration from metadata
export function formatDuration(seconds: number): string {
    if (!seconds || seconds <= 0) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
}

// Helper to get relative time
export function getRelativeTime(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}
