import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Target } from 'lucide-react-native';
import api from '@/lib/api/client';

export default function LoginScreen() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', { email, password });
            const { user, token } = response.data.data;

            await setAuth(user, token);

            if (user.level) {
                router.replace('/(main)');
            } else {
                router.replace('/(auth)/onboarding');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-black"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 30 }}>
                <View className="items-center mb-10">
                    <View className="w-16 h-16 bg-indigo-600 rounded-3xl items-center justify-center mb-6 shadow-lg shadow-indigo-500/50">
                        <Target color="white" size={32} />
                    </View>
                    <Text className="text-white text-4xl font-black tracking-tighter">Fluently</Text>
                    <Text className="text-zinc-500 text-sm mt-2 font-medium">Master your target language daily</Text>
                </View>

                <View className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8">
                    <Text className="text-white text-2xl font-black mb-6">Welcome Back</Text>

                    <View className="space-y-4">
                        <View>
                            <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Email Address</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="you@example.com"
                                placeholderTextColor="#52525b"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                className="bg-zinc-950 border border-zinc-800 text-white px-5 py-4 rounded-2xl font-bold"
                            />
                        </View>

                        <View className="mt-4">
                            <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Password</Text>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="••••••••"
                                placeholderTextColor="#52525b"
                                secureTextEntry
                                className="bg-zinc-950 border border-zinc-800 text-white px-5 py-4 rounded-2xl font-bold"
                            />
                        </View>
                    </View>

                    {error ? (
                        <Text className="text-red-500 text-xs font-bold mt-4 text-center">{error}</Text>
                    ) : null}

                    <Button
                        title="Sign In"
                        onPress={handleLogin}
                        loading={loading}
                        className="mt-8 py-5 rounded-2xl"
                        textClassName="text-base"
                    />

                    <View className="flex-row justify-center mt-6">
                        <Text className="text-zinc-500 font-bold">Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                            <Text className="text-indigo-500 font-black">Join Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
