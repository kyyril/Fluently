import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Shield, ArrowRight, Sparkles } from 'lucide-react-native';
import { MailIcon } from '@/components/icons/EyeIcons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
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
                throw new Error(errorData.message || 'Failed to send reset email');
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <View style={{ flex: 1, backgroundColor: '#000000' }} className="items-center justify-center p-8">
                <View className="w-24 h-24 bg-indigo-500/10 rounded-full items-center justify-center border border-indigo-500/20 mb-6">
                    <Shield size={48} color="#6366f1" />
                </View>
                <Text className="text-white text-3xl font-black mb-2 text-center">Check Your Email</Text>
                <Text className="text-zinc-500 font-medium text-center mb-10">
                    We've sent a password reset link to your email address.
                </Text>
                <Button
                    title="Back to Sign In"
                    onPress={() => router.replace('/(auth)/login')}
                    className="w-full h-14 rounded-2xl bg-indigo-600"
                    textClassName="font-black text-lg"
                />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
            {/* Ambient Background - Deeper & Subtler */}
            <View className="absolute top-[-10%] right-[-20%] w-[100%] h-[50%] bg-indigo-600/5 rounded-full blur-[100px]" />
            <View className="absolute bottom-[-10%] left-[-20%] w-[100%] h-[50%] bg-blue-600/5 rounded-full blur-[100px]" />

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
                            <Sparkles size={12} color="#6366f1" />
                            <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-[2px] ml-2">Account Recovery</Text>
                        </View>
                        <View className="w-10" />
                    </View>

                    {/* Header */}
                    <View className="mb-8">
                        <Text className="text-white text-4xl font-black tracking-tight">Reset Password</Text>
                        <Text className="text-zinc-500 font-medium mt-1">We'll help you get back into your account</Text>
                    </View>

                    {/* Form Card */}
                    <AnimatedCard delay={100}>
                        <View className="p-2">
                            <View className="mb-8">
                                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                    Email Address
                                </Text>
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
                                        autoComplete="email"
                                        className="pl-12 h-14 bg-zinc-800/50 border-zinc-800"
                                    />
                                </View>
                            </View>

                            {error && (
                                <View className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
                                    <Text className="text-red-400 text-xs text-center font-bold">{error}</Text>
                                </View>
                            )}

                            <Button
                                title={loading ? '' : 'Send Recovery Link'}
                                onPress={handleReset}
                                disabled={loading}
                                className="h-14 rounded-2xl bg-indigo-600 mb-6"
                                textClassName="text-lg font-black"
                            >
                                {loading && <ActivityIndicator color="white" />}
                            </Button>

                            <View className="mt-4 pt-6 border-t border-zinc-800/50">
                                <TouchableOpacity
                                    onPress={() => router.replace('/(auth)/login')}
                                    className="flex-row justify-center items-center py-2"
                                >
                                    <Text className="text-zinc-600 text-xs font-bold">Remembered password? </Text>
                                    <Text className="text-white font-black text-xs">Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </AnimatedCard>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
