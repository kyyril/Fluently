import React, { useState, useRef, useCallback } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { Mic2, Square, Play, Pause, Volume2 } from 'lucide-react-native';
import { useSettingsStore } from '@/stores/settingsStore';
import * as Haptics from 'expo-haptics';

type SessionState = 'idle' | 'recording' | 'processing' | 'playing';

export default function SpeakingScreen() {
    const [sessionState, setSessionState] = useState<SessionState>('idle');
    const [transcript, setTranscript] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [duration, setDuration] = useState(0);
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const { hapticsEnabled } = useSettingsStore();

    const startPulseAnimation = useCallback(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
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

    const handleStartRecording = async () => {
        if (hapticsEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        setSessionState('recording');
        setTranscript('');
        setAiResponse('');
        startPulseAnimation();
        // TODO: Implement actual audio recording with expo-av
    };

    const handleStopRecording = async () => {
        if (hapticsEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        stopPulseAnimation();
        setSessionState('processing');
        // TODO: Send audio to API for transcription and AI response

        // Simulate processing
        setTimeout(() => {
            setTranscript("Hello, I want to practice my English speaking skills today.");
            setAiResponse("Great! Your pronunciation is clear. Let's work on some conversational phrases. Try saying: 'I've been learning English for two years.'");
            setSessionState('idle');
        }, 2000);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View className="flex-1 bg-black px-6 pt-16">
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
            <View className="flex-1 items-center justify-center">
                {/* Pulse Ring */}
                <Animated.View
                    style={{
                        transform: [{ scale: pulseAnim }],
                        opacity: sessionState === 'recording' ? 0.3 : 0,
                    }}
                    className="absolute w-48 h-48 rounded-full bg-purple-500"
                />

                {/* Recording Button */}
                <Pressable
                    onPress={sessionState === 'recording' ? handleStopRecording : handleStartRecording}
                    className={`w-32 h-32 rounded-full items-center justify-center ${sessionState === 'recording'
                            ? 'bg-red-500'
                            : sessionState === 'processing'
                                ? 'bg-zinc-700'
                                : 'bg-purple-600'
                        }`}
                    disabled={sessionState === 'processing'}
                >
                    {sessionState === 'recording' ? (
                        <Square size={40} color="white" fill="white" />
                    ) : sessionState === 'processing' ? (
                        <View className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Mic2 size={48} color="white" />
                    )}
                </Pressable>

                {/* Status Text */}
                <Text className="text-zinc-400 text-sm font-bold mt-6 uppercase tracking-widest">
                    {sessionState === 'idle' && 'Tap to start speaking'}
                    {sessionState === 'recording' && 'Listening...'}
                    {sessionState === 'processing' && 'Processing...'}
                </Text>

                {sessionState === 'recording' && (
                    <Text className="text-purple-500 text-2xl font-black mt-2">
                        {formatTime(duration)}
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
                        <View className="flex-row items-center mb-2">
                            <Mic2 size={14} color="#a855f7" />
                            <Text className="text-purple-400 text-[10px] font-black uppercase tracking-widest ml-2">
                                AI Coach
                            </Text>
                        </View>
                        <Text className="text-zinc-200 text-base font-medium">{aiResponse}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}
