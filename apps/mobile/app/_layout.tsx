import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/stores/authStore';
import { View } from 'react-native';

import '../global.css';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});

export default function RootLayout() {
    const { isLoading } = useAuthStore();

    useEffect(() => {
        // Hide splash screen when ready
        // You can add more complex logic here (loading fonts, checking session)
        SplashScreen.hideAsync();
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <View className="flex-1 bg-black">
                    <StatusBar style="light" />
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            animation: 'fade_from_bottom',
                        }}
                    >
                        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                        <Stack.Screen name="(main)" options={{ headerShown: false }} />
                    </Stack>
                </View>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}
