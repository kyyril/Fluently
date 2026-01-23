'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

interface User {
    id: string;
    email: string;
    displayName: string;
    avatarUrl: string | null;
    nativeLanguage: string;
    targetLanguage: string;
    country?: string | null;
    level: string | null;
    role: string;
    totalXp: number;
    currentStreak: number;
    longestStreak: number;
}

export function useAuth() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { data: session, isPending, error } = authClient.useSession();

    const logout = async () => {
        await authClient.signOut();
        queryClient.clear();
        // Use window.location.href for a clean reset to prevent redirect loops
        window.location.href = '/';
    };

    const onboarding = useMutation({
        mutationFn: async (data: {
            nativeLanguage?: string;
            targetLanguage?: string;
            country?: string;
            level: string;
        }) => {
            const response = await api.post<{ success: boolean; data: User }>(
                '/auth/onboarding',
                {
                    nativeLanguage: data.nativeLanguage || 'Indonesian',
                    targetLanguage: data.targetLanguage || 'English',
                    country: data.country || 'Indonesia',
                    level: data.level,
                }
            );
            return response.data.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user', 'me'], data);
            router.push('/dashboard');
        },
    });

    return {
        session,
        isAuthenticated: !!session?.user,
        isLoading: isPending,
        logout,
        onboarding
    };
}

export function useUser(userId?: string) {
    const { data: session, isPending } = authClient.useSession();

    return useQuery({
        queryKey: ['user', userId || 'me'],
        queryFn: async () => {
            const endpoint = userId ? `/users/${userId}` : '/users/me';
            const response = await api.get<{ success: boolean; data: User }>(endpoint);
            return response.data.data;
        },
        // Only fetch when session is ready and user is authenticated
        enabled: !isPending && !!session?.user,
        retry: 1,
        retryDelay: 1000, // Wait 1 second before retry (gives time for user provisioning)
        staleTime: 5 * 60 * 1000,  // 5 minutes - user data rarely changes
        gcTime: 10 * 60 * 1000,    // 10 minutes cache
    });
}

export function useUserStats(userId?: string) {
    return useQuery({
        queryKey: ['user', 'stats', userId || 'me'],
        queryFn: async () => {
            const endpoint = userId ? `/users/${userId}/stats` : '/users/me/stats';
            const response = await api.get<{
                success: boolean;
                data: {
                    totalXp: number;
                    currentStreak: number;
                    longestStreak: number;
                    totalDays: number;
                    completedDays: number;
                    completionRate: number;
                    titles: { name: string; icon: string }[];
                };
            }>(endpoint);
            return response.data.data;
        },
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            displayName?: string;
            avatarUrl?: string;
            nativeLanguage?: string;
            targetLanguage?: string;
            level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
        }) => {
            const response = await api.patch<{ success: boolean; data: User }>(
                '/users/me',
                data
            );
            return response.data.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user', 'me'], data);
        },
    });
}
