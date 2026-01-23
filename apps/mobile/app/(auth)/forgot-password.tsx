import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, User, Shield } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { NEON_AUTH_URL } from '@/lib/constants';

export default function ForgotPasswordScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleReset = async () => {
        if (!email.trim()) {
            setError('Please enter your email');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${NEON_AUTH_URL}/forget-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000'
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Failed to send reset email (${response.status})`);
            }

            const data = await response.json();

            setSuccess(true);

        } catch (err: any) {
            console.error('Reset error:', err);
            setError(err.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <View className="flex-1 bg-black items-center justify-center p-8">
                <View className="w-24 h-24 bg-green-500/10 rounded-full items-center justify-center border border-green-500/20 mb-6">
                    <Shield size={48} color="#22c55e" />
                </View>
                <Text className="text-white text-3xl font-black mb-2 text-center">Check Your Email</Text>
                <Text className="text-zinc-500 font-medium text-center mb-8">
                    We've sent a password reset link to your email address.
                </Text>
                <Button
                    title="Back to Sign In"
                    onPress={() => router.replace('/(auth)/login')}
                    variant="secondary"
                    className="w-full h-14 rounded-2xl"
                    textClassName="font-black"
                />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-black">
            {/* Background Glow */}
            <View
                className="absolute top-20 right-0 w-60 h-60 bg-indigo-600/15 rounded-full"
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
                        className="w-12 h-12 bg-zinc-900/80 rounded-2xl items-center justify-center mb-8"
                    >
                        <ChevronLeft color="white" size={24} />
                    </TouchableOpacity>

                    {/* Header */}
                    <View className="mb-8">
                        <Text className="text-white text-3xl font-black tracking-tight mb-2">
                            Reset Password
                        </Text>
                        <Text className="text-zinc-500 text-sm font-medium">
                            Enter your email and we'll send you a link to reset your password.
                        </Text>
                    </View>

                    {/* Form */}
                    <View className="bg-zinc-900/40 border border-zinc-800/50 p-8 rounded-[40px]">
                        <View className="mb-6">
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

                        {error && (
                            <View className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
                                <Text className="text-red-400 text-sm text-center font-bold">{error}</Text>
                            </View>
                        )}

                        <Button
                            title={loading ? 'Sending...' : 'Send Reset Link'}
                            onPress={handleReset}
                            loading={loading}
                            disabled={loading}
                            className="h-14 rounded-2xl"
                            textClassName="text-lg font-black"
                        />

                        <TouchableOpacity
                            onPress={() => router.replace('/(auth)/login')}
                            className="mt-6 items-center"
                        >
                            <Text className="text-zinc-500 text-sm font-bold">
                                Remember your password? <Text className="text-indigo-400">Sign In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
