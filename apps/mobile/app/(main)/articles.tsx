import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, RefreshControl, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { BookOpen, Clock, ChevronRight, Star } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api/client';
import { QUERY_KEYS } from '@/lib/constants';

interface Article {
    id: string;
    title: string;
    slug: string;
    summary: string;
    readTime: number;
    category: string;
    coverImage?: string;
}

export default function ArticlesScreen() {
    const router = useRouter();
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const { data, isLoading, refetch } = useQuery({
        queryKey: QUERY_KEYS.ARTICLES,
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: { articles: Article[] } }>('/articles');
            return response.data.data.articles || [];
        },
        initialData: [],
    });

    const articles = Array.isArray(data) ? data : [];

    const categories = ['General', 'Business', 'Travel', 'Academic'];

    const filteredArticles = selectedLevel
        ? articles.filter((a) => a.category === selectedLevel)
        : articles;

    return (
        <View className="flex-1 bg-black">
            <ScrollView
                contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 40 }}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#6366f1" />
                }
            >
                {/* Header */}
                <View className="mb-6">
                    <View className="flex-row items-center mb-1">
                        <BookOpen size={12} color="#3b82f6" />
                        <Text className="text-blue-500 text-[10px] font-black uppercase tracking-widest ml-2">
                            Reading Practice
                        </Text>
                    </View>
                    <Text className="text-white text-3xl font-black">Articles</Text>
                    <Text className="text-zinc-400 text-sm mt-1">
                        Improve your reading comprehension
                    </Text>
                </View>

                {/* Level Filter */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mb-6"
                >
                    <Pressable
                        onPress={() => setSelectedLevel(null)}
                        testID="filter-all"
                        accessible
                        accessibilityLabel="Show all levels"
                        accessibilityRole="button"
                        accessibilityState={{ selected: !selectedLevel }}
                        className={`px-4 py-2 rounded-full mr-2 ${!selectedLevel ? 'bg-indigo-600' : 'bg-zinc-800'
                            }`}
                    >


                        <Text className={`font-bold ${!selectedLevel ? 'text-white' : 'text-zinc-400'}`}>
                            All
                        </Text>
                    </Pressable>
                    {categories.map((cat) => (
                        <Pressable
                            key={cat}
                            testID={`filter-${cat}`}
                            onPress={() => setSelectedLevel(cat)}
                            accessible
                            accessibilityLabel={`Filter by ${cat}`}
                            accessibilityRole="button"
                            accessibilityState={{ selected: selectedLevel === cat }}
                            className={`px-4 py-2 rounded-full mr-2 ${selectedLevel === cat ? 'bg-indigo-600' : 'bg-zinc-800'
                                }`}
                        >


                            <Text className={`font-bold ${selectedLevel === cat ? 'text-white' : 'text-zinc-400'}`}>
                                {cat}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* Articles List */}
                <View className="gap-y-4">
                    {isLoading ? (
                        [1, 2, 3, 4].map((i) => (
                            <View key={i} className="h-28 bg-zinc-900 rounded-3xl animate-pulse" />
                        ))
                    ) : filteredArticles && filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                            <Pressable
                                key={article.id}
                                onPress={() => router.push(`/article/${article.slug}`)}
                                accessible
                                accessibilityLabel={`Article: ${article.title}. Level: ${article.level}. Read time: ${article.readTime} minutes.`}
                                accessibilityRole="button"
                                accessibilityHint="Opens article details"
                                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 active:bg-zinc-800"
                            >

                                <View className="flex-row items-center">
                                    {article.coverImage && (
                                        <Image
                                            source={{ uri: article.coverImage }}
                                            className="w-20 h-20 rounded-2xl mr-4"
                                            resizeMode="cover"
                                        />
                                    )}
                                    <View className="flex-1 pr-2">
                                        <View className="flex-row items-center mb-1.5">
                                            <View className="px-2 py-0.5 rounded-md mr-2 bg-indigo-500/20">
                                                <Text className="text-[8px] font-black uppercase text-indigo-400">
                                                    {article.category}
                                                </Text>
                                            </View>
                                            <View className="flex-row items-center">
                                                <Clock size={10} color="#71717a" />
                                                <Text className="text-zinc-500 text-[10px] font-bold ml-1">
                                                    {article.readTime} min
                                                </Text>
                                            </View>
                                        </View>
                                        <Text className="text-white text-base font-bold mb-1" numberOfLines={2}>
                                            {article.title}
                                        </Text>
                                        <Text className="text-zinc-500 text-xs" numberOfLines={2}>
                                            {article.summary}
                                        </Text>
                                    </View>
                                    <ChevronRight size={18} color="#3f3f46" />
                                </View>
                            </Pressable>
                        ))
                    ) : (
                        <View className="items-center py-10">
                            <BookOpen size={48} color="#3f3f46" />
                            <Text className="text-zinc-500 font-bold mt-4">No articles available</Text>
                            <Text className="text-zinc-600 text-sm mt-1">Check back later for new content</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
