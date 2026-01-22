import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Target, ChevronLeft, Globe } from 'lucide-react-native';
import api from '@/lib/api/client';
import { NEON_AUTH_URL } from '@/lib/constants';

WebBrowser.maybeCompleteAuthSession();

export default function RegisterScreen() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [loading, setLoading] = useState(false);

    const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'fluently',
    });

    const handleOAuthRegister = async () => {
        setLoading(true);
        try {
            const authUrl = `${NEON_AUTH_URL}/sign-up?redirect_uri=${encodeURIComponent(redirectUri)}`;

            const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

            if (result.type === 'success') {
                const url = new URL(result.url);
                const params = new URLSearchParams(url.search || url.hash.replace('#', '?'));
                const token = params.get('token') || params.get('access_token');

                if (!token) {
                    throw new Error('No authentication token received');
                }

                // Fetch user data with the token
                const response = await api.get('/users/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const user = response.data.data;
                await setAuth(user, token);

                if (user.level) {
                    router.replace('/(main)');
                } else {
                    router.replace('/(auth)/onboarding');
                }
            }
        } catch (err: any) {
            console.error('Registration error:', err);
            Alert.alert('Registration Failed', err.message || 'Failed to sign up with Neon Auth');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-black"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 30 }}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center mb-6"
                >
                    <ChevronLeft color="white" size={20} />
                </TouchableOpacity>

                <View className="items-center mb-8">
                    <Text className="text-white text-3xl font-black tracking-tighter">Create Account</Text>
                    <Text className="text-zinc-500 text-sm mt-2 font-medium">Start your language journey today</Text>
                </View>

                <View className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8">
                    <Text className="text-white text-xl font-black mb-6">Join Fluently</Text>

                    <Button
                        title="Sign up with Neon Auth"
                        onPress={handleOAuthRegister}
                        loading={loading}
                        icon={<Globe color="white" size={20} />}
                        className="py-5 rounded-2xl bg-indigo-600"
                        textClassName="text-base font-black"
                    />

                    <View className="flex-row justify-center mt-8">
                        <Text className="text-zinc-500 font-bold">Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
                            <Text className="text-indigo-500 font-black">Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mt-8 px-4">
                    <Text className="text-zinc-600 text-[10px] text-center font-bold uppercase tracking-widest leading-4">
                        By creating an account, you agree to our Terms and consent to our processing of your personal data.
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
