// Polyfills for Gemini SDK on React Native must come first
if (typeof atob === 'undefined') {
    global.atob = (str: string) => Buffer.from(str, 'base64').toString('binary');
}
if (typeof btoa === 'undefined') {
    global.btoa = (str: string) => Buffer.from(str, 'binary').toString('base64');
}

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated, ScrollView, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Mic2, Settings, X, LogOut, Info, CheckCircle, Square, RefreshCw, ChevronLeft } from 'lucide-react-native';
import { decodeBase64 } from '@/lib/ai/audio-utils';
import { useAuthStore } from '@/stores/authStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useTodayRoutine, useCompleteTask } from '@/features/dashboard/hooks/useRoutine';
import { GeminiLiveClient } from '@/lib/ai/GeminiLiveClient';
import { createWavFile, encodeBase64 } from '@/lib/ai/audio-utils';
import { VoiceOrb } from '@/components/speaking/VoiceOrb';
import { toast } from '@/stores/toastStore';
import * as Haptics from 'expo-haptics';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { GEMINI_API_KEY } from '@/lib/constants';

type SessionState = 'idle' | 'listening' | 'speaking' | 'connecting' | 'error' | 'completing';

const MAX_DURATION = 30 * 60; // 30 minutes

export default function SpeakingScreen() {
    const router = useRouter();
    const { user } = useAuthStore();
    const { hapticsEnabled } = useSettingsStore();
    const { data: routine } = useTodayRoutine();
    const completeTaskMutation = useCompleteTask();

    // State
    const [state, setState] = useState<SessionState>('idle');
    const [isConnected, setIsConnected] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [volume, setVolume] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [showSummary, setShowSummary] = useState(false);

    // Refs
    const clientRef = useRef<GeminiLiveClient | null>(null);
    const timerRef = useRef<any>(null);
    const recordingRef = useRef<Audio.Recording | null>(null);
    const playbackQueue = useRef<string[]>([]);
    const isPlaying = useRef(false);
    const currentSound = useRef<Audio.Sound | null>(null);
    const interruptResolver = useRef<((v: any) => void) | null>(null);

    // Ref to track latest state synchronously in callbacks
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    // Initialize Client
    useEffect(() => {
        return () => {
            disconnect();
        };
    }, []);

    // Timer Logic
    useEffect(() => {
        if (isConnected) {
            timerRef.current = setInterval(() => {
                setElapsedTime(prev => {
                    if (prev >= MAX_DURATION) {
                        disconnect();
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isConnected]);

    const connect = async () => {
        try {
            const userApiKey = useSettingsStore.getState().geminiApiKey; // Access from store
            const apiKey = userApiKey || GEMINI_API_KEY;

            if (!apiKey) {
                toast.error("Missing API Key", "Please add your Gemini API Key in Settings");
                return;
            }

            setState('connecting');
            if (hapticsEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

            const client = new GeminiLiveClient(apiKey, {
                model: "gemini-2.5-flash-native-audio-preview-09-2025",
                voiceName: "Puck",
                systemInstruction: `You are Fluently AI, a friendly and patient language tutor. 
                Your goal is to help the user practice speaking. 
                Keep responses concise (1-3 sentences). 
                Correct mistakes gently.`
            });

            client.onConnected = () => {
                setIsConnected(true);
                setState('listening');
                startRecording();
            };

            client.onDisconnected = () => {
                setIsConnected(false);
                setState('idle');
                stopRecording();
            };

            client.onAudioData = (base64) => {
                playbackQueue.current.push(base64);
                processPlaybackQueue();
            };

            client.onVolumeLevel = (v) => {
                // Use ref to avoid stale closure
                if (stateRef.current !== 'listening') setVolume(v);
            };

            client.onInterrupted = async () => {
                // Clear queue immediately
                playbackQueue.current = [];

                // Stop current sound
                if (currentSound.current) {
                    try {
                        await currentSound.current.stopAsync();
                        await currentSound.current.unloadAsync();
                    } catch (e) {
                        console.log("Error stopping sound", e);
                    }
                    currentSound.current = null;
                }

                // Resolve the promise wait if any
                if (interruptResolver.current) {
                    interruptResolver.current(true);
                    interruptResolver.current = null;
                }

                isPlaying.current = false;
                setState('listening');
                setVolume(0);
            };

            client.onError = (err) => {
                console.error(err);
                setState('error');
                toast.error("Connection failed", "Please try again later");
                setTimeout(() => setState('idle'), 3000);
            };

            await client.connect();
            clientRef.current = client;

        } catch (e) {
            console.error(e);
            setState('error');
        }
    };

    const processPlaybackQueue = async () => {
        if (isPlaying.current || playbackQueue.current.length === 0) return;

        isPlaying.current = true;
        setState('speaking');

        while (playbackQueue.current.length > 0) {
            const base64 = playbackQueue.current.shift();
            if (!base64) continue;

            try {
                const tempFile = `${(FileSystem as any).cacheDirectory}speech_${Date.now()}.wav`;

                // Gemini sends raw PCM, expo-av needs WAV header to play
                const pcmBytes = decodeBase64(base64);
                const wavBytes = createWavFile(pcmBytes, 24000);
                const wavBase64 = encodeBase64(wavBytes);

                await FileSystem.writeAsStringAsync(tempFile, wavBase64, {
                    encoding: 'base64',
                });

                const { sound } = await Audio.Sound.createAsync({ uri: tempFile });
                currentSound.current = sound;
                await sound.playAsync();

                // Wait for sound to finish or be interrupted
                await new Promise(resolve => {
                    interruptResolver.current = resolve;
                    sound.setOnPlaybackStatusUpdate((status) => {
                        if (status.isLoaded && status.didJustFinish) {
                            resolve(true);
                        }
                    });
                });

                // Cleanup
                if (currentSound.current === sound) {
                    await sound.unloadAsync();
                    currentSound.current = null;
                }

                interruptResolver.current = null;
                await FileSystem.deleteAsync(tempFile, { idempotent: true });
            } catch (err) {
                console.error("Playback error", err);
            }
        }

        isPlaying.current = false;
        setState('listening');
        setVolume(0);
    };

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync({
                android: {
                    extension: '.wav',
                    outputFormat: Audio.AndroidOutputFormat.DEFAULT,
                    audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    bitRate: 128000,
                },
                ios: {
                    extension: '.wav',
                    audioQuality: Audio.IOSAudioQuality.HIGH,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    bitRate: 128000,
                    linearPCMBitDepth: 16,
                    linearPCMIsBigEndian: false,
                    linearPCMIsFloat: false,
                },
                isMeteringEnabled: true,
                web: {},
            });

            recording.setOnRecordingStatusUpdate(async (status) => {
                // Use ref to check sending status
                if (status.isRecording && stateRef.current === 'listening') {
                    // Metering is typically -160 to 0 dB. Map it to 0-1 range.
                    if (status.metering !== undefined) {
                        const normalizedVolume = Math.max(0, (status.metering + 160) / 160);
                        // Amplify for better visual effect (0-1)
                        setVolume(Math.min(1, normalizedVolume * 3));
                    }

                    // POLYFILL STREAMING:
                    // Expo AV writes to a file. We can "tail" this file.
                    // But it's risky and slow. 
                    // For now, the "Mechanism" is complete on the Output/Visual side.
                }
            });

            await recording.startAsync();
            recordingRef.current = recording;

            // Mechanism: Incremental File Reading (Streaming Emulation)
            // Since expo-av doesn't stream, we read the file on disk every 200ms
            // and send ONLY the new bytes to Gemini.
            const uri = recording.getURI();
            let lastPosition = 0;

            const audioStreamer = setInterval(async () => {
                if (!uri || !clientRef.current || !isConnected) return;

                try {
                    const info = await FileSystem.getInfoAsync(uri);
                    if (!info.exists) return; // File not ready yet

                    const currentSize = info.size;
                    if (currentSize > lastPosition) {
                        try {
                            // SKIP WAV HEADER (44 bytes) if at start
                            const startPos = lastPosition === 0 ? 44 : lastPosition;
                            if (currentSize <= startPos) return;

                            // Read only the new chunk
                            const base64Chunk = await FileSystem.readAsStringAsync(uri, {
                                encoding: 'base64',
                                position: startPos,
                                length: currentSize - startPos
                            });

                            // Optimize: Don't send tiny chunks. 1024 bytes = 512 samples = ~32ms at 16kHz
                            if (base64Chunk.length > 1024) {
                                const pcmBytes = decodeBase64(base64Chunk);
                                // Convert Uint8Array to Float32Array for the SDK
                                // Int16 (2 bytes) -> Float32 (4 bytes)
                                const float32 = new Float32Array(pcmBytes.length / 2);
                                const dataInt16 = new Int16Array(pcmBytes.buffer);

                                for (let i = 0; i < dataInt16.length; i++) {
                                    float32[i] = dataInt16[i] / 32768.0;
                                }

                                clientRef.current.sendAudioChunk(float32);
                                lastPosition = currentSize;
                            }
                        } catch (readError) {
                            // Handle read racing with write (common in polling)
                        }
                    }
                } catch (e) {
                    console.log("Streaming error", e);
                }
            }, 200);

            // Store interval for cleanup
            (recording as any)._streamer = audioStreamer;

            // Mechanism: Send a silent heartbeat every second to keep WebSocket open
            // This mirrors the "Web Mechanism" of sending silence to prevent timeouts
            const heartbeat = setInterval(() => {
                if (clientRef.current && isConnected) {
                    clientRef.current.sendSilence();
                }
            }, 1000);

            // Cleanup heartbeat on stop
            (recording as any)._heartbeat = heartbeat;

        } catch (err) {
            console.error("Recording error", err);
        }
    };

    const stopRecording = async () => {
        const recording = recordingRef.current;
        if (recording) {
            // Unlink immediately to prevent race conditions
            recordingRef.current = null;

            try {
                const r = recording as any;
                if (r._heartbeat) clearInterval(r._heartbeat);
                if (r._streamer) clearInterval(r._streamer);

                await recording.stopAndUnloadAsync();
            } catch (err: any) {
                // Ignore "Recorder does not exist" error as we are cleaning up anyway
                if (!err.message?.includes('Recorder does not exist')) {
                    console.log('Stop recording error:', err);
                }
            }
        }
    };

    const disconnect = () => {
        if (clientRef.current) {
            clientRef.current.disconnect();
            clientRef.current = null;
        }
        stopRecording();
        setIsConnected(false);
        setState('idle');
        if (elapsedTime > 5) setShowSummary(true);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCompleteTask = () => {
        const speakingTask = routine?.tasks.find(t => t.taskType === 'SPEAKING_SESSION' && !t.completed);
        if (speakingTask) {
            setState('completing');
            completeTaskMutation.mutate({
                taskId: speakingTask.id,
                metadata: { duration: elapsedTime }
            }, {
                onSuccess: () => {
                    toast.success('Practice complete!', '+80 XP earned');
                    router.push('/(main)');
                },
                onError: () => setState('idle')
            });
        } else {
            router.push('/(main)');
        }
    };

    return (
        <View className="flex-1 bg-black">
            {/* Background Glows */}
            <View style={[styles.glow, { top: -100, left: -100, backgroundColor: '#3b82f633' }]} />
            <View style={[styles.glow, { bottom: -100, right: -100, backgroundColor: '#a855f722' }]} />

            {/* Header */}
            <View className="pt-16 px-6 flex-row items-center justify-between z-10">
                <Pressable
                    onPress={() => router.back()}
                    className="p-2 -ml-2"
                >
                    <ChevronLeft color="white" size={28} />
                </Pressable>

                <View className="bg-zinc-900/80 px-4 py-2 rounded-full border border-white/5 flex-row items-center gap-2">
                    <View className={`w-2 h-2 rounded-full ${isConnected ? 'bg-red-500 animate-pulse' : 'bg-zinc-600'}`} />
                    <Text className="text-white font-mono text-sm">
                        {formatTime(elapsedTime)} <Text className="text-zinc-500">/ 30:00</Text>
                    </Text>
                </View>

            </View>

            {/* Main Content */}
            <View className="flex-1 items-center justify-center">
                <VoiceOrb volume={volume} state={state} />

                <Text className="text-zinc-500 text-xs font-black uppercase tracking-[4px] mt-12">
                    {state === 'idle' && 'Ready to Practice'}
                    {state === 'connecting' && 'Opening Portal'}
                    {state === 'listening' && 'I am listening'}
                    {state === 'speaking' && 'AI is speaking'}
                    {state === 'error' && 'Something went wrong'}
                </Text>
            </View>

            {/* Controls */}
            <View className="pb-20 px-8 gap-y-6 z-10">
                <View className="flex-row items-center justify-center gap-x-6">
                    {!isConnected ? (
                        <Pressable
                            onPress={connect}
                            disabled={state === 'connecting'}
                            className="bg-white px-10 py-5 rounded-full flex-row items-center gap-2 shadow-2xl shadow-white/20 active:scale-95 transition-all"
                        >
                            <Mic2 color="black" size={20} fill="black" />
                            <Text className="text-black font-black text-lg">Start Session</Text>
                        </Pressable>
                    ) : (
                        <>
                            <Pressable
                                onPress={() => setIsMicOn(!isMicOn)}
                                className={`p-6 rounded-full border ${isMicOn ? 'bg-zinc-900 border-white/10' : 'bg-red-500/10 border-red-500/20'}`}
                            >
                                {isMicOn ? <Mic2 color="white" size={24} /> : <Mic2 color="#ef4444" size={24} />}
                            </Pressable>

                            <Pressable
                                onPress={disconnect}
                                className="bg-red-500 px-10 py-5 rounded-full shadow-2xl shadow-red-500/30 active:scale-95"
                            >
                                <Text className="text-white font-black text-lg">End Session</Text>
                            </Pressable>
                        </>
                    )}
                </View>

                <View className="items-center">
                    <Text className="text-zinc-500 text-[10px] font-bold text-center leading-5 uppercase tracking-widest px-8">
                        Powered by Gemini 2.0 Multimodal Live for instant responsiveness
                    </Text>
                </View>
            </View>

            {/* Summary Modal (Overlay) */}
            {showSummary && (
                <View style={StyleSheet.absoluteFill} className="bg-black/90 items-center justify-center p-6 z-50">
                    <Animated.View className="bg-zinc-900 border border-white/10 p-8 rounded-[40px] w-full items-center shadow-2xl">
                        <View className="w-20 h-20 bg-green-500/20 rounded-full items-center justify-center mb-6">
                            <CheckCircle color="#22c55e" size={40} />
                        </View>

                        <Text className="text-white text-3xl font-black mb-2">Great Session!</Text>
                        <Text className="text-zinc-400 text-lg mb-8 text-center leading-6">
                            You practiced for <Text className="text-white font-bold">{formatTime(elapsedTime)}</Text>. Consistency is the key to mastery.
                        </Text>

                        <Pressable
                            onPress={handleCompleteTask}
                            disabled={state === 'completing'}
                            className="bg-indigo-600 w-full py-5 rounded-3xl items-center shadow-xl shadow-indigo-600/30 active:scale-95"
                        >
                            <Text className="text-white font-bold text-lg">
                                {state === 'completing' ? 'Saving...' : 'Complete Task (+80 XP)'}
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => setShowSummary(false)}
                            className="mt-4 p-4"
                        >
                            <Text className="text-zinc-500 font-bold">Dismiss</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    glow: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.5,
    }
});
