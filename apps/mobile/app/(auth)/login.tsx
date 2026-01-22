import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useAuthStore } from '@/stores/authStore';
import { Target } from 'lucide-react-native';
import api from '@/lib/api/client';
import { NEON_AUTH_URL } from '@/lib/constants';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const [loading, setLoading] = useState(false);

    const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'fluently',
    });

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            // Updated social login URL structure for Neon Auth (using social endpoint)
            const authUrl = `${NEON_AUTH_URL}/signin/social/google?callbackURL=${encodeURIComponent(redirectUri)}`;

            const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

            if (result.type === 'success') {
                const url = new URL(result.url);
                const params = new URLSearchParams(url.search || url.hash.replace('#', '?'));
                const token = params.get('token') || params.get('access_token');

                if (!token) {
                    throw new Error('Authentication was cancelled or no token received');
                }

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
            console.error('Login error:', err);
            Alert.alert('Login Failed', err.message || 'Failed to sign in with Google');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-black">
            {/* Background Glows */}
            <View
                className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full"
                style={{ filter: 'blur(100px)' }}
            />
            <View
                className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-600/10 rounded-full"
                style={{ filter: 'blur(80px)' }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="items-center mb-16">
                        <View className="w-20 h-20 bg-indigo-600 rounded-3xl items-center justify-center mb-6 shadow-2xl shadow-indigo-500">
                            <Target color="white" size={40} />
                        </View>
                        <Text className="text-white text-4xl font-black tracking-tighter">Fluently</Text>
                        <Text className="text-zinc-500 text-sm mt-3 font-medium text-center px-8">
                            Join thousands of users mastering languages through AI-guided daily routines.
                        </Text>
                    </View>

                    <View className="bg-zinc-900/40 border border-zinc-800/50 p-8 rounded-[40px]">
                        <View className="mb-8">
                            <Text className="text-white text-3xl font-black tracking-tight mb-2">Welcome Back</Text>
                            <Text className="text-zinc-500 font-medium">Sign in to sync your progress</Text>
                        </View>

                        <TouchableOpacity
                            onPress={handleGoogleLogin}
                            disabled={loading}
                            activeOpacity={0.8}
                            className="bg-white h-16 rounded-2xl flex-row items-center justify-center space-x-3 px-6"
                        >
                            <Image
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
                                className="w-5 h-5"
                                resizeMode="contain"
                            />
                            <Text className="text-black font-black text-lg">
                                {loading ? 'Checking session...' : 'Continue with Google'}
                            </Text>
                        </TouchableOpacity>

                        <View className="mt-10 pt-6 border-t border-zinc-800/30">
                            <Text className="text-zinc-600 text-[10px] text-center font-bold uppercase tracking-widest leading-4 px-4">
                                By signing in, you agree to our Terms of Service and Privacy Policy.
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        className="mt-10 items-center"
                        onPress={() => router.replace('/(main)')}
                    >
                        <Text className="text-zinc-700 font-black text-sm uppercase tracking-widest">
                            Skip for now
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
