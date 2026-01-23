import React, { useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Platform, View, ActivityIndicator } from 'react-native';
import { Home, BookOpen, User as UserIcon } from 'lucide-react-native';
import { TrophyIcon } from '@/components/icons/LeaderboardIcons';
import { useAuthStore } from '@/stores/authStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MainLayout() {
    const { isAuthenticated, isOnboarded } = useAuthStore();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/(auth)/login');
        } else if (!isOnboarded) {
            router.replace('/(auth)/onboarding');
        }
    }, [isAuthenticated, isOnboarded]);

    if (!isAuthenticated || !isOnboarded) {
        return (
            <View style={{ flex: 1, backgroundColor: '#000000' }} className="items-center justify-center">
                <ActivityIndicator size="small" color="#6366f1" />
            </View>
        );
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 85 + insets.bottom, // Increased height
                    backgroundColor: '#141414',
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    paddingBottom: insets.bottom + 10, // Increased buffer
                },
                tabBarItemStyle: {
                    height: 72,
                    paddingTop: 6, // Reduced from 12
                },
                tabBarActiveTintColor: '#6366f1',
                tabBarInactiveTintColor: '#71717a',
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: 'bold',
                    marginBottom: 10,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }: { color: string }) => <Home color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="articles"
                options={{
                    title: 'Articles',
                    tabBarIcon: ({ color }: { color: string }) => <BookOpen color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="leaderboard"
                options={{
                    title: 'Ranking',
                    tabBarIcon: ({ color }: { color: string }) => <TrophyIcon color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }: { color: string }) => <UserIcon color={color} size={24} />,
                }}
            />
            {/* Hidden screens - accessed via navigation from Home */}
            <Tabs.Screen
                name="speaking"
                options={{
                    href: null, // Hide from tab bar
                }}
            />
            <Tabs.Screen
                name="day-recap"
                options={{
                    href: null, // Hide from tab bar
                }}
            />
            <Tabs.Screen
                name="podcast-listening"
                options={{
                    href: null, // Hide from tab bar
                }}
            />
            <Tabs.Screen
                name="create-sentences"
                options={{
                    href: null, // Hide from tab bar
                }}
            />
            <Tabs.Screen
                name="edit-profile"
                options={{
                    href: null, // Hide from tab bar
                }}
            />
            <Tabs.Screen
                name="user"
                options={{
                    href: null, // Hide from tab bar
                }}
            />
            <Tabs.Screen
                name="user/[id]"
                options={{
                    href: null, // Hide from tab bar
                }}
            />
        </Tabs>
    );
}
