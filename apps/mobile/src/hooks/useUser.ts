import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api/client';
import { QUERY_KEYS, STALE_TIMES } from '@/lib/constants';
import { useAuthStore } from '@/stores/authStore';

interface User {
    id: string;
    email: string;
    displayName: string;
    targetLanguage: string;
    nativeLanguage: string;
    level: string;
    totalXp: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string;
    createdAt: string;
}

export function useUser() {
    const { isAuthenticated, updateUser } = useAuthStore();

    return useQuery({
        queryKey: QUERY_KEYS.USER_ME,
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: User }>('/users/me');
            // Sync with local store
            updateUser(response.data.data);
            return response.data.data;
        },
        enabled: isAuthenticated,
        staleTime: STALE_TIMES.USER,
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const { updateUser } = useAuthStore();

    return useMutation({
        mutationFn: async (data: Partial<User>) => {
            const response = await api.patch<{ success: boolean; data: User }>('/users/me', data);
            return response.data.data;
        },
        onSuccess: (data) => {
            updateUser(data);
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_ME });
        },
    });
}
