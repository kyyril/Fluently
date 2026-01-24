
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

    const getStatusText = () => {
        switch (state) {
            case 'idle': return 'Ready to Practice';
            case 'connecting': return 'Connecting...';
            case 'listening': return 'Listening...';
            case 'speaking': return 'AI Speaking';
            case 'error': return 'Error';
            case 'completing': return 'Saving...';
            default: return '';
        }
    };

    return (
        <div className="flex flex-col items-center justify-between h-full min-h-[600px] w-full relative overflow-hidden bg-background">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="w-full flex items-center justify-between p-4 md:p-8 z-10">
                <div className="flex-1">
                    {isConnected && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 w-fit">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Live Session</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-muted/30 backdrop-blur-md border border-white/5 shadow-sm">
                        <Clock className={`w-4 h-4 ${isConnected ? 'text-blue-400' : 'text-muted-foreground'}`} />
                        <span className="font-mono text-sm font-bold tracking-tight">
                            {formatTime(elapsedTime)}
                            <span className="text-muted-foreground/50 ml-1">/ 30:00</span>
                        </span>
                    </div>
                </div>

                <div className="flex-1 flex justify-end">
                    <button
                        onClick={() => setShowKeyModal(true)}
                        className="p-3 rounded-full hover:bg-muted/50 transition-all text-muted-foreground hover:text-foreground border border-transparent hover:border-white/5"
                        title="Settings"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 w-full flex flex-col items-center justify-center z-10 gap-8 md:gap-14 py-4">
                <VoiceOrb volume={volume} state={state} />

                <div className="flex flex-col items-center gap-6 px-4">
                    <p className="text-xs md:text-sm font-bold uppercase tracking-[6px] text-muted-foreground/60 transition-all duration-500">
                        {getStatusText()}
                    </p>

                    {state === 'idle' && (
                        <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-amber-500 animate-in fade-in slide-in-from-bottom-2 duration-700 shadow-sm max-w-[280px] md:max-w-md text-center">
                            <Sparkles className="w-4 h-4 shrink-0" />
                            <span className="text-sm font-medium tracking-wide">{TIPS[tipIndex]}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="w-full max-w-xl flex flex-col items-center gap-8 pb-10 md:pb-16 z-10 px-6">
                {/* Progress */}
                {isConnected && (
                    <div className="w-full h-1 bg-muted/20 rounded-full overflow-hidden mb-2">
                        <div
                            className="h-full bg-blue-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            style={{ width: `${getProgressPercent()}%` }}
                        />
                    </div>
                )}

                <div className="flex items-center justify-center gap-4 w-full">
                    {!isConnected ? (
                        <button
                            onClick={connect}
                            disabled={state === 'connecting'}
                            className="group relative flex items-center justify-center gap-4 px-12 py-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black text-lg transition-all shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 w-full md:w-auto min-w-[280px]"
                        >
                            <Mic className="w-6 h-6" />
                            <span className="tracking-tight">{state === 'connecting' ? 'Connecting...' : 'Start Practicing'}</span>
                        </button>
                    ) : (
                        <div className="flex items-center gap-4 w-full">
                            <button
                                onClick={toggleMic}
                                className={`p-5 rounded-full transition-all border shadow-sm ${isMicOn
                                    ? 'bg-muted/30 border-white/5 text-foreground hover:bg-muted/50'
                                    : 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                                    }`}
                            >
                                {isMicOn ? <Mic className="w-7 h-7" /> : <MicOff className="w-7 h-7" />}
                            </button>
                            <button
                                onClick={disconnect}
                                className="flex-1 flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-red-600 hover:bg-red-500 text-white font-black text-lg transition-all shadow-xl shadow-red-600/20 hover:shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <X className="w-6 h-6" />
                                <span>End Session</span>
                            </button>
                        </div>
                    )}
                </div>

                {taskId && !isConnected && (
                    <button
                        onClick={() => setShowSummary(true)}
                        className="text-xs font-bold text-muted-foreground/40 hover:text-primary transition-all flex items-center gap-2 tracking-widest uppercase py-2"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Quick Finish
                    </button>
                )}
            </div>

            {/* Modals */}
            {showSummary && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-center p-6 sm:p-4">
                    <div className="bg-surface border border-white/5 p-8 md:p-12 rounded-[40px] w-full max-w-md text-center space-y-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                        <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-3xl font-black tracking-tight">Well Done!</h2>
                            <p className="text-muted-foreground text-lg">
                                Practice Time: <span className="text-foreground font-bold font-mono text-xl">{formatTime(elapsedTime)}</span>
                            </p>
                        </div>
                        <div className="space-y-3">
                            {taskId ? (
                                <>
                                    <button
                                        onClick={handleCompleteTask}
                                        disabled={state === 'completing'}
                                        className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/25 disabled:opacity-50"
                                    >
                                        {state === 'completing' ? 'Saving Progress...' : 'Claim 80 XP'}
                                    </button>
                                    <button
                                        onClick={() => setShowSummary(false)}
                                        className="w-full py-4 rounded-2xl hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all font-bold"
                                    >
                                        Keep Going
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="w-full py-5 rounded-2xl bg-foreground text-background font-black text-lg hover:opacity-90 transition-all"
                                >
                                    Finish
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showKeyModal && (
                <div className="absolute inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-6">
                    <div className="bg-surface border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-black tracking-tight">Gemini Setup</h3>
                            <button onClick={() => setShowKeyModal(false)} className="hover:rotate-90 transition-transform"><X className="w-6 h-6" /></button>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">Enter your Google Gemini API key to enable AI voice conversations. This is stored only in your browser.</p>
                        <input
                            type="password"
                            placeholder="Paste your API key here..."
                            className="w-full bg-muted/50 border border-white/5 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm shadow-inner transition-all focus:bg-muted"
                            defaultValue={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                        <div className="flex gap-3 pt-2">
                            <button onClick={() => setShowKeyModal(false)} className="flex-1 py-4 rounded-xl hover:bg-white/5 font-bold transition-colors">Cancel</button>
                            <button onClick={() => saveKey(apiKey)} className="flex-1 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all shadow-lg shadow-blue-600/20">Save Key</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
