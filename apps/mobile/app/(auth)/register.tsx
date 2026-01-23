import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Shield, User } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
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
            // Sign up via Neon Auth API (Sends OTP)
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
                throw new Error(errorData.message || `Registration failed (${signUpResponse.status})`);
            }

            // Navigate to verification screen
            router.push({
                pathname: '/(auth)/verify-email' as any,
                params: { email, password }
            });

        } catch (err: any) {
            console.error('Registration error:', err);
            setError(err.message || 'Registration failed. Email might already be taken.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-black">
            {/* Background Glows */}
            <View
                className="absolute -top-20 -right-20 w-80 h-80 bg-purple-600/15 rounded-full"
                style={{ transform: [{ scale: 1.5 }] }}
            />
            <View
                className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-600/10 rounded-full"
                style={{ transform: [{ scale: 1.5 }] }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, padding: 24, paddingTop: 60 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-12 h-12 bg-zinc-900/80 rounded-2xl items-center justify-center mb-6"
                    >
                        <ChevronLeft color="white" size={24} />
                    </TouchableOpacity>

                    {/* Header */}
                    <View className="mb-8">
                        <Text className="text-white text-3xl font-black tracking-tight mb-2">Join Us</Text>
                        <Text className="text-zinc-500 text-sm font-medium">Create your Fluently account</Text>
                    </View>

                    {/* Register Form */}
                    <View className="bg-zinc-900/40 border border-zinc-800/50 p-8 rounded-[40px]">
                        <View className="gap-y-4 mb-6">
                            {/* Name Input */}
                            <View>
                                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                    Full Name
                                </Text>
                                <View className="relative">
                                    <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                        <User size={18} color="#52525b" />
                                    </View>
                                    <Input
                                        value={name}
                                        onChangeText={setName}
                                        placeholder="John Doe"
                                        autoCapitalize="words"
                                        autoComplete="name"
                                        className="pl-12"
                                    />
                                </View>
                            </View>

                            {/* Email Input */}
                            <View>
                                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                    Email Address
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

                            {/* Password Input */}
                            <View>
                                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                    Create Password
                                </Text>
                                <View className="relative">
                                    <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                        <Shield size={18} color="#52525b" />
                                    </View>
                                    <Input
                                        value={password}
                                        onChangeText={setPassword}
                                        placeholder="Min 8 characters"
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

                            {/* Confirm Password Input */}
                            <View>
                                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                    Confirm Password
                                </Text>
                                <View className="relative">
                                    <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                        <Shield size={18} color="#52525b" />
                                    </View>
                                    <Input
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        placeholder="••••••••"
                                        secureTextEntry
                                        autoCapitalize="none"
                                        className="pl-12"
                                    />
                                </View>
                            </View>
                        </View>

                        {error && (
                            <View className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
                                <Text className="text-red-400 text-sm text-center font-bold">{error}</Text>
                            </View>
                        )}

                        <Button
                            title={loading ? 'Creating account...' : 'Get Started'}
                            onPress={handleRegister}
                            loading={loading}
                            disabled={loading}
                            className="h-14 rounded-2xl"
                            textClassName="text-lg font-black"
                        />

                        <View className="mt-6 pt-6 border-t border-zinc-800/50">
                            <View className="flex-row justify-center items-center">
                                <Text className="text-zinc-500 font-medium">Already a member? </Text>
                                <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
                                    <Text className="text-indigo-400 font-black">Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Footer */}
                    <View className="mt-8 px-4">
                        <Text className="text-zinc-600 text-[10px] text-center font-bold uppercase tracking-widest leading-4">
                            By creating an account, you agree to our Terms of Service and Privacy Policy.
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
