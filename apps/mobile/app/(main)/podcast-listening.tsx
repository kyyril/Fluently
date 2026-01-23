import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTodayRoutine, useCompleteTask } from '@/features/dashboard/hooks/useRoutine';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Headset, ChevronLeft, CheckCircle, Sparkles, ArrowRight, BookOpen } from 'lucide-react-native';
import { toast } from '@/stores/toastStore';
import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '@/stores/settingsStore';

export default function PodcastListeningScreen() {
    const router = useRouter();
    const { user } = useAuthStore();
    const { hapticsEnabled } = useSettingsStore();
    const { data: routine, isLoading: loadingRoutine } = useTodayRoutine();
    const completeTaskMutation = useCompleteTask();

    const task = routine?.tasks.find(t => t.taskType === 'PODCAST_LISTENING');
    const isCompleted = task?.completed || false;

    const [form, setForm] = useState({
        title: '',
        description: '',
        link: '',
        conclusion: ''
    });

    const [step, setStep] = useState<'intro' | 'active' | 'success'>(isCompleted ? 'success' : 'intro');

    const handleComplete = async () => {
        if (!form.title.trim() || !form.description.trim()) {
            toast.error('Title and description are required!');
            return;
        }

        if (hapticsEnabled) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        try {
            if (task) {
                await completeTaskMutation.mutateAsync({
                    taskId: task.id,
                    metadata: form
                });
                setStep('success');
                toast.success('Podcast task complete! +30 XP');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to complete task.');
        }
    };

    if (step === 'intro') {
        return (
            <View className="flex-1 bg-black p-6 justify-center">
                <View className="items-center space-y-6">
                    <View className="w-24 h-24 bg-blue-500/10 rounded-full items-center justify-center">
                        <Headset size={48} color="#3b82f6" />
                    </View>
                    <View className="items-center">
                        <Text className="text-white text-3xl font-black text-center">Podcast Listening</Text>
                        <Text className="text-zinc-400 text-center mt-4 text-base leading-6">
                            Listen to at least 15 minutes of content in {user?.targetLanguage || 'your target language'}.
                            Focus on native speakers and try to catch the main theme.
                        </Text>
                    </View>
                    <Button
                        className="w-full h-14 rounded-2xl mt-8"
                        onPress={() => setStep('active')}
                        title="Start Task"
                        textClassName="text-lg font-black"
                    />
                    <TouchableOpacity onPress={() => router.back()} className="mt-4">
                        <Text className="text-zinc-500 font-bold">Maybe later</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (step === 'success') {
        return (
            <View className="flex-1 bg-black p-6 justify-center">
                <View className="items-center space-y-6">
                    <View className="w-24 h-24 bg-green-500/10 rounded-full items-center justify-center">
                        <CheckCircle size={48} color="#22c55e" />
                    </View>
                    <View className="items-center">
                        <Text className="text-white text-3xl font-black text-center">Good Job!</Text>
                        <Text className="text-zinc-400 text-center mt-2 text-lg">
                            You've earned <Text className="text-indigo-500 font-black">+30 XP</Text>
                        </Text>
                    </View>

                    <View className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mt-4">
                        <View className="flex-row items-center mb-3">
                            <Headset size={16} color="#3b82f6" />
                            <Text className="text-white font-bold ml-2 text-base" numberOfLines={1}>
                                {(form.title || (task?.metadata as any)?.title || 'Podcast Session') as string}
                            </Text>
                        </View>
                        <Text className="text-zinc-400 text-sm italic">
                            {"\"" + (form.description || (task?.metadata as any)?.description || 'No description provided') + "\""}
                        </Text>
                    </View>

                    <Button
                        className="w-full h-14 rounded-2xl mt-8"
                        onPress={() => router.push('/(main)/' as any)}
                        title="Return Home"
                        textClassName="text-lg font-black"
                    />
                </View>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-black"
        >
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 180 }}>
                {/* Header */}
                <View className="flex-row items-center mb-8">
                    <TouchableOpacity
                        onPress={() => setStep('intro')}
                        className="w-10 h-10 bg-zinc-900 rounded-xl items-center justify-center mr-4 border border-zinc-800"
                    >
                        <ChevronLeft color="white" size={24} />
                    </TouchableOpacity>
                    <View>
                        <Text className="text-white text-2xl font-black">Active Listening</Text>
                        <Text className="text-zinc-500 text-xs">Fill in what you've learned</Text>
                    </View>
                </View>

                {/* Form */}
                <View className="gap-y-6">
                    {/* Title */}
                    <View>
                        <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                            Podcast/Video Title
                        </Text>
                        <View className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 flex-row items-center">
                            <Headset size={18} color="#71717a" />
                            <TextInput
                                value={form.title}
                                onChangeText={(val) => setForm({ ...form, title: val })}
                                placeholder="e.g. Spanish with Juan - Ep. 45"
                                placeholderTextColor="#52525b"
                                className="flex-1 text-white font-bold ml-3 text-base"
                            />
                        </View>
                    </View>

                    {/* Description */}
                    <View>
                        <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                            Short Summary
                        </Text>
                        <View className="bg-zinc-900 border border-zinc-800 rounded-3xl px-4 py-4 min-h-[120px]">
                            <TextInput
                                multiline
                                value={form.description}
                                onChangeText={(val) => setForm({ ...form, description: val })}
                                placeholder="What was the main topic?"
                                placeholderTextColor="#52525b"
                                className="text-white text-base leading-6"
                                style={{ textAlignVertical: 'top' }}
                            />
                        </View>
                    </View>

                    {/* Optional Fields */}
                    <View className="flex-row gap-x-4">
                        <View className="flex-1">
                            <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                Source Link (Optional)
                            </Text>
                            <View className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 flex-row items-center">
                                <BookOpen size={14} color="#71717a" />
                                <TextInput
                                    value={form.link}
                                    onChangeText={(val) => setForm({ ...form, link: val })}
                                    placeholder="YouTube/Spotify"
                                    placeholderTextColor="#52525b"
                                    className="flex-1 text-white text-xs ml-2"
                                />
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                            Key Takeaway (Optional)
                        </Text>
                        <View className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 flex-row items-center">
                            <Sparkles size={14} color="#71717a" />
                            <TextInput
                                value={form.conclusion}
                                onChangeText={(val) => setForm({ ...form, conclusion: val })}
                                placeholder="What did you learn?"
                                placeholderTextColor="#52525b"
                                className="flex-1 text-white text-xs ml-2"
                            />
                        </View>
                    </View>

                    <Button
                        className="h-14 rounded-2xl mt-4"
                        onPress={handleComplete}
                        loading={completeTaskMutation.isPending}
                        title="Complete Task"
                        icon={<ArrowRight size={20} color="white" />}
                        textClassName="text-lg font-black"
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
