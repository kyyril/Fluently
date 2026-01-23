import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

export default function Index() {
    const { isAuthenticated, isOnboarded } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            if (isOnboarded) {
                router.replace('/(main)');
            } else {
                router.replace('/(auth)/onboarding');
            }
        } else {
            router.replace('/(auth)/login');
        }
    }, [isAuthenticated, isOnboarded]);

    return (
        <View style={{ flex: 1, backgroundColor: '#000000' }} className="items-center justify-center">
            <ActivityIndicator size="large" color="#6366f1" />
        </View>
    );
}
