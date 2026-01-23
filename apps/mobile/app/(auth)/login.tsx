import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { ArrowRight, Sparkles } from 'lucide-react-native';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '@/components/icons/EyeIcons';
import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
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
            try {
                const response = await api.post('/auth/login', { email, password });
                const { user, token } = response.data.data;
                await setAuth(user, token);

                if (user.level) router.replace('/(main)');
                else router.replace('/(auth)/onboarding');
                return;
            } catch (err: any) {
                const signInResponse = await fetch(`${NEON_AUTH_URL}/sign-in/email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Origin': 'http://localhost:3000'
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!signInResponse.ok) throw new Error('Invalid email or password');

                const signInData = await signInResponse.json();
                const neonToken = signInData.token || signInData.session?.token;
                const neonUser = signInData.user;

                if (neonUser && neonUser.id && neonUser.email) {
                    const syncResponse = await api.post('/auth/sync', {
                        neonUserId: neonUser.id,
                        email: neonUser.email,
                        password,
                        displayName: neonUser.name || neonUser.email.split('@')[0]
                    });
                    const { user, token: localToken } = syncResponse.data.data;
                    await setAuth(user, localToken);

                    if (user.level) router.replace('/(main)');
                    else router.replace('/(auth)/onboarding');
                    return;
                }
                throw new Error('Authentication failed');
            }
        } catch (err: any) {
            setError(err.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
            {/* Ambient Background - Deeper & Subtler */}
            <View className="absolute top-[-10%] right-[-20%] w-[100%] h-[50%] bg-indigo-600/5 rounded-full blur-[100px]" />
            <View className="absolute bottom-[-10%] left-[-20%] w-[100%] h-[50%] bg-purple-600/5 rounded-full blur-[100px]" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header Section */}
                    <View className="items-center mb-10">
                        <View className="mb-6">
                            <BrandLogo size={60} />
                        </View>
                        <View className="flex-row items-center mb-1">
                            <Sparkles size={12} color="#6366f1" />
                            <Text className="text-indigo-500 text-[10px] font-black uppercase tracking-[3px] ml-2">Welcome Back</Text>
                        </View>
                        <Text className="text-white text-4xl font-black tracking-tight">Fluently</Text>
                    </View>

                    {/* Main Form Card */}
                    <AnimatedCard delay={200} className="overflow-hidden">
                        <View className="p-2">
                            <Text className="text-white text-2xl font-black mb-1">Sign In</Text>
                            <Text className="text-zinc-500 text-sm font-medium mb-8">Enter your credentials to continue practice</Text>

                            <View className="gap-y-5">
                                <View>
                                    <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Email Address</Text>
                                    <View className="relative">
                                        <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                            <MailIcon size={18} color="#71717a" />
                                        </View>
                                        <Input
                                            value={email}
                                            onChangeText={setEmail}
                                            placeholder="name@example.com"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            className="pl-12 h-14 bg-zinc-800/50 border-zinc-800"
                                        />
                                    </View>
                                </View>

                                <View>
                                    <View className="flex-row justify-between items-center mb-2 px-1">
                                        <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Password</Text>
                                        <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password' as any)}>
                                            <Text className="text-indigo-500 text-[10px] font-black uppercase tracking-widest">Forgot?</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View className="relative">
                                        <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                            <LockIcon size={18} color="#71717a" />
                                        </View>
                                        <Input
                                            value={password}
                                            onChangeText={setPassword}
                                            placeholder="••••••••"
                                            secureTextEntry={!showPassword}
                                            autoCapitalize="none"
                                            className="pl-12 pr-12 h-14 bg-zinc-800/50 border-zinc-800"
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
                                        >
                                            {showPassword ? <EyeIcon size={18} color="#6366f1" /> : <EyeOffIcon size={18} color="#52525b" />}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            {error && (
                                <View className="mt-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                                    <Text className="text-red-400 text-xs text-center font-bold">{error}</Text>
                                </View>
                            )}

                            <View className="mt-8">
                                <Button
                                    title={loading ? '' : 'Continue'}
                                    onPress={handleLogin}
                                    disabled={loading}
                                    className="h-14 rounded-2xl bg-indigo-600"
                                    textClassName="text-lg font-black"
                                >
                                    {loading && <ActivityIndicator color="white" />}
                                </Button>
                            </View>

                            <View className="mt-8 flex-row items-center justify-center">
                                <View className="h-[1px] flex-1 bg-zinc-800" />
                                <Text className="text-zinc-600 text-[10px] font-black uppercase tracking-[2px] mx-4">OR</Text>
                                <View className="h-[1px] flex-1 bg-zinc-800" />
                            </View>

                            <TouchableOpacity
                                onPress={() => router.push('/(auth)/register')}
                                className="mt-6 h-14 border border-zinc-800 rounded-2xl flex-row items-center justify-center space-x-2"
                                activeOpacity={0.7}
                            >
                                <Text className="text-zinc-400 font-bold">New here? </Text>
                                <Text className="text-white font-black">Create Account</Text>
                                <ArrowRight size={16} color="white" style={{ marginLeft: 4 }} />
                            </TouchableOpacity>
                        </View>
                    </AnimatedCard>

                    {/* Final Note */}
                    <Text className="mt-8 text-zinc-700 text-[10px] text-center font-black uppercase tracking-widest">
                        AI-Powered Language Excellence
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
