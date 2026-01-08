'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, setAuthToken, clearAuthToken } from '@/lib/api-client';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    displayName: string;
    avatarUrl: string | null;
    nativeLanguage: string;
    targetLanguage: string;
    level: string;
    totalXp: number;
    currentStreak: number;
    longestStreak: number;
}

interface AuthResponse {
    user: User;
    token: string;
}

export function useAuth() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const login = useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            const response = await api.post<{ success: boolean; data: AuthResponse }>(
                '/auth/login',
                data
            );
            return response.data.data;
        },
        onSuccess: (data) => {
            setAuthToken(data.token);
            queryClient.setQueryData(['user', 'me'], data.user);
            if (!data.user.nativeLanguage || !data.user.targetLanguage) {
                router.push('/onboarding');
            } else {
                router.push('/dashboard');
            }
        },
    });

    const register = useMutation({
        mutationFn: async (data: {
            email: string;
            password: string;
            displayName: string;
        }) => {
            const response = await api.post<{ success: boolean; data: AuthResponse }>(
                '/auth/register',
                data
            );
            return response.data.data;
        },
        onSuccess: (data) => {
            setAuthToken(data.token);
            queryClient.setQueryData(['user', 'me'], data.user);
            router.push('/onboarding');
        },
    });

    const logout = () => {
        clearAuthToken();
        queryClient.clear();
        router.push('/');
    };

    const onboarding = useMutation({
        mutationFn: async (data: {
            nativeLanguage: string;
            targetLanguage: string;
            level: string;
        }) => {
            const response = await api.post<{ success: boolean; data: User }>(
                '/auth/onboarding',
                data
            );
            return response.data.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user', 'me'], data);
            router.push('/dashboard');
        },
    });

    return { login, register, logout, onboarding };
}

export function useUser() {
    return useQuery({
        queryKey: ['user', 'me'],
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: User }>(
                '/users/me'
            );
            return response.data.data;
        },
        retry: false,
    });
}

export function useUserStats() {
    return useQuery({
        queryKey: ['user', 'stats'],
        queryFn: async () => {
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
            }>('/users/me/stats');
            return response.data.data;
        },
    });
}
