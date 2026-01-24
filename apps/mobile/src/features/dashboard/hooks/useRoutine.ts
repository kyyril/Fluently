import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api/client';
import { QUERY_KEYS } from '@/lib/constants';

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

export function useTodayRoutine() {
    const today = new Date().toISOString().split('T')[0];
    return useQuery({
        queryKey: [...QUERY_KEYS.ROUTINE_TODAY, today],
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: DailyRoutine }>(
                `/routine/today?date=${today}`
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
                    message: string;
                };
            }>(`/tasks/${taskId}/complete`, { metadata });
            return response.data.data;
        },
        onSuccess: () => {
            // Invalidate all related queries to refresh the UI
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROUTINE_TODAY });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_ME });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROUTINE_HISTORY });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_STATS });
        },
    });
}

export function useUserStats(userId?: string) {
    return useQuery({
        queryKey: userId ? [QUERY_KEYS.USER_STATS, userId] : [QUERY_KEYS.USER_STATS],
        queryFn: async () => {
            const endpoint = userId ? `/users/${userId}/stats` : '/users/me/stats';
            const response = await api.get<{ success: boolean; data: any }>(endpoint);
            return response.data.data;
        },
    });
}

export function useRoutineHistory(limit: number = 7, userId?: string) {
    return useQuery({
        queryKey: userId ? [QUERY_KEYS.ROUTINE_HISTORY, userId, limit] : [QUERY_KEYS.ROUTINE_HISTORY, limit],
        queryFn: async () => {
            const endpoint = userId ? `/users/${userId}/history` : '/routine/history';
            const response = await api.get<{ success: boolean; data: any[] }>(endpoint, {
                params: { limit }
            });
            return response.data.data;
        },
    });
}
