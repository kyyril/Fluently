import React from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Crown, Flame, Star, ChevronRight, User as UserIcon } from 'lucide-react-native';
import { TrophyIcon, MedalIcon, TrendingUpIcon } from '@/components/icons/LeaderboardIcons';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api/client';
import { QUERY_KEYS } from '@/lib/constants';
import { useAuthStore } from '@/stores/authStore';

interface LeaderboardUser {
    id: string;
    displayName: string;
    avatarUrl?: string;
    totalXp: number;
    currentStreak: number;
    level: string;
}

interface LeaderboardEntry {
    rank: number;
    user: LeaderboardUser;
    xp: number;
}

interface PodiumItemProps {
    entry?: LeaderboardEntry;
    rank: number;
    onPress: (userId: string) => void;
}

const PodiumItem = ({ entry, rank, onPress }: PodiumItemProps) => {
    if (!entry) return <View className="flex-1" />;

    const isFirst = rank === 1;
    const color = rank === 1 ? '#eab308' : rank === 2 ? '#9ca3af' : '#b45309';
    const userEntry = entry.user;

    return (
        <Pressable
            onPress={() => onPress(userEntry.id)}
            className={`flex-1 items-center px-2 ${isFirst ? 'z-10' : ''}`}
        >
            <View className="relative mb-3">
                <View className={`w-16 h-16 rounded-2xl overflow-hidden border-2 items-center justify-center bg-zinc-800 ${isFirst ? 'border-yellow-500 w-20 h-20' : 'border-zinc-700'}`}>
                    {userEntry.avatarUrl ? (
                        <Image source={{ uri: userEntry.avatarUrl }} className="w-full h-full" />
                    ) : (
                        <UserIcon size={isFirst ? 32 : 24} color="#52525b" />
                    )}
                </View>
                <View
                    className={`absolute -bottom-2 -right-1 w-8 h-8 rounded-lg items-center justify-center shadow-lg ${rank === 1 ? 'bg-yellow-500' : rank === 2 ? 'bg-zinc-400' : rank === 3 ? 'bg-amber-700' : 'bg-zinc-600'}`}
                >
                    <Text className="text-black font-black text-sm">{rank}</Text>
                </View>
            </View>
            <Text className="text-white font-bold text-xs text-center mb-1" numberOfLines={1}>
                {userEntry.displayName}
            </Text>
            <View className="flex-row items-center">
                <Star size={10} color={color} fill={color} />
                <Text className="text-zinc-400 text-[10px] font-black ml-1">{entry.xp.toLocaleString()} XP</Text>
            </View>
        </Pressable>
    );
};

export default function LeaderboardScreen() {
    const router = useRouter();
    const { user } = useAuthStore();
    const [tab, setTab] = React.useState<'weekly' | 'all-time'>('weekly');
    const [refreshing, setRefreshing] = React.useState(false);

    const { data, isLoading, refetch } = useQuery({
        queryKey: [...QUERY_KEYS.LEADERBOARD, tab],
        queryFn: async () => {
            const endpoint = tab === 'weekly' ? '/leaderboard/weekly' : '/leaderboard/all-time';
            const response = await api.get<{ success: boolean; data: { entries: LeaderboardEntry[], userRank?: any } }>(endpoint);
            return response.data.data;
        },
    });

    const leaderboard = data?.entries || [];
    const userRank = data?.userRank;

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    const handleUserPress = React.useCallback((userId: string) => {
        if (userId === user?.id) {
            router.push('/(main)/profile');
        } else {
            router.push(`/(main)/user/${userId}` as any);
        }
    }, [router, user?.id]);

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown size={20} color="#eab308" fill="#eab308" />;
        if (rank === 2) return <MedalIcon size={20} color="#9ca3af" />;
        if (rank === 3) return <MedalIcon size={20} color="#b45309" />;
        return null;
    };

    const getRankBgColor = (rank: number) => {
        if (rank === 1) return 'bg-yellow-500/5 border-yellow-500/20';
        if (rank === 2) return 'bg-zinc-400/5 border-zinc-400/20';
        if (rank === 3) return 'bg-amber-700/5 border-amber-700/20';
        return 'bg-zinc-900 border-zinc-800';
    };

    return (
        <View className="flex-1 bg-black">
            <ScrollView
                key={tab} // Force clean mount on tab switch
                contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 180 }}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} tintColor="#6366f1" />
                }
            >
                {/* Header */}
                <View className="mb-6 flex-row items-center justify-between">
                    <View>
                        <View className="flex-row items-center mb-1">
                            <TrophyIcon size={12} color="#eab308" />
                            <Text className="text-yellow-500 text-[10px] font-black uppercase tracking-widest ml-2">
                                Rankings
                            </Text>
                        </View>
                        <Text className="text-white text-3xl font-black">Leaderboard</Text>
                    </View>

                    {/* Compact Your Rank Indicator */}
                    {!isLoading && userRank && (
                        <View className="bg-indigo-500/10 px-4 py-2 rounded-2xl border border-indigo-500/20">
                            <Text className="text-indigo-400 text-[10px] font-black uppercase tracking-tight text-center">Rank</Text>
                            <Text className="text-white text-lg font-black text-center">#{userRank}</Text>
                        </View>
                    )}
                </View>

                {/* Tab Switcher */}
                <View className="flex-row bg-zinc-900/50 p-1.5 rounded-2xl mb-8">
                    <TouchableOpacity
                        onPress={() => setTab('weekly')}
                        className={`flex-1 flex-row items-center justify-center py-3 rounded-xl ${tab === 'weekly' ? 'bg-zinc-800 shadow-sm' : ''}`}
                    >
                        <TrendingUpIcon size={14} color={tab === 'weekly' ? '#6366f1' : '#71717a'} />
                        <Text className={`ml-2 text-sm font-bold ${tab === 'weekly' ? 'text-white' : 'text-zinc-500'}`}>Weekly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setTab('all-time')}
                        className={`flex-1 flex-row items-center justify-center py-3 rounded-xl ${tab === 'all-time' ? 'bg-zinc-800 shadow-sm' : ''}`}
                    >
                        <TrophyIcon size={14} color={tab === 'all-time' ? '#6366f1' : '#71717a'} />
                        <Text className={`ml-2 text-sm font-bold ${tab === 'all-time' ? 'text-white' : 'text-zinc-500'}`}>All Time</Text>
                    </TouchableOpacity>
                </View>

                {/* Podium View */}
                {!isLoading && leaderboard.length >= 3 && (
                    <View className="flex-row items-end justify-between mb-10 pt-4">
                        <PodiumItem entry={leaderboard[1]} rank={2} onPress={handleUserPress} />
                        <PodiumItem entry={leaderboard[0]} rank={1} onPress={handleUserPress} />
                        <PodiumItem entry={leaderboard[2]} rank={3} onPress={handleUserPress} />
                    </View>
                )}

                {/* Leaderboard List */}
                <View className="gap-y-3">
                    <View className="flex-row items-center justify-between mb-1 px-1">
                        <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Detailed Standings</Text>
                        <Text className="text-zinc-700 text-[10px] font-bold">Total Learners</Text>
                    </View>

                    {isLoading ? (
                        [1, 2, 3, 4, 5].map((i) => (
                            <View key={i} className="h-20 bg-zinc-900 rounded-2xl animate-pulse opacity-50" />
                        ))
                    ) : leaderboard && leaderboard.length > 0 ? (
                        leaderboard.slice(leaderboard.length >= 3 ? 3 : 0).map((entry) => {
                            const actualRank = entry.rank;
                            const userEntry = entry.user;
                            return (
                                <Pressable
                                    key={userEntry.id}
                                    onPress={() => handleUserPress(userEntry.id)}
                                    className={`flex-row items-center p-4 rounded-3xl border ${getRankBgColor(actualRank)} ${userEntry.id === user?.id ? 'border-indigo-500' : ''}`}
                                >
                                    <View className="w-8 items-center">
                                        <Text className="text-zinc-500 font-black text-sm">{actualRank}</Text>
                                    </View>
                                    <View className="w-12 h-12 bg-zinc-800 rounded-2xl items-center justify-center mx-3 overflow-hidden">
                                        {userEntry.avatarUrl ? (
                                            <Image source={{ uri: userEntry.avatarUrl }} className="w-full h-full" />
                                        ) : (
                                            <Text className="text-zinc-400 font-bold text-lg">
                                                {userEntry.displayName?.charAt(0) || '?'}
                                            </Text>
                                        )}
                                    </View>
                                    <View className="flex-1">
                                        <View className="flex-row items-center">
                                            <Text className="text-white font-bold text-base">{userEntry.displayName}</Text>
                                            {userEntry.id === user?.id && (
                                                <View className="ml-2 bg-indigo-500 px-1.5 py-0.5 rounded-md">
                                                    <Text className="text-white text-[8px] font-black">YOU</Text>
                                                </View>
                                            )}
                                        </View>
                                        <View className="flex-row items-center mt-0.5">
                                            <Text className="text-zinc-500 text-[10px] font-bold uppercase tracking-tight">{userEntry.level}</Text>
                                            {(userEntry.currentStreak || 0) > 0 && (
                                                <View className="flex-row items-center ml-3">
                                                    <Flame size={10} color="#f97316" fill="#f97316" />
                                                    <Text className="text-orange-500 text-[10px] font-bold ml-1">{userEntry.currentStreak}d</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                    <View className="items-end mr-2">
                                        <Text className="text-indigo-400 font-black text-lg tracking-tighter">{entry.xp.toLocaleString()}</Text>
                                        <Text className="text-zinc-600 text-[8px] font-black uppercase">XP Points</Text>
                                    </View>
                                    <ChevronRight size={16} color="#27272a" />
                                </Pressable>
                            );
                        })
                    ) : (
                        <View className="items-center py-20 bg-zinc-900/30 rounded-[40px] border border-dashed border-zinc-800">
                            <TrophyIcon size={48} color="#27272a" />
                            <Text className="text-zinc-500 font-bold mt-4">No rankings yet</Text>
                            <Text className="text-zinc-600 text-xs mt-1">Be the first to reach the top!</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
