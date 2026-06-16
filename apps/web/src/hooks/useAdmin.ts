'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export interface AdminUser {
    id: string;
    email: string;
    displayName: string;
    role: string;
    level: string;
    totalXp: number;
    currentStreak: number;
    createdAt: string;
}

export function useAdminUsers() {
    return useQuery({
        queryKey: ['admin', 'users'],
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: AdminUser[] }>(
                '/admin/users'
            );
            return response.data.data;
        },
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 10,
    });
}

export function useAdminUserDetail(userId: string) {
    return useQuery({
        queryKey: ['admin', 'users', userId],
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: any }>(
                `/admin/users/${userId}`
            );
            return response.data.data;
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 10,
    });
}

export function useUpdateUserRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
            const response = await api.patch<{ success: boolean; data: any }>(
                `/admin/users/${userId}/role`,
                { role }
            );
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
        },
    });
}
