import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Share, Image, TouchableOpacity } from 'react-native';
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
import { DictionaryModal } from '@/components/DictionaryModal';
import { useBookmarkStore } from '@/stores/bookmarkStore';

interface ArticleDetail {
    id: string;
    slug: string;
    title: string;
    content: string;
    summary: string;
    readTime: number;
    category: string;
    coverImage?: string;
    createdAt: string;
}

const SimpleMarkdown = ({ content, onWordClick }: { content: string, onWordClick: (word: string) => void }) => {
    // Basic markdown parser for mobile
    const lines = (content || '').split('\n');

    const renderWords = (text: string) => {
        if (!text) return [];
        return text.split(/(\s+)/).map((part, index) => {
            if (!part) return null;
            if (/^\s+$/.test(part)) return part;

            return (
                <Text
                    key={index}
                    onPress={() => onWordClick(part)}
                    className="active:bg-indigo-500/40 rounded-sm"
                >
                    {part}
                </Text>
            );
        });
    };

    const RenderInline = (text: string) => {
        if (!text) return [];
        // Regex to match bold (**text**) or italic (*text*)
        const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
        return parts.flatMap((part, i) => {
            if (!part) return [];
            if (part.startsWith('**') && part.endsWith('**')) {
                const inner = part.substring(2, part.length - 2);
                return (
                    <Text key={`b-${i}`} className="text-white font-black">
                        {renderWords(inner)}
                    </Text>
                );
            }
            if (part.startsWith('*') && part.endsWith('*')) {
                const inner = part.substring(1, part.length - 1);
                return (
                    <Text key={`i-${i}`} className="text-zinc-200 italic">
                        {renderWords(inner)}
                    </Text>
                );
            }
            return renderWords(part);
        });
    };

    return (
        <View className="gap-y-4">
            {lines.map((line, index) => {
                const trimmed = line.trim();

                // Empty lines
                if (!trimmed) return <View key={`gap-${index}`} className="h-2" />;

                // Headers (Check longest first to avoid partial matches)
                if (line.startsWith('#### ')) {
                    return <Text key={index} className="text-white text-lg font-black mt-3 mb-1">{RenderInline(line.replace('#### ', ''))}</Text>;
                }
                if (line.startsWith('### ')) {
                    return <Text key={index} className="text-white text-xl font-black mt-4 mb-2">{RenderInline(line.replace('### ', ''))}</Text>;
                }
                if (line.startsWith('## ')) {
                    return <Text key={index} className="text-white text-2xl font-black mt-6 mb-3">{RenderInline(line.replace('## ', ''))}</Text>;
                }
                if (line.startsWith('# ')) {
                    return <Text key={index} className="text-white text-3xl font-black mt-8 mb-4">{RenderInline(line.replace('# ', ''))}</Text>;
                }

                // Blockquotes
                if (line.startsWith('> ')) {
                    return (
                        <View key={index} className="border-l-4 border-indigo-500 pl-4 py-3 my-3 bg-indigo-500/5 rounded-r-2xl">
                            <Text className="text-zinc-300 text-lg italic leading-8">
                                {RenderInline(line.substring(2))}
                            </Text>
                        </View>
                    );
                }

                // Bullet points
                if (line.startsWith('- ') || line.startsWith('* ')) {
                    return (
                        <View key={index} className="flex-row items-start pl-2 mb-2">
                            <Text className="text-indigo-500 mr-2 text-xl">•</Text>
                            <Text className="text-zinc-300 text-lg flex-1 leading-8">
                                {RenderInline(line.substring(2))}
                            </Text>
                        </View>
                    );
                }

                // Regular paragraphs
                return (
                    <Text key={index} className="text-zinc-200 text-lg leading-8">
                        {RenderInline(line)}
                    </Text>
                );
            })}
        </View>
    );
};

export default function ArticleDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { hapticsEnabled } = useSettingsStore();
    const { toggleBookmark, isBookmarked } = useBookmarkStore();
    const { data: routine } = useTodayRoutine();
    const completeTaskMutation = useCompleteTask();

    // Dictionary State
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);

    const handleWordClick = (word: string) => {
        // Clean punctuation: remove non-word chars from start/end
        const cleanWord = word.replace(/^[^\w]+|[^\w]+$/g, '');
        if (cleanWord) {
            if (hapticsEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setSelectedWord(cleanWord);
            setIsDictionaryOpen(true);
        }
    };

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

    const isCurrentlyBookmarked = article ? isBookmarked(article.id) : false;

    const handleBookmark = () => {
        if (!article) return;
        if (hapticsEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        toggleBookmark({
            ...article,
            bookmarkedAt: Date.now()
        });
        toast.info(isCurrentlyBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
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
                        <Bookmark size={18} color={isCurrentlyBookmarked ? '#6366f1' : '#71717a'} fill={isCurrentlyBookmarked ? '#6366f1' : 'none'} />
                    </Pressable>
                    <Pressable
                        onPress={handleShare}
                        className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center"
                    >
                        <ShareIcon size={18} color="#71717a" />
                    </Pressable>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 180 }}>
                {/* Cover Image */}
                {!!article.coverImage && (
                    <Image
                        source={{ uri: article.coverImage }}
                        className="w-full h-56 rounded-3xl mb-6"
                        resizeMode="cover"
                    />
                )}

                {/* Article Meta */}
                <View className="flex-row items-center mb-4">
                    <View className="px-2 py-1 rounded-md mr-3 bg-indigo-500/20">
                        <Text className="text-[10px] font-black uppercase text-indigo-400">
                            {article.category}
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
                        <Text className="text-indigo-400 text-xs font-black uppercase tracking-widest ml-2">
                            Summary
                        </Text>
                    </View>
                    <Text className="text-zinc-300 text-lg leading-7">
                        {article.summary}
                    </Text>
                </View>

                {/* Content */}
                <SimpleMarkdown content={article.content} onWordClick={handleWordClick} />

                {/* Mark as Complete Button - Moved inside ScrollView */}
                <View className="mt-12 mb-8">
                    <Button
                        title="Mark as Complete"
                        onPress={handleComplete}
                        loading={completeTaskMutation.isPending}
                        icon={<CheckCircle size={20} color="white" />}
                        className="py-5 rounded-2xl"
                    />
                    <View className="h-12" /> {/* Extra space for navigation bar */}
                </View>
            </ScrollView>

            <DictionaryModal
                word={selectedWord}
                isOpen={isDictionaryOpen}
                onClose={() => setIsDictionaryOpen(false)}
            />
        </View>
    );
}
