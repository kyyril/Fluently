'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export interface Article {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content?: string;
    coverImage: string | null;
    readTime: number;
    category: string;
    tags: string[];
    createdAt: string;
    isReadToday?: boolean;
}

export interface DailyProgress {
    completed: number;
    max: number;
    bonusEarned: boolean;
    totalXpToday?: number;
    readArticles?: { id: string; title: string; slug: string }[];
}

export interface ArticlesResponse {
    articles: Article[];
    dailyProgress: DailyProgress;
}

// ============================================
// USER HOOKS
// ============================================

export function useArticles(params?: { search?: string; category?: string }) {
    return useQuery({
        queryKey: ['articles', params],
        queryFn: async () => {
            const query = new URLSearchParams();
            if (params?.search) query.append('search', params.search);
            if (params?.category) query.append('category', params.category);

            const response = await api.get<{ success: boolean; data: ArticlesResponse }>(
                `/articles?${query.toString()}`
            );
            return response.data.data;
        },
    });
}

export function useArticle(slug: string) {
    return useQuery({
        queryKey: ['article', slug],
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: Article }>(
                `/articles/${slug}`
            );
            return response.data.data;
        },
        enabled: !!slug,
    });
}

export function useDailyReadingProgress() {
    return useQuery({
        queryKey: ['articles', 'progress'],
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: DailyProgress }>(
                '/articles/progress'
            );
            return response.data.data;
        },
    });
}

export function useCompleteArticle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (articleId: string) => {
            const response = await api.post<{
                success: boolean;
                data: {
                    xpEarned: number;
                    bonusEarned: boolean;
                    dailyProgress: DailyProgress
                }
            }>(`/articles/${articleId}/complete`);
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
            queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
        },
    });
}

// ============================================
// ADMIN HOOKS
// ============================================

export interface AdminArticle extends Article {
    published: boolean;
    _count?: { reads: number };
}

export function useAdminArticles() {
    return useQuery({
        queryKey: ['admin', 'articles'],
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: AdminArticle[] }>(
                '/articles/admin/all'
            );
            return response.data.data;
        },
    });
}

export function useCreateArticle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            title: string;
            summary: string;
            content: string;
            coverImage?: string;
            readTime?: number;
            category?: string;
            tags?: string[];
        }) => {
            const response = await api.post<{ success: boolean; data: Article }>(
                '/articles/admin',
                data
            );
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'articles'] });
        },
    });
}

export function useUpdateArticle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ articleId, data }: {
            articleId: string;
            data: {
                title?: string;
                summary?: string;
                content?: string;
                coverImage?: string;
                readTime?: number;
                published?: boolean;
                category?: string;
                tags?: string[];
            };
        }) => {
            const response = await api.put<{ success: boolean; data: Article }>(
                `/articles/admin/${articleId}`,
                data
            );
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'articles'] });
            queryClient.invalidateQueries({ queryKey: ['articles'] });
        },
    });
}

export function useDeleteArticle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (articleId: string) => {
            await api.delete(`/articles/admin/${articleId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'articles'] });
        },
    });
}
