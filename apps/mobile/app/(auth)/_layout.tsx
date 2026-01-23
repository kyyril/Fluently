import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

export default function AuthLayout() {
    const { isAuthenticated, isOnboarded } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && isOnboarded) {
            router.replace('/(main)');
        }
    }, [isAuthenticated, isOnboarded]);

    if (isAuthenticated && isOnboarded) {
        return (
            <View style={{ flex: 1, backgroundColor: '#000000' }} className="items-center justify-center">
                <ActivityIndicator size="small" color="#6366f1" />
            </View>
        );
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#000000' },
                animation: 'slide_from_right', // Consistent slide transition
            }}
        >
            <Stack.Screen name="login" options={{ animation: 'fade' }} />
            <Stack.Screen name="register" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="verify-email" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="forgot-password" options={{ animation: 'slide_from_bottom' }} />
            <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
        </Stack>
    );
}
