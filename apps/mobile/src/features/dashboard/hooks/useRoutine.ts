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
    return useQuery({
        queryKey: QUERY_KEYS.ROUTINE_TODAY,
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: DailyRoutine }>(
                '/routine/today'
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
        },
    });
}
