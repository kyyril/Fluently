import React, { useState, useEffect, useRef } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Shield, RefreshCw, ArrowRight, Sparkles } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { useAuthStore } from '@/stores/authStore';
import api from '@/lib/api/client';
import { NEON_AUTH_URL } from '@/lib/constants';

export default function VerifyEmailScreen() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const { email, password } = useLocalSearchParams<{ email: string; password?: string }>();

    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
    const [resendCooldown, setResendCooldown] = useState(0);

    const inputRefs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | undefined;
        if (resendCooldown > 0) {
            timer = setInterval(() => {
                setResendCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => { if (timer) clearInterval(timer); };
    }, [resendCooldown]);

    const handleCodeChange = (value: string, index: number) => {
        const digit = value.replace(/\D/g, '').slice(-1);
        const newCode = [...code];
        newCode[index] = digit;
        setCode(newCode);

        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        if (digit && index === 5) {
            const fullCode = newCode.join('');
            if (fullCode.length === 6) {
                handleVerify(fullCode);
            }
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (otp?: string) => {
        const verificationCode = otp || code.join('');

        if (verificationCode.length !== 6) {
            setError('Please enter the full 6-digit code');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${NEON_AUTH_URL}/email-otp/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000'
                },
                body: JSON.stringify({
                    email,
                    otp: verificationCode
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Invalid or expired code');
            }

            const data = await response.json();
            const neonUser = data.user;

            setSuccess(true);

            if (neonUser && neonUser.id && neonUser.email) {
                try {
                    const syncResponse = await api.post('/auth/sync', {
                        neonUserId: neonUser.id,
                        email: neonUser.email,
                        password,
                        displayName: neonUser.name || neonUser.email.split('@')[0]
                    });
                    const { user, token: localToken } = syncResponse.data.data;
                    await setAuth(user, localToken);

                    setTimeout(() => {
                        if (user.level) router.replace('/(main)');
                        else router.replace('/(auth)/onboarding');
                    }, 1500);
                    return;
                } catch (apiErr) {
                    console.error('Sync failed', apiErr);
                }
            }
            setTimeout(() => router.replace('/(auth)/login'), 2000);

        } catch (err: any) {
            setError(err.message || 'Verification failed');
            setCode(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!email || resendCooldown > 0) return;
        setResendStatus('sending');
        setError(null);

        try {
            const response = await fetch(`${NEON_AUTH_URL}/email-otp/send-verification-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000'
                },
                body: JSON.stringify({ email, type: 'email-verification', }),
            });

            if (!response.ok) throw new Error('Failed to send code');

            setResendStatus('sent');
            setResendCooldown(60);
        } catch (err: any) {
            setError(err.message || 'Failed to send new code');
            setResendStatus('idle');
        }
    };

    if (success) {
        return (
            <View style={{ flex: 1, backgroundColor: '#000000' }} className="items-center justify-center p-8">
                <View className="w-24 h-24 bg-indigo-500/10 rounded-full items-center justify-center border border-indigo-500/20 mb-6">
                    <Shield size={48} color="#6366f1" />
                </View>
                <Text className="text-white text-3xl font-black mb-2">Verified!</Text>
                <Text className="text-zinc-500 font-medium text-center">Preparing your learning environment...</Text>
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
                            <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-[2px] ml-2">Verification</Text>
                        </View>
                        <View className="w-10" />
                    </View>

                    {/* Header */}
                    <View className="mb-8">
                        <Text className="text-white text-4xl font-black tracking-tight">Security Check</Text>
                        <Text className="text-zinc-500 font-medium mt-1">We've sent a 6-digit code to your email</Text>
                    </View>

                    {/* Verification Card */}
                    <AnimatedCard delay={100}>
                        <View className="p-2">
                            {/* Target Email Badge */}
                            <View className="flex-row items-center justify-center bg-indigo-500/10 border border-indigo-500/20 rounded-2xl py-3 px-4 mb-10">
                                <Text className="text-indigo-400 font-black text-xs mr-2">TARGET:</Text>
                                <Text className="text-white font-bold text-xs" numberOfLines={1}>{email}</Text>
                            </View>

                            {/* OTP Input */}
                            <View className="mb-8">
                                <View className="flex-row justify-center gap-x-2">
                                    {code.map((digit, index) => (
                                        <TextInput
                                            key={index}
                                            ref={(ref) => { inputRefs.current[index] = ref; }}
                                            value={digit}
                                            onChangeText={(value) => handleCodeChange(value, index)}
                                            onKeyPress={(e) => handleKeyPress(e, index)}
                                            keyboardType="number-pad"
                                            maxLength={1}
                                            className="w-12 h-16 bg-zinc-800/50 border border-zinc-800 rounded-2xl text-white text-2xl font-black text-center"
                                            editable={!loading}
                                            placeholder="-"
                                            placeholderTextColor="#3f3f46"
                                            selectTextOnFocus
                                        />
                                    ))}
                                </View>
                            </View>

                            {error && (
                                <View className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
                                    <Text className="text-red-400 text-xs text-center font-bold">{error}</Text>
                                </View>
                            )}

                            <Button
                                title={loading ? '' : 'Confirm Access'}
                                onPress={() => handleVerify()}
                                disabled={loading || code.join('').length < 6}
                                className="h-14 rounded-2xl bg-indigo-600 mb-6"
                                textClassName="text-lg font-black"
                            >
                                {loading && <ActivityIndicator color="white" />}
                            </Button>

                            {/* Resend Logic */}
                            <TouchableOpacity
                                onPress={handleResend}
                                disabled={resendStatus === 'sending' || resendCooldown > 0}
                                className="flex-row items-center justify-center py-2"
                            >
                                {resendCooldown > 0 ? (
                                    <View className="flex-row items-center">
                                        <Text className="text-zinc-600 font-black text-xs tabular-nums">{resendCooldown}s</Text>
                                        <Text className="text-zinc-600 text-xs font-bold ml-2">UNTIL RESEND</Text>
                                    </View>
                                ) : (
                                    <View className="flex-row items-center">
                                        <RefreshCw size={12} color="#818cf8" className="mr-2" />
                                        <Text className="text-indigo-400 text-xs font-black ml-2 uppercase">
                                            {resendStatus === 'sent' ? 'Code Sent!' : 'Resend Verification Code'}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            <View className="mt-8 pt-6 border-t border-zinc-800/50">
                                <TouchableOpacity
                                    onPress={() => router.replace('/(auth)/login')}
                                    className="flex-row justify-center items-center py-2"
                                >
                                    <Text className="text-zinc-500 font-bold text-xs">Different account? </Text>
                                    <Text className="text-white font-black text-xs">Switch</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </AnimatedCard>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
