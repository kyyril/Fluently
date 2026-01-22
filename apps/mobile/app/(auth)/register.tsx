import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { Target, ChevronLeft } from 'lucide-react-native';

export default function RegisterScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-black"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 30 }}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center mb-6"
                >
                    <ChevronLeft color="white" size={20} />
                </TouchableOpacity>

                <View className="items-center mb-8">
                    <Text className="text-white text-3xl font-black tracking-tighter">Create Account</Text>
                    <Text className="text-zinc-500 text-sm mt-2 font-medium">Start your language journey today</Text>
                </View>

                <View className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8">
                    <View className="space-y-4">
                        <View>
                            <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">Full Name</Text>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                placeholder="John Doe"
                                placeholderTextColor="#52525b"
                                className="bg-zinc-950 border border-zinc-800 text-white px-5 py-4 rounded-2xl font-bold"
                            />
                        </View>

                        <View className="mt-4">
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

                    <Button
                        title="Create Account"
                        onPress={() => { }}
                        loading={loading}
                        className="mt-8 py-5 rounded-2xl"
                    />

                    <View className="flex-row justify-center mt-6">
                        <Text className="text-zinc-500 font-bold">Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
                            <Text className="text-indigo-500 font-black">Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
