
'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GeminiLiveClient } from './lib/GeminiLiveClient';
import { VoiceOrb } from './components/VoiceOrb';
import { Mic, MicOff, Settings, X, LogOut, Info, CheckCircle2 } from 'lucide-react';
import { useCompleteTask } from '@/hooks/useRoutine';

interface SpeakingSessionProps {
    taskId?: string;
}

const MAX_DURATION = 30 * 60; // 30 minutes in seconds

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

    // Timer & Session state
    const [elapsedTime, setElapsedTime] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const micStreamRef = useRef<MediaStream | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

    // Initial check for API Key and Saved Session Time
    useEffect(() => {
        const envKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        const localKey = localStorage.getItem('gemini_api_key');
        if (envKey) {
            setApiKey(envKey);
        } else if (localKey) {
            setApiKey(localKey);
        } else {
            setShowKeyModal(true);
        }

        // Restore elapsed time if available
        if (taskId) {
            const today = new Date().toISOString().split('T')[0];
            const key = `speaking_session_${taskId}_${today}`;
            const savedTime = localStorage.getItem(key);
            if (savedTime) {
                setElapsedTime(parseInt(savedTime, 10));
            }
        }
    }, [taskId]);

    // Timer Logic
    useEffect(() => {
        if (isConnected) {
            timerRef.current = setInterval(() => {
                setElapsedTime(prev => {
                    if (prev >= MAX_DURATION) {
                        disconnect(); // Auto disconnect
                        return prev;
                    }
                    const newTime = prev + 1;
                    // Persist to local storage
                    if (taskId) {
                        const today = new Date().toISOString().split('T')[0];
                        const key = `speaking_session_${taskId}_${today}`;
                        localStorage.setItem(key, newTime.toString());
                    }
                    return newTime;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isConnected]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (client) client.disconnect();
            stopAudioCapture();
        };
    }, [client]);

    const connect = async () => {
        if (!apiKey) {
            setShowKeyModal(true);
            return;
        }

        try {
            setState('connecting');
            const newClient = new GeminiLiveClient(apiKey, {
                model: "gemini-2.5-flash-native-audio-preview-09-2025",
                voiceName: "Puck",
                systemInstruction: `You are Fluently AI, a friendly and patient language tutor.
                        Your goal is to help the user practice speaking.
                        
                        Guidelines:
                        1.  Engage in a natural, casual conversation.
                        2.  If the user makes a mistake, gently correct them but keep the conversation flowing.
                        3.  Keep your responses concise (1-3 sentences) to encourage the user to speak more.
                        4.  Ask open-ended questions.
                        5.  Be encouraging and supportive.
                        
                        Start by greeting the user warmly and asking how their day is going.`
            });

            newClient.onConnected = () => {
                setIsConnected(true);
                setState('listening');
                startAudioCapture(newClient);
            };

            newClient.onDisconnected = () => {
                setIsConnected(false);
                setState('idle');
                stopAudioCapture();
            };

            newClient.onError = (e) => {
                console.error(e);
                setState('error');
                stopAudioCapture();
                setTimeout(() => setState('idle'), 3000);
            };

            newClient.onAudioData = (v) => {
                // If the AI is speaking, it updates volume here
                // Note: We need to distinguish who's speaking. 
                // Simple heuristic: if we receive audio, state is 'speaking', else 'listening'
                // But full-duplex means both can happen.
                // We'll prioritize showing AI activity if volume is significant.
                if (v > 0.01) {
                    setVolume(v);
                    setState('speaking');
                } else {
                    // fall back to mic
                    // setVolume(0); // managed by mic
                    // setState('listening'); // managed by mic
                }
            };

            await newClient.connect();
            setClient(newClient);
        } catch (e) {
            console.error("Connection Failed", e);
            setState('error');
        }
    };

    const disconnect = async () => {
        if (client) {
            client.disconnect();
            setClient(null);
        }
        stopAudioCapture();
        setIsConnected(false);
        setState('idle');

        // Show summary instead of auto-completing
        setShowSummary(true);
    };

    const handleCompleteTask = () => {
        if (taskId) {
            setState('completing');
            completeTask(
                { taskId, metadata: { duration: elapsedTime } },
                {
                    onSuccess: () => {
                        // Clear saved time for this task
                        if (taskId) {
                            const today = new Date().toISOString().split('T')[0];
                            const key = `speaking_session_${taskId}_${today}`;
                            localStorage.removeItem(key);
                        }
                        setTimeout(() => router.push('/dashboard'), 1000);
                    },
                    onError: () => {
                        setState('idle'); // Allow retry
                    }
                }
            );
        } else {
            router.push('/dashboard');
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const startAudioCapture = async (activeClient: GeminiLiveClient) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: 16000,
                    channelCount: 1,
                    echoCancellation: true,
                    autoGainControl: true,
                    noiseSuppression: true
                }
            });

            micStreamRef.current = stream;

            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioCtx({ sampleRate: 16000 }); // Try to match required rate
            audioContextRef.current = ctx;

            const source = ctx.createMediaStreamSource(stream);
            sourceRef.current = source;

            // bufferSize: 2048 or 4096. 16kHz -> 2048 samples ~= 128ms
            const processor = ctx.createScriptProcessor(2048, 1, 1);
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
                let inputData = e.inputBuffer.getChannelData(0);

                // Keep Alive Strategy: Send silence when mic is off
                // This prevents WebSocket timeout
                if (!isMicOn) {
                    inputData = new Float32Array(inputData.length); // All zeros
                } else {
                    // Update visualizer only if mic is on
                    let sum = 0;
                    for (let i = 0; i < inputData.length; i += 10) sum += Math.abs(inputData[i]);
                    const avg = sum / (inputData.length / 10);

                    if (state !== 'speaking') {
                        setVolume(avg);
                        setState('listening');
                    }
                }

                activeClient.sendAudioChunk(inputData);
            };

            source.connect(processor);
            processor.connect(ctx.destination); // needed for chrome to activate processor
        } catch (err) {
            console.error("Mic Error", err);
        }
    };

    const stopAudioCapture = () => {
        if (processorRef.current) {
            processorRef.current.disconnect();
            processorRef.current = null;
        }
        if (sourceRef.current) {
            sourceRef.current.disconnect();
            sourceRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        if (micStreamRef.current) {
            micStreamRef.current.getTracks().forEach(t => t.stop());
            micStreamRef.current = null;
        }
    };

    const toggleMic = () => {
        setIsMicOn(!isMicOn);
    };

    const saveKey = (key: string) => {
        localStorage.setItem('gemini_api_key', key);
        setApiKey(key);
        setShowKeyModal(false);
    };

    return (
        <div className="flex flex-col items-center justify-between h-full min-h-[600px] w-full bg-background/30 relative overflow-hidden px-4 md:px-8 transition-all">
            {/* Background Ambient Glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Top Controls */}
            <div className="absolute top-6 right-6 flex gap-3 z-10 transition-all">
                <div className="px-4 py-2 rounded-full bg-surface/50 border border-white/5 backdrop-blur-md text-sm font-mono flex items-center gap-2.5 shadow-sm text-foreground">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-muted-foreground'}`} />
                    <span className={isConnected ? 'text-foreground' : 'text-muted-foreground'}>
                        {formatTime(elapsedTime)} <span className="text-muted-foreground">/ 30:00</span>
                    </span>
                </div>
                <button
                    onClick={() => setShowKeyModal(true)}
                    className="p-2 rounded-full bg-surface/50 border border-white/5 hover:bg-white/10 transition-all text-muted-foreground hover:text-foreground backdrop-blur-md"
                    title="API Key Settings"
                >
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            {/* Main Visualizer - Takes up remaining space and centers the orb */}
            <div className="flex-1 w-full flex flex-col items-center justify-center py-8">
                <VoiceOrb volume={volume} state={state} />
            </div>

            {/* Bottom Controls - Docked to bottom */}
            <div className="w-full max-w-md flex flex-col items-center gap-6 pb-8 md:pb-12 z-10 px-2">

                {/* Main Actions */}
                <div className="flex items-center justify-center gap-4 md:gap-6 w-full px-4">
                    {!isConnected ? (
                        <button
                            onClick={connect}
                            className="group relative px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 md:gap-3 overflow-hidden text-sm md:text-base w-full justify-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <Mic className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="tracking-wide">Start Conversation</span>
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={toggleMic}
                                className={`p-4 md:p-5 rounded-full transition-all border ${isMicOn
                                    ? 'bg-surface border-white/10 text-foreground hover:bg-white/5'
                                    : 'bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive/20'
                                    }`}
                            >
                                {isMicOn ? <Mic className="w-5 h-5 md:w-6 md:h-6" /> : <MicOff className="w-5 h-5 md:w-6 md:h-6" />}
                            </button>

                            <button
                                onClick={disconnect}
                                className="px-8 py-4 rounded-full bg-destructive text-destructive-foreground font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-destructive/25 hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base flex-1 md:flex-none"
                            >
                                End Session
                            </button>
                        </>
                    )}
                </div>

                {/* Manual Complete Trigger */}
                {taskId && (
                    <button
                        onClick={() => setShowSummary(true)}
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 py-2 px-4 rounded-full hover:bg-surface/50 border border-transparent hover:border-white/5 backdrop-blur-sm"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Complete Task
                    </button>
                )}
            </div>

            {/* Summary Modal */}
            {showSummary && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-surface border border-white/10 p-6 md:p-8 rounded-3xl w-full max-w-lg text-center space-y-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mb-3 text-foreground">Session Ended</h2>
                            <p className="text-muted-foreground text-lg">
                                You practiced for <span className="text-primary font-bold font-mono text-xl">{formatTime(elapsedTime)}</span>
                            </p>
                        </div>

                        {taskId ? (
                            <div className="space-y-4 pt-4">
                                <button
                                    onClick={handleCompleteTask}
                                    disabled={state === 'completing'}
                                    className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-3"
                                >
                                    {state === 'completing' ? (
                                        <>
                                            <CheckCircle2 className="w-6 h-6 animate-spin" />
                                            Completing...
                                        </>
                                    ) : (
                                        "Complete Task (+80 XP)"
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowSummary(false)}
                                    className="w-full py-4 rounded-2xl hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all font-medium"
                                >
                                    Don't Complete Yet
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="w-full py-5 rounded-2xl bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all"
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
                    <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md border border-gray-700 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Configure Gemini API</h3>
                            <button onClick={() => setShowKeyModal(false)}><X className="w-5 h-5" /></button>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            To use the Live Preview, you need a valid Google Gemini API Key.
                            This key is stored locally in your browser.
                        </p>
                        <input
                            type="password"
                            placeholder="Enter your API Key"
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                            defaultValue={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => setShowKeyModal(false)}
                                className="px-4 py-2 rounded-lg hover:bg-white/10"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => saveKey(apiKey)}
                                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium"
                            >
                                Save Key
                            </button>
                        </div>
                        <div className="mt-4 text-xs text-gray-500 flex items-start gap-2">
                            <Info className="w-4 h-4 shrink-0" />
                            <p>Use a key with access to `gemini-2.0-flash-exp` or equivalent multimodal models.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
