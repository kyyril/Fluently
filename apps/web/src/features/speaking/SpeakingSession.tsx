
'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GeminiLiveClient } from './lib/GeminiLiveClient';
import { VoiceOrb } from './components/VoiceOrb';
import { Mic, MicOff, Settings, X, CheckCircle2, Sparkles, Clock, Zap } from 'lucide-react';
import { useCompleteTask } from '@/hooks/useRoutine';

interface SpeakingSessionProps {
    taskId?: string;
}

const MAX_DURATION = 30 * 60;

const TIPS = [
    "Speak naturally, don't worry about mistakes",
    "Try describing what you did today",
    "Ask me about any topic you're curious about",
    "Practice telling a short story",
];

export function SpeakingSession({ taskId }: SpeakingSessionProps) {
    const router = useRouter();
    const { mutate: completeTask, isPending: isCompleting } = useCompleteTask();

    const [apiKey, setApiKey] = useState<string>('');
    const [client, setClient] = useState<GeminiLiveClient | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [volume, setVolume] = useState(0);
    const [state, setState] = useState<'idle' | 'listening' | 'speaking' | 'connecting' | 'error' | 'completing'>('idle');
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
    const [tipIndex] = useState(() => Math.floor(Math.random() * TIPS.length));

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const micStreamRef = useRef<MediaStream | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

    useEffect(() => {
        const envKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        const localKey = localStorage.getItem('gemini_api_key');
        if (envKey) setApiKey(envKey);
        else if (localKey) setApiKey(localKey);
        else setShowKeyModal(true);

        if (taskId) {
            const today = new Date().toISOString().split('T')[0];
            const key = `speaking_session_${taskId}_${today}`;
            const savedTime = localStorage.getItem(key);
            if (savedTime) setElapsedTime(parseInt(savedTime, 10));
        }
    }, [taskId]);

    useEffect(() => {
        if (isConnected) {
            timerRef.current = setInterval(() => {
                setElapsedTime(prev => {
                    if (prev >= MAX_DURATION) { disconnect(); return prev; }
                    const newTime = prev + 1;
                    if (taskId) {
                        const today = new Date().toISOString().split('T')[0];
                        localStorage.setItem(`speaking_session_${taskId}_${today}`, newTime.toString());
                    }
                    return newTime;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [isConnected, taskId]);

    useEffect(() => {
        return () => {
            if (client) client.disconnect();
            stopAudioCapture();
        };
    }, [client]);

    const connect = async () => {
        if (!apiKey) { setShowKeyModal(true); return; }
        try {
            setState('connecting');
            const newClient = new GeminiLiveClient(apiKey, {
                model: "gemini-2.5-flash-native-audio-preview-09-2025",
                voiceName: "Puck",
                systemInstruction: `You are Fluently AI, a friendly language tutor. Keep responses concise (1-3 sentences). Correct mistakes gently. Ask open-ended questions.`
            });

            newClient.onConnected = () => { setIsConnected(true); setState('listening'); startAudioCapture(newClient); };
            newClient.onDisconnected = () => { setIsConnected(false); setState('idle'); stopAudioCapture(); };
            newClient.onError = (e) => { console.error(e); setState('error'); stopAudioCapture(); setTimeout(() => setState('idle'), 3000); };
            newClient.onAudioData = (v) => { if (v > 0.01) { setVolume(v); setState('speaking'); } };

            await newClient.connect();
            setClient(newClient);
        } catch (e) { console.error(e); setState('error'); }
    };

    const disconnect = async () => {
        if (client) { client.disconnect(); setClient(null); }
        stopAudioCapture();
        setIsConnected(false);
        setState('idle');
        setShowSummary(true);
    };

    const handleCompleteTask = () => {
        if (taskId) {
            setState('completing');
            completeTask({ taskId, metadata: { duration: elapsedTime } }, {
                onSuccess: () => {
                    const today = new Date().toISOString().split('T')[0];
                    localStorage.removeItem(`speaking_session_${taskId}_${today}`);
                    setTimeout(() => router.push('/dashboard'), 1000);
                },
                onError: () => setState('idle')
            });
        } else {
            router.push('/dashboard');
        }
    };

    const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
    const getProgressPercent = () => Math.min(100, (elapsedTime / MAX_DURATION) * 100);

    const startAudioCapture = async (activeClient: GeminiLiveClient) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true, autoGainControl: true, noiseSuppression: true }
            });
            micStreamRef.current = stream;
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioCtx({ sampleRate: 16000 });
            audioContextRef.current = ctx;
            const source = ctx.createMediaStreamSource(stream);
            sourceRef.current = source;
            const processor = ctx.createScriptProcessor(2048, 1, 1);
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
                let inputData = e.inputBuffer.getChannelData(0);
                if (!isMicOn) {
                    inputData = new Float32Array(inputData.length);
                } else {
                    let sum = 0;
                    for (let i = 0; i < inputData.length; i += 10) sum += Math.abs(inputData[i]);
                    const avg = sum / (inputData.length / 10);
                    if (state !== 'speaking') { setVolume(avg); setState('listening'); }
                }
                activeClient.sendAudioChunk(inputData);
            };

            source.connect(processor);
            processor.connect(ctx.destination);
        } catch (err) { console.error("Mic Error", err); }
    };

    const stopAudioCapture = () => {
        if (processorRef.current) { processorRef.current.disconnect(); processorRef.current = null; }
        if (sourceRef.current) { sourceRef.current.disconnect(); sourceRef.current = null; }
        if (audioContextRef.current) { audioContextRef.current.close(); audioContextRef.current = null; }
        if (micStreamRef.current) { micStreamRef.current.getTracks().forEach(t => t.stop()); micStreamRef.current = null; }
    };

    const toggleMic = () => setIsMicOn(!isMicOn);
    const saveKey = (key: string) => { localStorage.setItem('gemini_api_key', key); setApiKey(key); setShowKeyModal(false); };

    return (
        <div className="flex flex-col items-center justify-between h-full min-h-[600px] w-full relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
            <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-30%] right-[-20%] w-[60%] h-[60%] bg-purple-500/8 blur-[150px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="w-full flex items-center justify-between p-4 md:p-6 z-10">
                <div className="w-10" />

                {/* Timer */}
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-muted/50 backdrop-blur-sm">
                        <Clock className={`w-4 h-4 ${isConnected ? 'text-blue-400' : 'text-muted-foreground'}`} />
                        <span className="font-mono text-sm font-medium">
                            {formatTime(elapsedTime)}
                            <span className="text-muted-foreground"> / 30:00</span>
                        </span>
                    </div>
                    {isConnected && (
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live</span>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setShowKeyModal(true)}
                    className="p-2.5 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                    title="Settings"
                >
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            {/* Progress Bar */}
            {isConnected && (
                <div className="w-full max-w-md px-6 z-10">
                    <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${getProgressPercent()}%` }} />
                    </div>
                </div>
            )}

            {/* Main Orb */}
            <div className="flex-1 w-full flex flex-col items-center justify-center z-10">
                <VoiceOrb volume={volume} state={state} />

                {/* Tip */}
                {state === 'idle' && (
                    <div className="mt-16 flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500/10 text-amber-400 max-w-sm text-center">
                        <Sparkles className="w-4 h-4 shrink-0" />
                        <span className="text-sm">{TIPS[tipIndex]}</span>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="w-full max-w-lg flex flex-col items-center gap-5 p-6 md:p-8 z-10">
                <div className="flex items-center justify-center gap-4 w-full">
                    {!isConnected ? (
                        <button
                            onClick={connect}
                            disabled={state === 'connecting'}
                            className="group relative flex items-center gap-3 px-10 py-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-60"
                        >
                            <Mic className="w-5 h-5" />
                            <span>{state === 'connecting' ? 'Connecting...' : 'Start Conversation'}</span>
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={toggleMic}
                                className={`p-4 rounded-full transition-all ${isMicOn
                                        ? 'bg-muted/50 hover:bg-muted text-foreground'
                                        : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                                    }`}
                            >
                                {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                            </button>
                            <button
                                onClick={disconnect}
                                className="flex items-center gap-2 px-8 py-4 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-all shadow-lg shadow-red-500/25"
                            >
                                <X className="w-5 h-5" />
                                <span>End Session</span>
                            </button>
                        </>
                    )}
                </div>

                {/* Complete Task Button */}
                {taskId && !isConnected && (
                    <button
                        onClick={() => setShowSummary(true)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Complete Task
                    </button>
                )}

                {/* Footer */}
                <div className="flex items-center gap-2 text-muted-foreground/60 text-xs">
                    <Zap className="w-3 h-3" />
                    <span>Powered by Gemini 2.0</span>
                </div>
            </div>

            {/* Summary Modal */}
            {showSummary && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-background p-8 rounded-3xl w-full max-w-md text-center space-y-6 shadow-2xl">
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Great Session!</h2>
                            <p className="text-muted-foreground">
                                You practiced for <span className="text-foreground font-bold font-mono">{formatTime(elapsedTime)}</span>
                            </p>
                        </div>
                        {taskId ? (
                            <div className="space-y-3">
                                <button
                                    onClick={handleCompleteTask}
                                    disabled={state === 'completing'}
                                    className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all"
                                >
                                    {state === 'completing' ? 'Saving...' : 'Complete Task (+80 XP)'}
                                </button>
                                <button
                                    onClick={() => setShowSummary(false)}
                                    className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Continue Practicing
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="w-full py-4 rounded-2xl bg-foreground text-background font-bold hover:opacity-90 transition-all"
                            >
                                Back to Dashboard
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* API Key Modal */}
            {showKeyModal && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-background p-6 rounded-2xl w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Gemini API Key</h3>
                            <button onClick={() => setShowKeyModal(false)}><X className="w-5 h-5" /></button>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">Enter your Google Gemini API key to use voice features.</p>
                        <input
                            type="password"
                            placeholder="Enter API Key"
                            className="w-full bg-muted rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-primary outline-none"
                            defaultValue={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => setShowKeyModal(false)} className="px-4 py-2 rounded-lg hover:bg-muted transition-colors">Cancel</button>
                            <button onClick={() => saveKey(apiKey)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
