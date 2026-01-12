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
    country?: string | null;
    level: string;
    role: string;
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

            if (data.user.role === 'ADMIN') {
                router.push('/admin');
                return;
            }

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

    return { login, register, logout, onboarding };
}

export function useUser(userId?: string) {
    return useQuery({
        queryKey: ['user', userId || 'me'],
        queryFn: async () => {
            const endpoint = userId ? `/users/${userId}` : '/users/me';
            const response = await api.get<{ success: boolean; data: User }>(endpoint);
            return response.data.data;
        },
        retry: false,
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
