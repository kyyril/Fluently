import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTodayRoutine, useCompleteTask, useSubmitRecap } from '@/features/dashboard/hooks/useRoutine';
import { useAuthStore } from '@/stores/authStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { LoadingScreen } from '@/components/ui/States';
import { BookText, ChevronLeft, Sparkles, CheckCircle, AlertCircle, ArrowRight, Star } from 'lucide-react-native';
import { toast } from '@/stores/toastStore';
import * as Haptics from 'expo-haptics';

function DayRecapScreen() {
    const router = useRouter();
    const { user } = useAuthStore();
    const { hapticsEnabled } = useSettingsStore();
    const { data: routine, isLoading: loadingRoutine } = useTodayRoutine();
    const submitRecapMutation = useSubmitRecap();
    const completeTaskMutation = useCompleteTask();

    const [content, setContent] = useState('');
    const [aiReview, setAiReview] = useState<{
        feedback: string;
        corrections: string[];
        corrected: string;
    } | null>(null);

    // Get the DAY_RECAP task from the routine
    const recapTask = routine?.tasks.find(t => t.taskType === 'DAY_RECAP');
    const isAlreadyCompleted = recapTask?.completed || false;

    useEffect(() => {
        if (routine?.dayRecap) {
            setContent(routine.dayRecap);
        }
        if (routine?.aiReview) {
            try {
                setAiReview(JSON.parse(routine.aiReview));
            } catch (e) {
                console.error('Failed to parse AI review:', e);
            }
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
            const result = await submitRecapMutation.mutateAsync({
                content,
                dailyLogId: routine?.id
            });

            setAiReview(result);

            // If the task is not yet completed, complete it
            if (recapTask && !recapTask.completed) {
                await completeTaskMutation.mutateAsync({
                    taskId: recapTask.id,
                });
                toast.success('Daily Recap complete! +40 XP');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to process recap. Please try again.');
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
                contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 40 }}
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
                        Write a short summary of your day in {user?.targetLanguage || 'your target language'}. Our AI will provide feedback on your grammar.
                    </Text>
                </View>

                {/* Input Area */}
                {!aiReview || !isAlreadyCompleted ? (
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
                                editable={!submitRecapMutation.isPending && !isAlreadyCompleted}
                                accessible
                                accessibilityLabel="Write your daily recap here"
                                accessibilityHint="Provide at least 10 characters for Gemini AI to review"
                            />

                        </View>

                        {!isAlreadyCompleted && (
                            <Button
                                className="mt-4"
                                onPress={handleSubmit}
                                loading={submitRecapMutation.isPending || completeTaskMutation.isPending}
                                icon={<ArrowRight size={20} color="white" />}
                                title="Submit Recap"
                            />

                        )}
                    </View>
                ) : null}

                {/* AI Review Results */}
                {aiReview && (
                    <View className="gap-y-6">
                        <AnimatedCard index={0}>
                            <View className="flex-row items-center mb-3">
                                <View className="bg-green-500/20 p-2 rounded-lg">
                                    <CheckCircle size={18} color="#22c55e" />
                                </View>
                                <Text className="text-white font-bold text-lg ml-3">AI Feedback</Text>
                            </View>
                            <Text className="text-zinc-300 text-sm leading-6">
                                {aiReview.feedback}
                            </Text>
                        </AnimatedCard>

                        {aiReview.corrections.length > 0 && (
                            <AnimatedCard index={1}>
                                <View className="flex-row items-center mb-3">
                                    <View className="bg-yellow-500/20 p-2 rounded-lg">
                                        <AlertCircle size={18} color="#eab308" />
                                    </View>
                                    <Text className="text-white font-bold text-lg ml-3">Improvements</Text>
                                </View>
                                <View className="gap-y-2">
                                    {aiReview.corrections.map((correction, i) => (
                                        <View key={i} className="flex-row">
                                            <Text className="text-indigo-500 mr-2">•</Text>
                                            <Text className="text-zinc-400 text-xs flex-1">{correction}</Text>
                                        </View>
                                    ))}
                                </View>
                            </AnimatedCard>
                        )}

                        <AnimatedCard index={2}>
                            <View className="flex-row items-center mb-3">
                                <View className="bg-indigo-500/20 p-2 rounded-lg">
                                    <Star size={18} color="#6366f1" />
                                </View>
                                <Text className="text-white font-bold text-lg ml-3">Corrected Version</Text>
                            </View>
                            <View className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                                <Text className="text-white text-sm italic leading-6">
                                    "{aiReview.corrected}"
                                </Text>
                            </View>
                        </AnimatedCard>

                        <Button
                            variant="secondary"
                            className="mt-4"
                            onPress={() => router.push('/(main)/')}
                            title="Back to Dashboard"
                        />

                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default DayRecapScreen;
