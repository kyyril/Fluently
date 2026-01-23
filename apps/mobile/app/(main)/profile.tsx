import React from 'react';
import { View, Text, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Settings, Bell, Moon, Vibrate, LogOut, ChevronRight, Shield, Globe, Star, Flame, Target } from 'lucide-react-native';
import { useAuthStore } from '@/stores/authStore';
import { useSettingsStore } from '@/stores/settingsStore';
import * as Haptics from 'expo-haptics';

export default function ProfileScreen() {
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const { theme, hapticsEnabled, notificationsEnabled, setTheme, setHaptics, setNotifications } = useSettingsStore();

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
        <View className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex-1">
            <View className={`w-8 h-8 ${color} rounded-lg items-center justify-center mb-2`}>
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
        <ScrollView className="flex-1 bg-black" contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 40 }}>
            {/* Header */}
            <View className="items-center mb-8">
                <View className="w-24 h-24 bg-indigo-600 rounded-full items-center justify-center mb-4">
                    <Text className="text-white text-4xl font-black">
                        {user?.displayName?.charAt(0) || 'U'}
                    </Text>
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
            <View className="flex-row gap-3 mb-8">
                <StatCard
                    icon={<Flame size={16} color="#f97316" />}
                    value={user?.currentStreak || 0}
                    label="Streak"
                    color="bg-orange-500/10"
                />
                <StatCard
                    icon={<Star size={16} color="#eab308" />}
                    value={user?.totalXp || 0}
                    label="Total XP"
                    color="bg-yellow-500/10"
                />
                <StatCard
                    icon={<Target size={16} color="#22c55e" />}
                    value={user?.longestStreak || 0}
                    label="Best"
                    color="bg-green-500/10"
                />
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
