import { Stack, Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

export default function AuthLayout() {
    const { isAuthenticated, isOnboarded } = useAuthStore();

    // If user is already authenticated and onboarded, redirect to home
    if (isAuthenticated && isOnboarded) {
        return <Redirect href="/(main)" />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#0a0a0a' },
            }}
        >
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="onboarding" />
        </Stack>
    );
}
