import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, Animated, ScrollView } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { Mic2, Square, Volume2, RefreshCw } from 'lucide-react-native';
import { useAuthStore } from '@/stores/authStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { useTodayRoutine, useCompleteTask } from '@/features/dashboard/hooks/useRoutine';
import { getLanguageCoachResponse } from '@/lib/ai/gemini';
import { toast } from '@/stores/toastStore';
import * as Haptics from 'expo-haptics';
import * as FileSystem from 'expo-file-system';

type SessionState = 'idle' | 'recording' | 'processing' | 'complete';

export default function SpeakingScreen() {
    const { user } = useAuthStore();
    const { hapticsEnabled } = useSettingsStore();
    const queryClient = useQueryClient();
    const { data: routine } = useTodayRoutine();
    const completeTaskMutation = useCompleteTask();

    const [sessionState, setSessionState] = useState<SessionState>('idle');
    const [transcript, setTranscript] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [error, setError] = useState('');

    const pulseAnim = React.useRef(new Animated.Value(1)).current;

    const startPulseAnimation = useCallback(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pulseAnim]);

    const stopPulseAnimation = useCallback(() => {
        pulseAnim.stopAnimation();
        pulseAnim.setValue(1);
    }, [pulseAnim]);

    const { isRecording, duration, startRecording, stopRecording } = useAudioRecorder({
        onRecordingComplete: async (uri, recordingDuration) => {
            setSessionState('processing');

            try {
                // Read audio file as base64
                const audioBase64 = await FileSystem.readAsStringAsync(uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                // For now, simulate transcription (in production, send to backend or Gemini)
                // const transcribedText = await transcribeAudioWithGemini(audioBase64);
                const transcribedText = "Hello, I would like to practice my English today.";
                setTranscript(transcribedText);

                // Get AI coaching response
                const coachResponse = await getLanguageCoachResponse(
                    transcribedText,
                    user?.targetLanguage || 'English',
                    user?.level || 'Intermediate'
                );

                setAiResponse(coachResponse);
                setSessionState('complete');

                // Mark task as complete if it's part of the daily routine
                const speakingTask = routine?.tasks.find(t => t.taskType === 'SPEAKING_SESSION' && !t.completed);
                if (speakingTask) {
                    completeTaskMutation.mutate({
                        taskId: speakingTask.id,
                        metadata: { transcript: transcribedText }
                    }, {
                        onSuccess: () => {
                            if (hapticsEnabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                            toast.success('Speaking practice completed!', '+80 XP earned');
                        }
                    });
                }

                // Clean up audio file
                await FileSystem.deleteAsync(uri, { idempotent: true });

            } catch (err) {
                console.error('Processing error:', err);
                setError('Failed to process your speech. Please try again.');
                setSessionState('idle');
            }
        },
        onError: (err) => {
            setError(err.message);
            setSessionState('idle');
        },
    });

    const handleStartRecording = async () => {
        if (hapticsEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        setError('');
        setTranscript('');
        setAiResponse('');
        setSessionState('recording');
        startPulseAnimation();
        await startRecording();
    };

    const handleStopRecording = async () => {
        if (hapticsEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        stopPulseAnimation();
        await stopRecording();
    };

    const handleReset = () => {
        if (hapticsEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        setSessionState('idle');
        setTranscript('');
        setAiResponse('');
        setError('');
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <ScrollView
            className="flex-1 bg-black"
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 64, paddingBottom: 180 }}
        >
            {/* Header */}
            <View className="mb-8">
                <View className="flex-row items-center mb-1">
                    <Mic2 size={12} color="#a855f7" />
                    <Text className="text-purple-500 text-[10px] font-black uppercase tracking-widest ml-2">
                        Speaking Practice
                    </Text>
                </View>
                <Text className="text-white text-3xl font-black">
                    AI Language Coach
                </Text>
                <Text className="text-zinc-400 text-sm mt-1">
                    Practice speaking with real-time AI feedback
                </Text>
            </View>

            {/* Main Recording Area */}
            <View className="items-center justify-center my-12">
                {/* Pulse Ring */}
                <Animated.View
                    style={{
                        transform: [{ scale: pulseAnim }],
                        opacity: isRecording ? 0.3 : 0,
                    }}
                    className="absolute w-48 h-48 rounded-full bg-purple-500"
                />

                {/* Recording Button */}
                <Pressable
                    onPress={isRecording ? handleStopRecording : handleStartRecording}
                    disabled={sessionState === 'processing'}
                    accessible
                    accessibilityLabel={isRecording ? "Stop recording" : "Start speaking"}
                    accessibilityRole="button"
                    accessibilityHint={isRecording ? "Stops the current recording session" : "Starts capturing your speech for AI analysis"}
                    className={`w-32 h-32 rounded-full items-center justify-center ${isRecording
                        ? 'bg-red-500'
                        : sessionState === 'processing'
                            ? 'bg-zinc-700'
                            : 'bg-purple-600'
                        }`}
                >

                    {isRecording ? (
                        <Square size={40} color="white" fill="white" />
                    ) : sessionState === 'processing' ? (
                        <View className="w-8 h-8 border-4 border-white border-t-transparent rounded-full" />
                    ) : (
                        <Mic2 size={48} color="white" />
                    )}
                </Pressable>

                {/* Status Text */}
                <Text className="text-zinc-400 text-sm font-bold mt-6 uppercase tracking-widest">
                    {sessionState === 'idle' && 'Tap to start speaking'}
                    {sessionState === 'recording' && 'Listening...'}
                    {sessionState === 'processing' && 'Processing...'}
                    {sessionState === 'complete' && 'Session complete'}
                </Text>

                {isRecording && (
                    <Text className="text-purple-500 text-2xl font-black mt-2">
                        {formatTime(duration)}
                    </Text>
                )}

                {error && (
                    <Text className="text-red-500 text-sm font-bold mt-4 text-center">
                        {error}
                    </Text>
                )}
            </View>

            {/* Transcript & Response Section */}
            <View className="mb-10">
                {transcript && (
                    <View className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mb-4">
                        <View className="flex-row items-center mb-2">
                            <Volume2 size={14} color="#71717a" />
                            <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest ml-2">
                                You said
                            </Text>
                        </View>
                        <Text className="text-white text-base font-medium">{transcript}</Text>
                    </View>
                )}

                {aiResponse && (
                    <View className="bg-purple-900/20 border border-purple-800/30 rounded-3xl p-5">
                        <View className="flex-row items-center justify-between mb-2">
                            <View className="flex-row items-center">
                                <Mic2 size={14} color="#a855f7" />
                                <Text className="text-purple-400 text-[10px] font-black uppercase tracking-widest ml-2">
                                    AI Coach
                                </Text>
                            </View>
                            <Pressable
                                onPress={handleReset}
                                accessible
                                accessibilityLabel="Reset session"
                                accessibilityRole="button"
                            >
                                <RefreshCw size={16} color="#a855f7" />
                            </Pressable>

                        </View>
                        <Text className="text-zinc-200 text-base font-medium">{aiResponse}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
