import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Share } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, Clock, BookOpen, Share as ShareIcon, Bookmark, CheckCircle } from 'lucide-react-native';
import api from '@/lib/api/client';
import { QUERY_KEYS } from '@/lib/constants';
import { LoadingScreen, ErrorState } from '@/components/ui/States';
import { Button } from '@/components/ui/Button';
import { useTodayRoutine, useCompleteTask } from '@/features/dashboard/hooks/useRoutine';
import { toast } from '@/stores/toastStore';
import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '@/stores/settingsStore';

interface ArticleDetail {
    id: string;
    title: string;
    content: string;
    summary: string;
    readTime: number;
    level: string;
    category: string;
    imageUrl?: string;
    createdAt: string;
}

export default function ArticleDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { hapticsEnabled } = useSettingsStore();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const { data: routine } = useTodayRoutine();
    const completeTaskMutation = useCompleteTask();

    const { data: article, isLoading, error, refetch } = useQuery({
        queryKey: QUERY_KEYS.ARTICLE(id || ''),
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: ArticleDetail }>(`/articles/${id}`);
            return response.data.data;
        },
        enabled: !!id,
    });

    const handleComplete = () => {
        // Find the article task if it exists (mapped to PODCAST_LISTENING for now or a generic task)
        const readingTask = routine?.tasks.find(t => t.taskType === 'PODCAST_LISTENING' && !t.completed);

        completeTaskMutation.mutate({
            taskId: readingTask?.id || 'unknown', // Fallback if not in routine
            metadata: { articleId: id }
        }, {
            onSuccess: () => {
                if (hapticsEnabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                toast.success('Article completed!', '+50 XP earned');
                router.back();
            },
            onError: () => {
                toast.error('Failed to complete task');
            }
        });
    };

    const handleShare = async () => {
        if (!article) return;
        try {
            await Share.share({
                title: article.title,
                message: `Check out this article: ${article.title}`,
            });
        } catch (error) {
            console.error('Share error:', error);
        }
    };

    const handleBookmark = () => {
        if (hapticsEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsBookmarked(!isBookmarked);
        toast.info(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
    };

    if (isLoading) {
        return <LoadingScreen message="Loading article..." />;
    }

    if (error || !article) {
        return <ErrorState message="Failed to load article" onRetry={refetch} />;
    }

    return (
        <View className="flex-1 bg-black">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View className="flex-row items-center justify-between px-4 pt-14 pb-4 bg-black/90 border-b border-zinc-800">
                <Pressable
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
                >
                    <ChevronLeft size={20} color="white" />
                </Pressable>
                <View className="flex-row">
                    <Pressable
                        onPress={handleBookmark}
                        className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center mr-2"
                    >
                        <Bookmark size={18} color={isBookmarked ? '#6366f1' : '#71717a'} fill={isBookmarked ? '#6366f1' : 'none'} />
                    </Pressable>
                    <Pressable
                        onPress={handleShare}
                        className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
                    >
                        <ShareIcon size={18} color="#71717a" />
                    </Pressable>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
                {/* Article Meta */}
                <View className="flex-row items-center mb-4">
                    <View className={`px-2 py-1 rounded-md mr-3 ${article.level === 'Beginner' ? 'bg-green-500/20' :
                        article.level === 'Intermediate' ? 'bg-yellow-500/20' :
                            'bg-red-500/20'
                        }`}>
                        <Text className={`text-[10px] font-black uppercase ${article.level === 'Beginner' ? 'text-green-500' :
                            article.level === 'Intermediate' ? 'text-yellow-500' :
                                'text-red-500'
                            }`}>
                            {article.level}
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <Clock size={12} color="#71717a" />
                        <Text className="text-zinc-500 text-xs font-bold ml-1">{article.readTime} min read</Text>
                    </View>
                </View>

                {/* Title */}
                <Text className="text-white text-3xl font-black mb-4 leading-tight">
                    {article.title}
                </Text>

                {/* Summary */}
                <View className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-6">
                    <View className="flex-row items-center mb-2">
                        <BookOpen size={14} color="#6366f1" />
                        <Text className="text-indigo-400 text-[10px] font-black uppercase tracking-widest ml-2">
                            Summary
                        </Text>
                    </View>
                    <Text className="text-zinc-300 text-sm leading-relaxed">
                        {article.summary}
                    </Text>
                </View>

                {/* Content */}
                <Text className="text-zinc-200 text-base leading-7">
                    {article.content}
                </Text>
            </ScrollView>

            {/* Bottom Action */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/95 border-t border-zinc-800">
                <Button
                    title="Mark as Complete"
                    onPress={handleComplete}
                    loading={completeTaskMutation.isPending}
                    className="py-5 rounded-2xl"
                />
            </View>
        </View>
    );
}
