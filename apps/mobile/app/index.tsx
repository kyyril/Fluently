import { Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

export default function Index() {
    const { isAuthenticated, isOnboarded } = useAuthStore();

    if (isAuthenticated) {
        if (isOnboarded) {
            return <Redirect href="/(main)" />;
        }
        return <Redirect href="/(auth)/onboarding" />;
    }

    return <Redirect href="/(auth)/login" />;
}
