import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTodayRoutine, useCompleteTask } from '@/features/dashboard/hooks/useRoutine';
import { useAuthStore } from '@/stores/authStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { LoadingScreen } from '@/components/ui/States';
import { BookText, ChevronLeft, Sparkles, CheckCircle, AlertCircle, ArrowRight, Star } from 'lucide-react-native';
import { toast } from '@/stores/toastStore';
import * as Haptics from 'expo-haptics';
import { DictionaryModal } from '@/components/DictionaryModal';
import { InteractiveText } from '@/components/InteractiveText';

function DayRecapScreen() {
    const router = useRouter();
    const { user } = useAuthStore();
    const { hapticsEnabled } = useSettingsStore();
    const { data: routine, isLoading: loadingRoutine } = useTodayRoutine();
    const completeTaskMutation = useCompleteTask();

    const [content, setContent] = useState('');
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);

    const handleWordClick = (word: string) => {
        const cleanWord = word.replace(/^[^\w]+|[^\w]+$/g, '');
        if (cleanWord) {
            if (hapticsEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setSelectedWord(cleanWord);
            setIsDictionaryOpen(true);
        }
    };

    // Get the DAY_RECAP task from the routine
    const recapTask = routine?.tasks.find(t => t.taskType === 'DAY_RECAP');
    const isAlreadyCompleted = recapTask?.completed || false;

    useEffect(() => {
        if (routine?.dayRecap) {
            setContent(routine.dayRecap);
        }
    }, [routine]);

    const handleSubmit = async () => {
        if (!content.trim()) {
            toast.error('Please write something first!');
            return;
        }

        if (content.length < 10) {
            toast.error('Tell us a bit more! (Min 10 characters)');
            return;
        }

        if (hapticsEnabled) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        try {
            // If the task is not yet completed, complete it
            if (recapTask && !recapTask.completed) {
                await completeTaskMutation.mutateAsync({
                    taskId: recapTask.id,
                    metadata: { content }
                });
                toast.success('Daily Recap complete! +40 XP');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to save recap. Please try again.');
        }
    };

    if (loadingRoutine) return <LoadingScreen />;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-black"
        >
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 180 }}
            >
                {/* Header */}
                <View className="flex-row items-center justify-between mb-8">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        accessible
                        accessibilityLabel="Go back"
                        accessibilityRole="button"
                        className="w-10 h-10 bg-zinc-900 rounded-full items-center justify-center border border-zinc-800"
                    >

                        <ChevronLeft color="white" size={24} />
                    </TouchableOpacity>
                    <View className="flex-1 items-center">
                        <Text className="text-white text-lg font-black uppercase tracking-widest">Daily Recap</Text>
                    </View>
                    <View className="w-10" />
                </View>

                {/* Info Card */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-2">
                        <Sparkles size={16} color="#6366f1" />
                        <Text className="text-indigo-500 text-[10px] font-black uppercase tracking-widest ml-2">
                            Reflection
                        </Text>
                    </View>
                    <Text className="text-white text-2xl font-black">
                        How was your <Text className="text-indigo-500">day</Text>?
                    </Text>
                    <Text className="text-zinc-400 text-sm mt-1">
                        Write a short summary of your day in {user?.targetLanguage || 'your target language'} to track your progress.
                    </Text>
                </View>

                {/* Input Area */}
                {!isAlreadyCompleted ? (
                    <View className="mb-6">
                        <View className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 min-h-[200px]">
                            <TextInput
                                multiline
                                placeholder="Hoy fue un día excelente..."
                                placeholderTextColor="#52525b"
                                className="text-white text-base leading-6"
                                value={content}
                                onChangeText={setContent}
                                style={{ textAlignVertical: 'top' }}
                                editable={!completeTaskMutation.isPending && !isAlreadyCompleted}
                                accessible
                                accessibilityLabel="Write your daily recap here"
                                accessibilityHint="Provide at least 10 characters"
                            />

                        </View>

                        {!isAlreadyCompleted && (
                            <Button
                                className="mt-4"
                                onPress={handleSubmit}
                                loading={completeTaskMutation.isPending}
                                icon={<ArrowRight size={20} color="white" />}
                                title="Save Journal Entry"
                            />

                        )}
                    </View>
                ) : (
                    <View className="gap-y-6">
                        <AnimatedCard index={0}>
                            <View className="flex-row items-center mb-3">
                                <View className="bg-green-500/20 p-2 rounded-lg">
                                    <CheckCircle size={18} color="#22c55e" />
                                </View>
                                <Text className="text-white font-bold text-lg ml-3">Your Entry</Text>
                            </View>
                            <InteractiveText
                                text={content}
                                onWordClick={handleWordClick}
                                className="text-zinc-300 text-base italic leading-7"
                            />
                        </AnimatedCard>

                        <Button
                            variant="secondary"
                            className="mt-4"
                            onPress={() => router.push('/(main)')}
                            title="Back to Dashboard"
                        />
                    </View>
                )}

                <DictionaryModal
                    word={selectedWord}
                    isOpen={isDictionaryOpen}
                    onClose={() => setIsDictionaryOpen(false)}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default DayRecapScreen;
