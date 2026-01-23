import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Trophy, Medal, Crown, Flame, Star } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api/client';
import { QUERY_KEYS } from '@/lib/constants';
import { useAuthStore } from '@/stores/authStore';

interface LeaderboardUser {
    id: string;
    displayName: string;
    totalXp: number;
    currentStreak: number;
    level: string;
    rank: number;
}

export default function LeaderboardScreen() {
    const { user } = useAuthStore();

    const { data: leaderboard, isLoading, refetch } = useQuery({
        queryKey: QUERY_KEYS.LEADERBOARD,
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: LeaderboardUser[] }>('/leaderboard/weekly');
            return response.data.data;
        },
    });

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown size={20} color="#eab308" fill="#eab308" />;
        if (rank === 2) return <Medal size={20} color="#9ca3af" />;
        if (rank === 3) return <Medal size={20} color="#b45309" />;
        return null;
    };

    const getRankBgColor = (rank: number) => {
        if (rank === 1) return 'bg-yellow-500/10 border-yellow-500/30';
        if (rank === 2) return 'bg-zinc-400/10 border-zinc-400/30';
        if (rank === 3) return 'bg-amber-700/10 border-amber-700/30';
        return 'bg-zinc-900 border-zinc-800';
    };

    return (
        <View className="flex-1 bg-black">
            <ScrollView
                contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 40 }}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#6366f1" />
                }
            >
                {/* Header */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-1">
                        <Trophy size={12} color="#eab308" />
                        <Text className="text-yellow-500 text-[10px] font-black uppercase tracking-widest ml-2">
                            Weekly Ranking
                        </Text>
                    </View>
                    <Text className="text-white text-3xl font-black">Leaderboard</Text>
                    <Text className="text-zinc-400 text-sm mt-1">
                        Compete with other learners worldwide
                    </Text>
                </View>

                {/* Your Position Card */}
                {user && (
                    <View className="bg-indigo-900/20 border border-indigo-700/30 rounded-3xl p-5 mb-6">
                        <Text className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-3">
                            Your Position
                        </Text>
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <View className="w-12 h-12 bg-indigo-600 rounded-2xl items-center justify-center mr-4">
                                    <Text className="text-white text-xl font-black">
                                        {user.displayName?.charAt(0) || 'U'}
                                    </Text>
                                </View>
                                <View>
                                    <Text className="text-white text-base font-bold">{user.displayName}</Text>
                                    <View className="flex-row items-center mt-0.5">
                                        <Star size={10} color="#eab308" fill="#eab308" />
                                        <Text className="text-yellow-500 text-xs font-bold ml-1">{user.totalXp || 0} XP</Text>
                                    </View>
                                </View>
                            </View>
                            <View className="items-end">
                                <Text className="text-indigo-400 text-2xl font-black">#--</Text>
                                <View className="flex-row items-center">
                                    <Flame size={10} color="#f97316" />
                                    <Text className="text-orange-500 text-xs font-bold ml-1">{user.currentStreak || 0}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

                {/* Leaderboard List */}
                <View className="gap-y-3">
                    {isLoading ? (
                        [1, 2, 3, 4, 5].map((i) => (
                            <View key={i} className="h-20 bg-zinc-900 rounded-2xl animate-pulse" />
                        ))
                    ) : leaderboard && leaderboard.length > 0 ? (
                        leaderboard.map((entry, index) => (
                            <View
                                key={entry.id}
                                className={`flex-row items-center p-4 rounded-2xl border ${getRankBgColor(index + 1)} ${entry.id === user?.id ? 'ring-2 ring-indigo-500' : ''
                                    }`}
                            >
                                <View className="w-10 items-center">
                                    {getRankIcon(index + 1) || (
                                        <Text className="text-zinc-500 font-black">{index + 1}</Text>
                                    )}
                                </View>
                                <View className="w-10 h-10 bg-zinc-700 rounded-xl items-center justify-center mx-3">
                                    <Text className="text-white font-bold">
                                        {entry.displayName?.charAt(0) || '?'}
                                    </Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white font-bold">{entry.displayName}</Text>
                                    <Text className="text-zinc-500 text-xs">{entry.level}</Text>
                                </View>
                                <View className="items-end">
                                    <View className="flex-row items-center">
                                        <Star size={12} color="#eab308" fill="#eab308" />
                                        <Text className="text-yellow-500 font-black ml-1">{entry.totalXp}</Text>
                                    </View>
                                    <View className="flex-row items-center mt-0.5">
                                        <Flame size={10} color="#f97316" />
                                        <Text className="text-zinc-500 text-xs ml-1">{entry.currentStreak}</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View className="items-center py-10">
                            <Trophy size={48} color="#3f3f46" />
                            <Text className="text-zinc-500 font-bold mt-4">No rankings yet</Text>
                            <Text className="text-zinc-600 text-sm mt-1">Complete tasks to join the leaderboard</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
