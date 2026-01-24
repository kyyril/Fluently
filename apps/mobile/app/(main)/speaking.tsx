// Polyfills for Gemini SDK on React Native must come first
if (typeof atob === 'undefined') {
    global.atob = (str: string) => Buffer.from(str, 'base64').toString('binary');
}
if (typeof btoa === 'undefined') {
    global.btoa = (str: string) => Buffer.from(str, 'binary').toString('base64');
}

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Mic2, X, CheckCircle, ChevronLeft, Sparkles, Clock } from 'lucide-react-native';
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

const MAX_DURATION = 30 * 60;

const TIPS = [
    "Speak naturally, don't worry about mistakes",
    "Ask me about any topic you're interested in",
    "Try describing your day in English",
    "Practice asking and answering questions",
];

export default function SpeakingScreen() {
    const router = useRouter();
    const { hapticsEnabled } = useSettingsStore();
    const { data: routine } = useTodayRoutine();
    const completeTaskMutation = useCompleteTask();

    const [state, setState] = useState<SessionState>('idle');
    const [isConnected, setIsConnected] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [volume, setVolume] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
    const [tipIndex] = useState(() => Math.floor(Math.random() * TIPS.length));

    const clientRef = useRef<GeminiLiveClient | null>(null);
    const timerRef = useRef<any>(null);
    const recordingRef = useRef<Audio.Recording | null>(null);
    const playbackQueue = useRef<string[]>([]);
    const isPlaying = useRef(false);
    const currentSound = useRef<Audio.Sound | null>(null);
    const interruptResolver = useRef<((v: any) => void) | null>(null);
    const stateRef = useRef(state);

    useEffect(() => { stateRef.current = state; }, [state]);
    useEffect(() => { return () => { disconnect(); }; }, []);

    useEffect(() => {
        if (isConnected) {
            timerRef.current = setInterval(() => {
                setElapsedTime(prev => {
                    if (prev >= MAX_DURATION) { disconnect(); return prev; }
                    return prev + 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [isConnected]);

    const connect = async () => {
        try {
            const apiKey = useSettingsStore.getState().geminiApiKey || GEMINI_API_KEY;
            if (!apiKey) {
                toast.error("Missing API Key", "Please add your Gemini API Key in Settings");
                return;
            }

            setState('connecting');
            if (hapticsEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

            const client = new GeminiLiveClient(apiKey, {
                model: "gemini-2.5-flash-native-audio-preview-09-2025",
                voiceName: "Puck",
                systemInstruction: `You are Fluently AI, a friendly language tutor. Keep responses concise (1-3 sentences). Correct mistakes gently.`
            });

            client.onConnected = () => { setIsConnected(true); setState('listening'); startRecording(); };
            client.onDisconnected = () => { setIsConnected(false); setState('idle'); stopRecording(); };
            client.onAudioData = (base64) => { playbackQueue.current.push(base64); processPlaybackQueue(); };
            client.onVolumeLevel = (v) => { if (stateRef.current !== 'listening') setVolume(v); };
            client.onInterrupted = async () => {
                playbackQueue.current = [];
                if (currentSound.current) {
                    try { await currentSound.current.stopAsync(); await currentSound.current.unloadAsync(); } catch (e) { }
                    currentSound.current = null;
                }
                if (interruptResolver.current) { interruptResolver.current(true); interruptResolver.current = null; }
                isPlaying.current = false; setState('listening'); setVolume(0);
            };
            client.onError = (err) => { console.error(err); setState('error'); toast.error("Connection failed", "Please try again"); setTimeout(() => setState('idle'), 3000); };

            await client.connect();
            clientRef.current = client;
        } catch (e) { console.error(e); setState('error'); }
    };

    const processPlaybackQueue = async () => {
        if (isPlaying.current || playbackQueue.current.length === 0) return;
        isPlaying.current = true; setState('speaking');

        while (playbackQueue.current.length > 0) {
            const base64 = playbackQueue.current.shift();
            if (!base64) continue;
            try {
                const tempFile = `${(FileSystem as any).cacheDirectory}speech_${Date.now()}.wav`;
                const pcmBytes = decodeBase64(base64);
                const wavBytes = createWavFile(pcmBytes, 24000);
                await FileSystem.writeAsStringAsync(tempFile, encodeBase64(wavBytes), { encoding: 'base64' });
                const { sound } = await Audio.Sound.createAsync({ uri: tempFile });
                currentSound.current = sound;
                await sound.playAsync();
                await new Promise(resolve => {
                    interruptResolver.current = resolve;
                    sound.setOnPlaybackStatusUpdate((status) => { if (status.isLoaded && status.didJustFinish) resolve(true); });
                });
                if (currentSound.current === sound) { await sound.unloadAsync(); currentSound.current = null; }
                interruptResolver.current = null;
                await FileSystem.deleteAsync(tempFile, { idempotent: true });
            } catch (err) { console.error("Playback error", err); }
        }
        isPlaying.current = false; setState('listening'); setVolume(0);
    };

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync({
                android: { extension: '.wav', outputFormat: Audio.AndroidOutputFormat.DEFAULT, audioEncoder: Audio.AndroidAudioEncoder.DEFAULT, sampleRate: 16000, numberOfChannels: 1, bitRate: 128000 },
                ios: { extension: '.wav', audioQuality: Audio.IOSAudioQuality.HIGH, sampleRate: 16000, numberOfChannels: 1, bitRate: 128000, linearPCMBitDepth: 16, linearPCMIsBigEndian: false, linearPCMIsFloat: false },
                isMeteringEnabled: true, web: {},
            });
            recording.setOnRecordingStatusUpdate((status) => {
                if (status.isRecording && stateRef.current === 'listening' && status.metering !== undefined) {
                    setVolume(Math.min(1, Math.max(0, (status.metering + 160) / 160) * 3));
                }
            });
            await recording.startAsync();
            recordingRef.current = recording;
            const uri = recording.getURI();
            let lastPosition = 0;
            const audioStreamer = setInterval(async () => {
                if (!uri || !clientRef.current || !isConnected) return;
                try {
                    const info = await FileSystem.getInfoAsync(uri);
                    if (!info.exists) return;
                    const currentSize = info.size;
                    if (currentSize > lastPosition) {
                        const startPos = lastPosition === 0 ? 44 : lastPosition;
                        if (currentSize <= startPos) return;
                        const base64Chunk = await FileSystem.readAsStringAsync(uri, { encoding: 'base64', position: startPos, length: currentSize - startPos });
                        if (base64Chunk.length > 1024) {
                            const pcmBytes = decodeBase64(base64Chunk);
                            const float32 = new Float32Array(pcmBytes.length / 2);
                            const dataInt16 = new Int16Array(pcmBytes.buffer);
                            for (let i = 0; i < dataInt16.length; i++) float32[i] = dataInt16[i] / 32768.0;
                            clientRef.current.sendAudioChunk(float32);
                            lastPosition = currentSize;
                        }
                    }
                } catch (e) { }
            }, 200);
            (recording as any)._streamer = audioStreamer;
            const heartbeat = setInterval(() => { if (clientRef.current && isConnected) clientRef.current.sendSilence(); }, 1000);
            (recording as any)._heartbeat = heartbeat;
        } catch (err) { console.error("Recording error", err); }
    };

    const stopRecording = async () => {
        const recording = recordingRef.current;
        if (recording) {
            recordingRef.current = null;
            try {
                const r = recording as any;
                if (r._heartbeat) clearInterval(r._heartbeat);
                if (r._streamer) clearInterval(r._streamer);
                await recording.stopAndUnloadAsync();
            } catch (err: any) { if (!err.message?.includes('Recorder does not exist')) console.log('Stop error:', err); }
        }
    };

    const disconnect = () => {
        if (clientRef.current) { clientRef.current.disconnect(); clientRef.current = null; }
        stopRecording(); setIsConnected(false); setState('idle');
        if (elapsedTime > 5) setShowSummary(true);
    };

    const toggleMic = () => { setIsMicOn(!isMicOn); if (hapticsEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); };
    const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const getProgressPercent = () => Math.min(100, (elapsedTime / MAX_DURATION) * 100);

    const handleCompleteTask = () => {
        const task = routine?.tasks.find(t => t.taskType === 'SPEAKING_SESSION' && !t.completed);
        if (task) {
            setState('completing');
            completeTaskMutation.mutate({ taskId: task.id, metadata: { duration: elapsedTime } }, {
                onSuccess: () => { toast.success('Practice complete!', '+80 XP earned'); router.push('/(main)'); },
                onError: () => setState('idle')
            });
        } else { router.push('/(main)'); }
    };

    const getStatusText = () => {
        switch (state) {
            case 'idle': return 'Tap to start';
            case 'connecting': return 'Connecting...';
            case 'listening': return 'Listening...';
            case 'speaking': return 'AI speaking...';
            case 'error': return 'Error';
            default: return '';
        }
    };

    return (
        <View style={styles.container}>
            {/* Ambient Glows */}
            <View style={[styles.ambientGlow, { top: -150, left: -100, backgroundColor: 'rgba(59, 130, 246, 0.08)' }]} />
            <View style={[styles.ambientGlow, { bottom: -100, right: -100, backgroundColor: 'rgba(168, 85, 247, 0.06)' }]} />

            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft color="#a1a1aa" size={28} />
                </Pressable>
                <View style={styles.timerContainer}>
                    <View style={styles.timerBadge}>
                        <Clock color={isConnected ? '#3b82f6' : '#52525b'} size={14} />
                        <Text style={styles.timerText}>{formatTime(elapsedTime)}<Text style={styles.timerMax}> / 30:00</Text></Text>
                    </View>
                    {isConnected && (
                        <View style={styles.liveIndicator}>
                            <View style={styles.liveDot} />
                            <Text style={styles.liveText}>LIVE</Text>
                        </View>
                    )}
                </View>
                <View style={{ width: 44 }} />
            </View>

            {/* Progress Bar */}
            {isConnected && (
                <View style={styles.progressContainer}>
                    <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${getProgressPercent()}%` }]} />
                    </View>
                </View>
            )}

            {/* Main Content */}
            <View style={styles.mainContent}>
                <VoiceOrb volume={volume} state={state} />
                <Text style={styles.statusText}>{getStatusText()}</Text>
                {state === 'idle' && (
                    <View style={styles.tipContainer}>
                        <Sparkles color="#fbbf24" size={14} />
                        <Text style={styles.tipText}>{TIPS[tipIndex]}</Text>
                    </View>
                )}
            </View>

            {/* Controls */}
            <View style={styles.controlsContainer}>
                {!isConnected ? (
                    <Pressable onPress={connect} disabled={state === 'connecting'} style={[styles.startButton, state === 'connecting' && { opacity: 0.6 }]}>
                        <Mic2 color="white" size={22} />
                        <Text style={styles.startButtonText}>{state === 'connecting' ? 'Connecting...' : 'Start Session'}</Text>
                    </Pressable>
                ) : (
                    <View style={styles.activeControls}>
                        <Pressable onPress={toggleMic} style={[styles.controlButton, !isMicOn && styles.controlButtonMuted]}>
                            <Mic2 color={isMicOn ? 'white' : '#ef4444'} size={24} />
                        </Pressable>
                        <Pressable onPress={disconnect} style={styles.endButton}>
                            <X color="white" size={20} />
                            <Text style={styles.endButtonText}>End Session</Text>
                        </Pressable>
                    </View>
                )}
                <Text style={styles.footerText}>Powered by Gemini 2.0</Text>
            </View>

            {/* Summary Modal */}
            {showSummary && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalIconContainer}>
                            <CheckCircle color="#22c55e" size={48} />
                        </View>
                        <Text style={styles.modalTitle}>Great Session!</Text>
                        <Text style={styles.modalDescription}>You practiced for <Text style={styles.modalHighlight}>{formatTime(elapsedTime)}</Text>. Keep it up!</Text>
                        <Pressable onPress={handleCompleteTask} disabled={state === 'completing'} style={styles.completeButton}>
                            <Text style={styles.completeButtonText}>{state === 'completing' ? 'Saving...' : 'Complete Task (+80 XP)'}</Text>
                        </Pressable>
                        <Pressable onPress={() => setShowSummary(false)} style={styles.dismissButton}>
                            <Text style={styles.dismissText}>Dismiss</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0a0a0a' },
    ambientGlow: { position: 'absolute', width: 400, height: 400, borderRadius: 200 },
    header: { paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 },
    backButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
    timerContainer: { alignItems: 'center', gap: 6 },
    timerBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(39, 39, 42, 0.8)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(63, 63, 70, 0.5)' },
    timerText: { color: 'white', fontSize: 15, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: '600' },
    timerMax: { color: '#52525b' },
    liveIndicator: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ef4444' },
    liveText: { color: '#ef4444', fontSize: 10, fontWeight: '800', letterSpacing: 2 },
    progressContainer: { paddingHorizontal: 24, paddingTop: 16 },
    progressTrack: { height: 3, backgroundColor: 'rgba(63, 63, 70, 0.5)', borderRadius: 2, overflow: 'hidden' },
    progressFill: { height: '100%', backgroundColor: '#3b82f6', borderRadius: 2 },
    mainContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 40 },
    statusText: { color: '#71717a', fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 3, marginTop: 24 },
    tipContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, paddingHorizontal: 20, paddingVertical: 12, backgroundColor: 'rgba(251, 191, 36, 0.08)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(251, 191, 36, 0.15)' },
    tipText: { color: '#fbbf24', fontSize: 13, fontWeight: '500' },
    controlsContainer: { paddingBottom: Platform.OS === 'ios' ? 50 : 32, paddingHorizontal: 24, gap: 20, alignItems: 'center' },
    startButton: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#3b82f6', paddingVertical: 18, paddingHorizontal: 32, borderRadius: 28 },
    startButtonText: { color: 'white', fontSize: 17, fontWeight: '700' },
    activeControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 },
    controlButton: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(39, 39, 42, 0.9)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(63, 63, 70, 0.5)' },
    controlButtonMuted: { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.3)' },
    endButton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#dc2626', paddingVertical: 16, paddingHorizontal: 28, borderRadius: 28 },
    endButtonText: { color: 'white', fontSize: 16, fontWeight: '700' },
    footerText: { color: '#52525b', fontSize: 11, fontWeight: '600', letterSpacing: 1 },
    modalOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.9)', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 100 },
    modalContent: { backgroundColor: '#18181b', borderRadius: 32, padding: 32, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(63, 63, 70, 0.5)' },
    modalIconContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(34, 197, 94, 0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
    modalTitle: { color: 'white', fontSize: 28, fontWeight: '800', marginBottom: 8 },
    modalDescription: { color: '#a1a1aa', fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 28 },
    modalHighlight: { color: 'white', fontWeight: '700' },
    completeButton: { width: '100%', backgroundColor: '#6366f1', paddingVertical: 18, borderRadius: 20, alignItems: 'center' },
    completeButtonText: { color: 'white', fontSize: 16, fontWeight: '700' },
    dismissButton: { marginTop: 16, padding: 12 },
    dismissText: { color: '#71717a', fontSize: 15, fontWeight: '600' },
});
