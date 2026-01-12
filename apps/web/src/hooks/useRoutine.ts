'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

interface Task {
    id: string;
    taskType: string;
    completed: boolean;
    completedAt: string | null;
    xpEarned: number;
    metadata: Record<string, unknown> | null;
}

interface DailyRoutine {
    id: string;
    date: string;
    tasks: Task[];
    dayRecap: string | null;
    aiReview: string | null;
    totalXp: number;
    progress: number;
}

interface HistoryEntry {
    id: string;
    date: string;
    totalXp: number;
    tasksCompleted: number;
    totalTasks: number;
    dayRecap: string | null;
}

const TASK_NAMES: Record<string, string> = {
    PODCAST_LISTENING: '🎧 Podcast Listening',
    SPEAKING_SESSION: '🗣️ Speaking Session (45m)',
    CREATE_SENTENCES: '✍️ Create Sentences',
    DAY_RECAP: '📔 Day Recap Journal',
};

const TASK_XP: Record<string, number> = {
    PODCAST_LISTENING: 50,
    SPEAKING_SESSION: 80,
    CREATE_SENTENCES: 30,
    DAY_RECAP: 40,
};

export function getTaskName(taskType: string): string {
    return TASK_NAMES[taskType] || taskType;
}

export function getTaskXp(taskType: string): number {
    return TASK_XP[taskType] || 0;
}

export function useTodayRoutine() {
    return useQuery({
        queryKey: ['routine', 'today'],
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: DailyRoutine }>(
                '/routine/today'
            );
            return response.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

export function useRoutineHistory(limit = 30) {
    return useQuery({
        queryKey: ['routine', 'history', limit],
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: HistoryEntry[] }>(
                `/routine/history?limit=${limit}`
            );
            return response.data.data;
        },
    });
}

export function useCompleteTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ taskId, metadata }: { taskId: string; metadata?: Record<string, any> }) => {
            const response = await api.post<{
                success: boolean;
                data: {
                    id: string;
                    taskType: string;
                    completed: boolean;
                    xpEarned: number;
                    metadata: any;
                    message: string;
                };
            }>(`/tasks/${taskId}/complete`, { metadata });
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['routine', 'today'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
}

export function useDayRecapReview() {
    return useMutation({
        mutationFn: async (data: { content: string; dailyLogId?: string }) => {
            const response = await api.post<{
                success: boolean;
                data: {
                    feedback: string;
                    corrections: string[];
                    corrected: string;
                    saved: boolean;
                };
            }>('/tasks/day-recap/review', data);
            return response.data.data;
        },
    });
}

export { type Task, type DailyRoutine, type HistoryEntry };
