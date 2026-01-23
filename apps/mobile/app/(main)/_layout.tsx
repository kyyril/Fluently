import { Tabs, Redirect } from 'expo-router';
import { Home, Trophy, BookOpen, User } from 'lucide-react-native';
import { useAuthStore } from '@/stores/authStore';

export default function MainLayout() {
    const { isAuthenticated, isOnboarded } = useAuthStore();

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Redirect href="/(auth)/login" />;
    }

    // Redirect to onboarding if not done
    if (!isOnboarded) {
        return <Redirect href="/(auth)/onboarding" />;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#0a0a0a',
                    borderTopColor: '#262626',
                    height: 60,
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: '#6366f1',
                tabBarInactiveTintColor: '#71717a',
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: 'bold',
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
                    tabBarIcon: ({ color }: { color: string }) => <Trophy color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }: { color: string }) => <User color={color} size={24} />,
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
                name="edit-profile"
                options={{
                    href: null, // Hide from tab bar
                }}
            />
        </Tabs>
    );
}
