import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { Target, Shield, User, ArrowRight } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/lib/api/client';
import { deleteToken } from '@/lib/storage/secureStore';
import { NEON_AUTH_URL } from '@/lib/constants';

export default function LoginScreen() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    React.useEffect(() => {
        // Clear tokens on mount to prevent old residues causing 401
        deleteToken();
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. Try Local API Login First
            try {
                const response = await api.post('/auth/login', { email, password });
                const { user, token } = response.data.data;
                await setAuth(user, token);

                if (user.level) router.replace('/(main)');
                else router.replace('/(auth)/onboarding');
                return;
            } catch (err: any) {
                // If local login fails, it might be a user purely in Neon but not synced yet
                console.log('[Login] Local login failed, trying Neon fallback...');

                // 2. Neon Auth Fallback
                const signInResponse = await fetch(`${NEON_AUTH_URL}/sign-in/email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Origin': 'http://localhost:3000'
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!signInResponse.ok) {
                    throw new Error('Invalid email or password');
                }

                const signInData = await signInResponse.json();
                console.log('[Login] Neon SignIn Response:', JSON.stringify(signInData));
                const neonToken = signInData.token || signInData.session?.token;
                const neonUser = signInData.user;

                if (neonUser && neonUser.id && neonUser.email) {
                    // Sync to Local API - pass user data directly (no auth needed)
                    const syncResponse = await api.post('/auth/sync', {
                        neonUserId: neonUser.id,
                        email: neonUser.email,
                        password, // The password user just entered
                        displayName: neonUser.name || neonUser.email.split('@')[0]
                    });
                    const { user, token: localToken } = syncResponse.data.data;
                    await setAuth(user, localToken);

                    if (user.level) router.replace('/(main)');
                    else router.replace('/(auth)/onboarding');
                    return;
                }

                throw new Error('Authentication failed - no user data');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-black">
            {/* Background Glows */}
            <View
                className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full"
                style={{ transform: [{ scale: 1.5 }] }}
            />
            <View
                className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-600/10 rounded-full"
                style={{ transform: [{ scale: 1.5 }] }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Logo & Header */}
                    <View className="items-center mb-12">
                        <View className="w-20 h-20 bg-indigo-600 rounded-3xl items-center justify-center mb-6 shadow-2xl">
                            <Target color="white" size={40} />
                        </View>
                        <Text className="text-white text-4xl font-black tracking-tighter">Fluently</Text>
                        <Text className="text-zinc-500 text-sm mt-3 font-medium text-center px-8">
                            Master languages through AI-guided daily routines.
                        </Text>
                    </View>

                    {/* Login Form */}
                    <View className="bg-zinc-900/40 border border-zinc-800/50 p-8 rounded-[40px]">
                        <View className="mb-6">
                            <Text className="text-white text-3xl font-black tracking-tight mb-1">Welcome</Text>
                            <Text className="text-zinc-500 font-medium">Sign in to your account</Text>
                        </View>

                        <View className="gap-y-4 mb-6">
                            <View>
                                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                    Email
                                </Text>
                                <View className="relative">
                                    <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                        <User size={18} color="#52525b" />
                                    </View>
                                    <Input
                                        value={email}
                                        onChangeText={setEmail}
                                        placeholder="your@email.com"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        className="pl-12"
                                    />
                                </View>
                            </View>

                            <View>
                                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                    Password
                                </Text>
                                <View className="relative">
                                    <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                        <Shield size={18} color="#52525b" />
                                    </View>
                                    <Input
                                        value={password}
                                        onChangeText={setPassword}
                                        placeholder="••••••••"
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
                                        className="pl-12 pr-12"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2"
                                    >
                                        {showPassword ? (
                                            <Shield size={18} color="#52525b" />
                                        ) : (
                                            <Shield size={18} color="#52525b" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {error && (
                            <View className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
                                <Text className="text-red-400 text-sm text-center font-bold">{error}</Text>
                            </View>
                        )}

                        <Button
                            title={loading ? 'Signing in...' : 'Sign In'}
                            onPress={handleLogin}
                            loading={loading}
                            disabled={loading}
                            className="h-14 rounded-2xl"
                            textClassName="text-lg font-black"
                        />

                        <TouchableOpacity
                            onPress={() => router.push('/(auth)/forgot-password' as any)}
                            className="mt-4 items-center"
                        >
                            <Text className="text-indigo-400 text-xs font-bold">
                                Trouble signing in?
                            </Text>
                        </TouchableOpacity>

                        <View className="mt-8 pt-6 border-t border-zinc-800/50">
                            <View className="flex-row justify-center items-center">
                                <Text className="text-zinc-500 font-medium">New here? </Text>
                                <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                                    <Text className="text-indigo-400 font-black">Create Account</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Footer */}
                    <View className="mt-8 items-center">
                        <Text className="text-zinc-700 text-[10px] text-center font-bold uppercase tracking-widest leading-4 px-4">
                            Secure Environment
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
