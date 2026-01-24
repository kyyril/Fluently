import React from 'react';
import { View, Text, ScrollView, Pressable, Switch, Alert, RefreshControl, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Settings, Bell, Moon, Vibrate, LogOut, ChevronRight, Shield, Globe, Star, Flame, Trophy, Target, Award, Sparkles, Clock, CheckCircle } from 'lucide-react-native';
import { useAuthStore } from '@/stores/authStore';
import { useUser } from '@/hooks/useUser';
import { useUserStats, useRoutineHistory } from '@/features/dashboard/hooks/useRoutine';
import { useSettingsStore } from '@/stores/settingsStore';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import * as Haptics from 'expo-haptics';

export default function ProfileScreen() {
    const router = useRouter();
    const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useUserStats();
    const { data: history, isLoading: historyLoading, refetch: refetchHistory } = useRoutineHistory(7);
    const { user, logout } = useAuthStore();
    const { theme, hapticsEnabled, notificationsEnabled, geminiApiKey, setTheme, setHaptics, setNotifications, setGeminiApiKey } = useSettingsStore();
    const [showApiKey, setShowApiKey] = React.useState(false);
    const [apiKeyInput, setApiKeyInput] = React.useState(geminiApiKey || '');

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await Promise.all([refetchStats(), refetchHistory()]);
        setRefreshing(false);
    }, []);

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        router.replace('/(auth)/login');
                    }
                },
            ]
        );
    };

    const handleToggle = (setter: (value: boolean) => void, currentValue: boolean) => {
        if (hapticsEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        setter(!currentValue);
    };

    const StatCard = ({ icon, value, label, color }: { icon: React.ReactNode; value: string | number; label: string; color: string }) => (
        <View className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 w-[48%] mb-1">
            <View className={`w-9 h-9 ${color} rounded-xl items-center justify-center mb-3`}>
                {icon}
            </View>
            <Text className="text-white text-xl font-black">{value}</Text>
            <Text className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">{label}</Text>
        </View>
    );

    const SettingRow = ({
        icon,
        label,
        value,
        onToggle,
        hasSwitch = true
    }: {
        icon: React.ReactNode;
        label: string;
        value?: boolean;
        onToggle?: () => void;
        hasSwitch?: boolean;
    }) => (
        <Pressable
            className="flex-row items-center justify-between py-4 border-b border-zinc-800"
            onPress={!hasSwitch ? onToggle : undefined}
        >
            <View className="flex-row items-center">
                <View className="w-9 h-9 bg-zinc-800 rounded-xl items-center justify-center mr-3">
                    {icon}
                </View>
                <Text className="text-white font-bold">{label}</Text>
            </View>
            {hasSwitch ? (
                <Switch
                    value={value}
                    onValueChange={onToggle}
                    trackColor={{ false: '#3f3f46', true: '#6366f1' }}
                    thumbColor={value ? '#fff' : '#a1a1aa'}
                />
            ) : (
                <ChevronRight size={20} color="#52525b" />
            )}
        </Pressable>
    );

    return (
        <ScrollView
            className="flex-1 bg-black"
            contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 180 }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#6366f1"
                    colors={["#6366f1"]}
                />
            }
        >
            {/* Header */}
            <View className="items-center mb-8">
                <View className="w-24 h-24 bg-indigo-600 rounded-full items-center justify-center mb-4 overflow-hidden">
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
                <Text className="text-zinc-500 text-sm">{user?.email || ''}</Text>
                <View className="flex-row items-center mt-2 bg-indigo-500/10 px-3 py-1 rounded-full">
                    <Globe size={12} color="#6366f1" />
                    <Text className="text-indigo-400 text-xs font-bold ml-1.5">
                        {user?.targetLanguage || 'English'} • {user?.level || 'Beginner'}
                    </Text>
                </View>
                {/* Edit Profile Button */}
                <Pressable
                    onPress={() => router.push('/(main)/edit-profile' as any)}
                    className="mt-4 bg-zinc-800 border border-zinc-700 px-5 py-2.5 rounded-xl flex-row items-center"
                >
                    <User size={14} color="#a1a1aa" />
                    <Text className="text-zinc-300 font-bold ml-2">Edit Profile</Text>
                </Pressable>
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

            {/* Learning Progress & Achievements */}
            <View className="mb-8 gap-y-4">
                <AnimatedCard index={0}>
                    <View className="flex-row items-center mb-4">
                        <View className="w-9 h-9 bg-primary/10 rounded-xl items-center justify-center mr-3">
                            <Sparkles size={18} color="#6366f1" />
                        </View>
                        <View>
                            <Text className="text-white font-bold">Learning Progress</Text>
                            <Text className="text-zinc-500 text-[10px] uppercase font-black">User Journey</Text>
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
                                    <Text className="text-zinc-500 text-[10px] font-bold">{day.tasksCompleted}/{day.totalTasks} Tasks Completed</Text>
                                </View>
                                <View className="items-end">
                                    <Text className="text-indigo-500 font-black">+{day.totalXp} XP</Text>
                                    <View className="w-16 h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                                        <View
                                            className="h-full bg-indigo-500"
                                            style={{ width: `${Math.round((day.tasksCompleted / (day.totalTasks || 1)) * 100)}%` }}
                                        />
                                    </View>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 items-center">
                            <Clock size={32} color="#27272a" />
                            <Text className="text-zinc-600 text-xs mt-2 font-bold">No recent activity found</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* AI Settings Section */}
            <View className="bg-zinc-900 border border-zinc-800 rounded-3xl px-5 mb-6">
                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest py-4">
                    AI Configuration
                </Text>
                <View className="py-4 border-b border-zinc-800">
                    <View className="flex-row items-center mb-3">
                        <View className="w-9 h-9 bg-zinc-800 rounded-xl items-center justify-center mr-3">
                            <Settings size={18} color="#a1a1aa" />
                        </View>
                        <Text className="text-white font-bold">Gemini API Key</Text>
                    </View>
                    <View className="flex-row items-center bg-black/50 border border-zinc-700 rounded-xl px-4 h-12">
                        <TextInput
                            value={apiKeyInput}
                            onChangeText={(text) => {
                                setApiKeyInput(text);
                                setGeminiApiKey(text);
                            }}
                            placeholder="Paste your API Key here"
                            placeholderTextColor="#52525b"
                            secureTextEntry={!showApiKey}
                            className="flex-1 text-white font-mono text-xs"
                            autoCapitalize="none"
                        />
                        <Pressable onPress={() => setShowApiKey(!showApiKey)} className="p-2">
                            <Text className="text-zinc-500 text-xs font-bold">{showApiKey ? 'Hide' : 'Show'}</Text>
                        </Pressable>
                    </View>
                    <Text className="text-zinc-600 text-[10px] mt-2 leading-4">
                        Required for Speaking Session mechanism. Your key is stored locally on your device.
                    </Text>
                </View>
            </View>

            {/* Settings Section */}
            <View className="bg-zinc-900 border border-zinc-800 rounded-3xl px-5 mb-6">
                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest py-4">
                    Preferences
                </Text>
                <SettingRow
                    icon={<Vibrate size={18} color="#a1a1aa" />}
                    label="Haptic Feedback"
                    value={hapticsEnabled}
                    onToggle={() => handleToggle(setHaptics, hapticsEnabled)}
                />
                <SettingRow
                    icon={<Bell size={18} color="#a1a1aa" />}
                    label="Notifications"
                    value={notificationsEnabled}
                    onToggle={() => handleToggle(setNotifications, notificationsEnabled)}
                />
                <SettingRow
                    icon={<Moon size={18} color="#a1a1aa" />}
                    label="Dark Mode"
                    value={theme === 'dark'}
                    onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                />
            </View>

            {/* Account Section */}
            <View className="bg-zinc-900 border border-zinc-800 rounded-3xl px-5 mb-6">
                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest py-4">
                    Account
                </Text>
                <SettingRow
                    icon={<Shield size={18} color="#a1a1aa" />}
                    label="Privacy & Security"
                    hasSwitch={false}
                    onToggle={() => { }}
                />
                <SettingRow
                    icon={<Settings size={18} color="#a1a1aa" />}
                    label="App Settings"
                    hasSwitch={false}
                    onToggle={() => { }}
                />
            </View>

            {/* Logout Button */}
            <Pressable
                onPress={handleLogout}
                className="bg-red-500/10 border border-red-500/20 rounded-2xl py-4 flex-row items-center justify-center"
            >
                <LogOut size={18} color="#ef4444" />
                <Text className="text-red-500 font-bold ml-2">Logout</Text>
            </Pressable>

            {/* App Version */}
            <Text className="text-zinc-700 text-xs text-center mt-6">
                Fluently v1.0.0
            </Text>
        </ScrollView>
    );
}
