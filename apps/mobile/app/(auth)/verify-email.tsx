import React, { useState, useEffect, useRef } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Shield, RefreshCw, ArrowRight } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
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

    // Cooldown timer
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
        // Only allow digits
        const digit = value.replace(/\D/g, '').slice(-1);

        const newCode = [...code];
        newCode[index] = digit;
        setCode(newCode);

        // Auto-focus next input
        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when complete
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
                throw new Error(errorData.message || `Invalid or expired code (${response.status})`);
            }

            const data = await response.json();
            console.log('[Verify] Neon OTP Response:', JSON.stringify(data));
            const neonUser = data.user;

            setSuccess(true);

            if (neonUser && neonUser.id && neonUser.email) {
                // Sync Neon User to Local DB with password
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
                        if (user.level) {
                            router.replace('/(main)');
                        } else {
                            router.replace('/(auth)/onboarding');
                        }
                    }, 1500);
                    return;
                } catch (apiErr) {
                    console.error('Sync failed after verify:', apiErr);
                }
            }

            // Fallback to login screen
            setTimeout(() => {
                router.replace('/(auth)/login');
            }, 2000);

        } catch (err: any) {
            console.error('Verification error:', err);
            setError(err.message || 'Verification failed. Please try again.');
            // Clear the code on error
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
                body: JSON.stringify({
                    email,
                    type: 'email-verification',
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Failed to send code (${response.status})`);
            }

            const data = await response.json();

            setResendStatus('sent');
            setResendCooldown(60);

        } catch (err: any) {
            console.error('Resend error:', err);
            setError(err.message || 'Failed to send new code');
            setResendStatus('idle');
        }
    };

    if (success) {
        return (
            <View className="flex-1 bg-black items-center justify-center p-8">
                <View className="w-24 h-24 bg-green-500/10 rounded-full items-center justify-center border border-green-500/20 mb-6">
                    <Shield size={48} color="#22c55e" />
                </View>
                <Text className="text-white text-3xl font-black mb-2">Verified!</Text>
                <Text className="text-zinc-500 font-medium text-center">
                    Redirecting you to sign in...
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-black">
            {/* Background Glows */}
            <View
                className="absolute top-10 right-10 w-60 h-60 bg-indigo-600/20 rounded-full"
                style={{ transform: [{ scale: 1.5 }] }}
            />
            <View
                className="absolute bottom-20 left-10 w-40 h-40 bg-purple-600/15 rounded-full"
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
                    <View className="items-center mb-10">
                        <View className="w-20 h-20 bg-indigo-600/20 rounded-3xl items-center justify-center mb-6 border border-indigo-600/30">
                            <Shield size={36} color="#6366f1" />
                        </View>
                        <Text className="text-white text-3xl font-black tracking-tight mb-2 uppercase">Security</Text>
                        <Text className="text-zinc-500 text-sm font-medium text-center">
                            Verify your email address
                        </Text>
                    </View>

                    {/* Email Display */}
                    <View className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-4 mb-8">
                        <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">
                            Identity
                        </Text>
                        <Text className="text-zinc-400 text-sm font-medium" numberOfLines={1}>
                            {email || 'No email provided'}
                        </Text>
                    </View>

                    {/* OTP Input */}
                    <View className="mb-6">
                        <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-4 text-center">
                            6-Digit Code
                        </Text>
                        <View className="flex-row justify-center gap-x-3">
                            {code.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => { inputRefs.current[index] = ref; }}
                                    value={digit}
                                    onChangeText={(value) => handleCodeChange(value, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    className="w-12 h-16 bg-zinc-900/60 border border-zinc-800 rounded-2xl text-white text-2xl font-black text-center"
                                    editable={!loading}
                                    selectTextOnFocus
                                />
                            ))}
                        </View>
                    </View>

                    {error && (
                        <View className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
                            <Text className="text-red-400 text-sm text-center font-bold">{error}</Text>
                        </View>
                    )}

                    <Button
                        title={loading ? 'Verifying...' : 'Confirm Access'}
                        onPress={() => handleVerify()}
                        loading={loading}
                        disabled={loading || code.join('').length < 6}
                        className="h-14 rounded-2xl mb-6"
                        textClassName="text-lg font-black"
                    />

                    {/* Resend Section */}
                    <View className="border-t border-zinc-800/50 pt-6">
                        <TouchableOpacity
                            onPress={handleResend}
                            disabled={resendStatus === 'sending' || resendCooldown > 0}
                            className="flex-row items-center justify-center gap-x-2 py-3"
                        >
                            {resendCooldown > 0 ? (
                                <>
                                    <Text className="text-zinc-600 font-bold text-sm tabular-nums">
                                        {resendCooldown}s
                                    </Text>
                                    <Text className="text-zinc-600 text-sm font-medium">
                                        Wait to Resend
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <RefreshCw size={14} color={resendStatus === 'sending' ? '#3f3f46' : '#a1a1aa'} />
                                    <Text className="text-zinc-400 text-sm font-bold">
                                        {resendStatus === 'sent' ? 'New Code Sent!' : 'Resend Code'}
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.replace('/(auth)/login')}
                            className="flex-row items-center justify-center gap-x-2 py-3 mt-2"
                        >
                            <Text className="text-zinc-600 text-xs font-bold">
                                Back to authentication
                            </Text>
                            <ArrowRight size={12} color="#52525b" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
