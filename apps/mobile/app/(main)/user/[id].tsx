import React from 'react';
import { View, Text, ScrollView, RefreshControl, Image, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Globe, Star, Flame, Trophy, Target, Award, Sparkles, Clock, ChevronLeft } from 'lucide-react-native';
import { useUserProfile, useOtherUserStats, useOtherUserHistory } from '@/hooks/useUser';
import { AnimatedCard } from '@/components/ui/AnimatedCard';

export default function UserProfileScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const { data: user, isLoading: userLoading, refetch: refetchUser } = useUserProfile(id!);
    const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useOtherUserStats(id!);
    const { data: history, isLoading: historyLoading, refetch: refetchHistory } = useOtherUserHistory(id!);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await Promise.all([refetchUser(), refetchStats(), refetchHistory()]);
        setRefreshing(false);
    }, [id]);

    const StatCard = ({ icon, value, label, color }: { icon: React.ReactNode; value: string | number; label: string; color: string }) => (
        <View className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 w-[48%] mb-1">
            <View className={`w-9 h-9 ${color} rounded-xl items-center justify-center mb-3`}>
                {icon}
            </View>
            <Text className="text-white text-xl font-black">{value}</Text>
            <Text className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">{label}</Text>
        </View>
    );

    if (userLoading) {
        return (
            <View className="flex-1 bg-black items-center justify-center">
                <View className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-black">
            <ScrollView
                contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 100 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#6366f1"
                    />
                }
            >
                {/* Back Button */}
                <Pressable
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-zinc-900 rounded-xl items-center justify-center mb-6"
                >
                    <ChevronLeft size={20} color="white" />
                </Pressable>

                {/* Header */}
                <View className="items-center mb-8">
                    <View className="w-24 h-24 bg-indigo-600 rounded-full items-center justify-center mb-4 overflow-hidden border-4 border-zinc-900">
                        {user?.avatarUrl ? (
                            <Image
                                source={{ uri: user.avatarUrl }}
                                className="w-full h-full"
                            />
                        ) : (
                            <Text className="text-white text-4xl font-black">
                                {user?.displayName?.charAt(0) || 'U'}
                            </Text>
                        )}
                    </View>
                    <Text className="text-white text-2xl font-black">{user?.displayName || 'User'}</Text>
                    <View className="flex-row items-center mt-2 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                        <Globe size={12} color="#6366f1" />
                        <Text className="text-indigo-400 text-xs font-bold ml-1.5">
                            {user?.targetLanguage || 'English'} • {user?.level || 'Beginner'}
                        </Text>
                    </View>
                </View>

                {/* Stats Grid */}
                <View className="flex-row flex-wrap justify-between mb-8 gap-y-3">
                    <StatCard
                        icon={<Star size={16} color="#eab308" />}
                        value={stats?.totalXp || user?.totalXp || 0}
                        label="Total XP"
                        color="bg-yellow-500/10"
                    />
                    <StatCard
                        icon={<Flame size={16} color="#f97316" />}
                        value={stats?.currentStreak || user?.currentStreak || 0}
                        label="Streak"
                        color="bg-orange-500/10"
                    />
                    <StatCard
                        icon={<Trophy size={16} color="#6366f1" />}
                        value={stats?.longestStreak || user?.longestStreak || 0}
                        label="Best"
                        color="bg-indigo-500/10"
                    />
                    <StatCard
                        icon={<Target size={16} color="#22c55e" />}
                        value={`${Math.round(stats?.completionRate || 0)}%`}
                        label="Success"
                        color="bg-green-500/10"
                    />
                </View>

                {/* Learning Progress */}
                <View className="mb-8 gap-y-4">
                    <AnimatedCard index={0}>
                        <View className="flex-row items-center mb-4">
                            <View className="w-9 h-9 bg-primary/10 rounded-xl items-center justify-center mr-3">
                                <Sparkles size={18} color="#6366f1" />
                            </View>
                            <View>
                                <Text className="text-white font-bold">Activity Stats</Text>
                                <Text className="text-zinc-500 text-[10px] uppercase font-black">Engagement</Text>
                            </View>
                        </View>
                        <View className="flex-row justify-between">
                            <View className="items-center flex-1 py-2 border-r border-zinc-800">
                                <Text className="text-white text-xl font-black">{stats?.totalDays || 0}</Text>
                                <Text className="text-zinc-500 text-[8px] uppercase font-bold">Total Days</Text>
                            </View>
                            <View className="items-center flex-1 py-2">
                                <Text className="text-green-500 text-xl font-black">{stats?.completedDays || 0}</Text>
                                <Text className="text-zinc-500 text-[8px] uppercase font-bold">Days Finished</Text>
                            </View>
                        </View>
                    </AnimatedCard>

                    {stats?.titles && stats.titles.length > 0 && (
                        <AnimatedCard index={1}>
                            <View className="flex-row items-center mb-4">
                                <View className="w-9 h-9 bg-amber-500/10 rounded-xl items-center justify-center mr-3">
                                    <Award size={18} color="#f59e0b" />
                                </View>
                                <View>
                                    <Text className="text-white font-bold">Achievements</Text>
                                    <Text className="text-zinc-500 text-[10px] uppercase font-black">{stats.titles.length} Earned</Text>
                                </View>
                            </View>
                            <View className="flex-row flex-wrap gap-2">
                                {stats.titles.map((title: any, i: number) => (
                                    <View key={i} className="bg-zinc-800 px-3 py-1.5 rounded-full flex-row items-center">
                                        <Star size={10} color="#f59e0b" />
                                        <Text className="text-zinc-300 text-[10px] font-bold ml-1.5">{title.name}</Text>
                                    </View>
                                ))}
                            </View>
                        </AnimatedCard>
                    )}
                </View>

                {/* Recent Activity */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4 ml-1">
                        <Clock size={12} color="#71717a" />
                        <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest ml-2">Recent Activity</Text>
                    </View>

                    <View className="gap-y-3">
                        {historyLoading ? (
                            [1, 2].map(i => <View key={i} className="h-16 bg-zinc-900 rounded-2xl animate-pulse" />)
                        ) : history && history.length > 0 ? (
                            history.map((day: any) => (
                                <View key={day.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex-row items-center justify-between">
                                    <View>
                                        <Text className="text-white font-bold text-sm">
                                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                        </Text>
                                        <Text className="text-zinc-500 text-[10px] font-bold">{day.tasksCompleted}/{day.totalTasks} Tasks</Text>
                                    </View>
                                    <View className="items-end">
                                        <Text className="text-indigo-500 font-black">+{day.totalXp} XP</Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 items-center">
                                <Clock size={32} color="#27272a" />
                                <Text className="text-zinc-600 text-xs mt-2 font-bold">No recent activity</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
