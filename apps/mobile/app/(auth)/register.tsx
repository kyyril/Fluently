import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, User, ArrowRight, Sparkles } from 'lucide-react-native';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '@/components/icons/EyeIcons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { useAuthStore } from '@/stores/authStore';
import api from '@/lib/api/client';
import { NEON_AUTH_URL } from '@/lib/constants';

export default function RegisterScreen() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateForm = () => {
        if (!name.trim()) {
            setError('Please enter your name');
            return false;
        }
        if (!email.trim()) {
            setError('Please enter your email');
            return false;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        try {
            const signUpResponse = await fetch(`${NEON_AUTH_URL}/sign-up/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000'
                },
                body: JSON.stringify({
                    email,
                    password,
                    name,
                }),
            });

            if (!signUpResponse.ok) {
                const errorData = await signUpResponse.json().catch(() => ({}));
                throw new Error(errorData.message || 'Registration failed');
            }

            router.push({
                pathname: '/(auth)/verify-email' as any,
                params: { email, password }
            });

        } catch (err: any) {
            setError(err.message || 'Registration failed. Email might already be taken.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
            {/* Ambient Background - Deeper & Subtler */}
            <View className="absolute top-[-10%] left-[-20%] w-[100%] h-[50%] bg-purple-600/5 rounded-full blur-[100px]" />
            <View className="absolute bottom-[-10%] right-[-20%] w-[100%] h-[50%] bg-indigo-600/5 rounded-full blur-[100px]" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, padding: 24, paddingTop: 60 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Top Actions */}
                    <View className="flex-row items-center justify-between mb-8">
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl items-center justify-center"
                        >
                            <ChevronLeft color="white" size={20} />
                        </TouchableOpacity>
                        <View className="flex-row items-center">
                            <Sparkles size={12} color="#818cf8" />
                            <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-[2px] ml-2">New Account</Text>
                        </View>
                        <View className="w-10" />
                    </View>

                    {/* Header */}
                    <View className="mb-8">
                        <Text className="text-white text-4xl font-black tracking-tight">Create Account</Text>
                        <Text className="text-zinc-500 font-medium mt-1">Join the community of language experts</Text>
                    </View>

                    {/* Registration Card */}
                    <AnimatedCard delay={100}>
                        <View className="p-2 gap-y-5">
                            <View>
                                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Full Name</Text>
                                <View className="relative">
                                    <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                        <User size={18} color="#71717a" />
                                    </View>
                                    <Input
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="Enter your name"
                                        autoCapitalize="words"
                                        className="pl-12 h-14 bg-zinc-800/50 border-zinc-800"
                                    />
                                </View>
                            </View>

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
                                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Password</Text>
                                <View className="relative">
                                    <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                        <LockIcon size={18} color="#71717a" />
                                    </View>
                                    <Input
                                        value={password}
                                        onChangeText={setPassword}
                                        placeholder="Min 8 characters"
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

                            {error && (
                                <View className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                                    <Text className="text-red-400 text-xs text-center font-bold">{error}</Text>
                                </View>
                            )}

                            <Button
                                title={loading ? '' : 'Create Account'}
                                onPress={handleRegister}
                                disabled={loading}
                                className="h-14 rounded-2xl bg-indigo-600 mt-2"
                                textClassName="text-lg font-black"
                            >
                                {loading && <ActivityIndicator color="white" />}
                            </Button>

                            <View className="mt-4 pt-6 border-t border-zinc-800/50">
                                <TouchableOpacity
                                    onPress={() => router.replace('/(auth)/login')}
                                    className="flex-row justify-center items-center py-2"
                                >
                                    <Text className="text-zinc-500 font-bold text-sm">Have an account? </Text>
                                    <Text className="text-indigo-400 font-black text-sm">Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </AnimatedCard>

                    {/* Footer Legal */}
                    <View className="mt-8 px-8">
                        <Text className="text-zinc-700 text-[10px] text-center font-black uppercase tracking-widest leading-4">
                            By joining, you agree to our Terms and Privacy Policy.
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
