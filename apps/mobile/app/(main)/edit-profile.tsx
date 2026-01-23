import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, User, Check, Target, Flame, Star } from 'lucide-react-native';
import { useAuthStore } from '@/stores/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api/client';
import { QUERY_KEYS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

const LEVELS = [
    { id: 'BEGINNER', name: 'Beginner', desc: 'Just starting to learn', Icon: Target },
    { id: 'INTERMEDIATE', name: 'Intermediate', desc: 'Can hold basic conversations', Icon: Flame },
    { id: 'ADVANCED', name: 'Advanced', desc: 'Near-fluent, refining skills', Icon: Star },
];

export default function EditProfileScreen() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { user, updateUser } = useAuthStore();

    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [level, setLevel] = useState(user?.level || 'BEGINNER');

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setLevel(user.level || 'BEGINNER');
        }
    }, [user]);

    const updateMutation = useMutation({
        mutationFn: async (data: { displayName: string; level: string }) => {
            const response = await api.patch('/users/me', data);
            return response.data.data;
        },
        onSuccess: (updatedUser) => {
            updateUser(updatedUser);
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_ME });
            Alert.alert('Success', 'Profile updated successfully!', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        },
        onError: (error: any) => {
            Alert.alert('Error', error.message || 'Failed to update profile');
        }
    });

    const handleSave = () => {
        if (!displayName.trim()) {
            Alert.alert('Error', 'Display name is required');
            return;
        }
        updateMutation.mutate({ displayName: displayName.trim(), level });
    };

    return (
        <View className="flex-1 bg-black">
            <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 100 }}>
                {/* Header */}
                <View className="flex-row items-center mb-8">
                    <Pressable
                        onPress={() => router.back()}
                        className="w-10 h-10 bg-zinc-900 rounded-xl items-center justify-center mr-4"
                    >
                        <ChevronLeft size={20} color="white" />
                    </Pressable>
                    <View>
                        <Text className="text-white text-2xl font-black">Edit Profile</Text>
                        <Text className="text-zinc-500 text-xs">Personalize your journey</Text>
                    </View>
                </View>

                {/* Avatar Preview */}
                <View className="items-center mb-8">
                    <View className="w-24 h-24 bg-indigo-600 rounded-full items-center justify-center">
                        <Text className="text-white text-4xl font-black">
                            {displayName?.charAt(0) || user?.displayName?.charAt(0) || 'U'}
                        </Text>
                    </View>
                </View>

                {/* Display Name Input */}
                <View className="mb-6">
                    <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                        Display Name
                    </Text>
                    <View className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 flex-row items-center">
                        <User size={18} color="#71717a" />
                        <TextInput
                            value={displayName}
                            onChangeText={setDisplayName}
                            placeholder="Your display name"
                            placeholderTextColor="#52525b"
                            className="flex-1 text-white font-bold ml-3 text-base"
                            maxLength={50}
                        />
                    </View>
                </View>

                {/* Email (Read-only) */}
                <View className="mb-8">
                    <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                        Email
                    </Text>
                    <View className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl px-4 py-3">
                        <Text className="text-zinc-500 font-medium">{user?.email || ''}</Text>
                    </View>
                    <Text className="text-zinc-600 text-[10px] mt-1 ml-1">
                        Email cannot be changed
                    </Text>
                </View>

                {/* Level Selection */}
                <View className="mb-8">
                    <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-3 ml-1">
                        Learning Level
                    </Text>
                    <View className="gap-y-3">
                        {LEVELS.map((l) => {
                            const isSelected = level === l.id;
                            return (
                                <Pressable
                                    key={l.id}
                                    onPress={() => setLevel(l.id)}
                                    className={`p-4 rounded-2xl border flex-row items-center justify-between ${isSelected
                                        ? 'bg-indigo-500/10 border-indigo-500/30'
                                        : 'bg-zinc-900 border-zinc-800'
                                        }`}
                                >
                                    <View className="flex-row items-center">
                                        <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${isSelected ? 'bg-indigo-500/20' : 'bg-zinc-800'
                                            }`}>
                                            <l.Icon size={24} color={isSelected ? '#6366f1' : '#71717a'} />
                                        </View>
                                        <View>
                                            <Text className={`font-bold ${isSelected ? 'text-indigo-400' : 'text-white'}`}>
                                                {l.name}
                                            </Text>
                                            <Text className="text-zinc-500 text-xs">{l.desc}</Text>
                                        </View>
                                    </View>
                                    {isSelected && (
                                        <View className="w-6 h-6 bg-indigo-500 rounded-full items-center justify-center">
                                            <Check size={14} color="white" />
                                        </View>
                                    )}
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                {/* Save Button */}
                <Button
                    title={updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                    onPress={handleSave}
                    loading={updateMutation.isPending}
                    disabled={updateMutation.isPending}
                    className="h-14 rounded-2xl"
                    textClassName="text-lg font-black"
                />
            </ScrollView>
        </View>
    );
}
