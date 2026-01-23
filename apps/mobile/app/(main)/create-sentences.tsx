import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTodayRoutine, useCompleteTask } from '@/features/dashboard/hooks/useRoutine';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { PenLine, ChevronLeft, CheckCircle, ArrowRight, Sparkles } from 'lucide-react-native';
import { toast } from '@/stores/toastStore';
import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '@/stores/settingsStore';

export default function CreateSentencesScreen() {
    const router = useRouter();
    const { user } = useAuthStore();
    const { hapticsEnabled } = useSettingsStore();
    const { data: routine, isLoading: loadingRoutine } = useTodayRoutine();
    const completeTaskMutation = useCompleteTask();

    const task = routine?.tasks.find(t => t.taskType === 'CREATE_SENTENCES');
    const isCompleted = task?.completed || false;

    const [sentences, setSentences] = useState(['', '', '']);
    const [step, setStep] = useState<'intro' | 'active' | 'success'>(isCompleted ? 'success' : 'intro');

    const updateSentence = (text: string, index: number) => {
        const newSentences = [...sentences];
        newSentences[index] = text;
        setSentences(newSentences);
    };

    const handleComplete = async () => {
        const filledSentences = sentences.filter(s => s.trim().length > 5);
        if (filledSentences.length < 3) {
            toast.error('Please write at least 3 sentences (min 5 characters each)');
            return;
        }

        if (hapticsEnabled) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        try {
            if (task) {
                await completeTaskMutation.mutateAsync({
                    taskId: task.id,
                    metadata: { sentences: filledSentences }
                });
                setStep('success');
                toast.success('Sentences submitted! +25 XP');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to submit sentences.');
        }
    };

    if (step === 'intro') {
        return (
            <View className="flex-1 bg-black p-6 justify-center">
                <View className="items-center space-y-6">
                    <View className="w-24 h-24 bg-orange-500/10 rounded-full items-center justify-center">
                        <PenLine size={48} color="#f97316" />
                    </View>
                    <View className="items-center">
                        <Text className="text-white text-3xl font-black text-center">Sentence Builder</Text>
                        <Text className="text-zinc-400 text-center mt-4 text-base leading-6">
                            Construct 3 original sentences in {user?.targetLanguage || 'your target language'}.
                            Use the verbs or concepts you've recently studied.
                        </Text>
                    </View>
                    <Button
                        className="w-full h-14 rounded-2xl mt-8"
                        onPress={() => setStep('active')}
                        title="Start Writing"
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
                        <Text className="text-white text-3xl font-black text-center">Excellent!</Text>
                        <Text className="text-zinc-400 text-center mt-2 text-lg">
                            You've earned <Text className="text-indigo-500 font-black">+25 XP</Text>
                        </Text>
                    </View>

                    <View className="w-full gap-y-3 mt-4">
                        {(sentences.filter(s => s) || []).slice(0, 3).map((s, i) => (
                            <View key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                                <Text className="text-zinc-400 text-sm italic">"{s}"</Text>
                            </View>
                        ))}
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
                        <Text className="text-white text-2xl font-black">Build Sentences</Text>
                        <Text className="text-zinc-500 text-xs">Think, Translate, Write</Text>
                    </View>
                </View>

                {/* Form */}
                <View className="gap-y-6">
                    {sentences.map((sentence, index) => (
                        <View key={index}>
                            <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                                Sentence {index + 1}
                            </Text>
                            <View className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 min-h-[80px]">
                                <TextInput
                                    multiline
                                    value={sentence}
                                    onChangeText={(text) => updateSentence(text, index)}
                                    placeholder="Type your sentence here..."
                                    placeholderTextColor="#52525b"
                                    className="text-white text-base leading-6"
                                    style={{ textAlignVertical: 'top' }}
                                />
                            </View>
                        </View>
                    ))}

                    <Button
                        className="h-14 rounded-2xl mt-4"
                        onPress={handleComplete}
                        loading={completeTaskMutation.isPending}
                        title="Submit All"
                        icon={<ArrowRight size={20} color="white" />}
                        textClassName="text-lg font-black"
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
