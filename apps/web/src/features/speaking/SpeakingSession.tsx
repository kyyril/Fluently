
'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GeminiLiveClient } from './lib/GeminiLiveClient';
import { VoiceOrb } from './components/VoiceOrb';
import { Mic, MicOff, Settings, X, CheckCircle2, Sparkles, Zap, Trophy } from 'lucide-react';
import { useCompleteTask } from '@/hooks/useRoutine';

interface SpeakingSessionProps {
    taskId?: string;
}


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
    const [customPrompt, setCustomPrompt] = useState<string>('');
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
        const localPrompt = localStorage.getItem('speaking_custom_prompt') || '';

        if (envKey) setApiKey(envKey);
        else if (localKey) setApiKey(localKey);
        else setShowKeyModal(true);

        setCustomPrompt(localPrompt);

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
                systemInstruction: `You are Fluently AI, a professional English tutor. 
                Your goal is to help students practice their English speaking skills.
                ALWAYS respond in English. 
                Keep responses brief and engaging (1-3 sentences). 
                If the user makes a mistake, provide a very short correction at the end of your response.
                ${customPrompt ? `The user has specified this focus/personality for today: "${customPrompt}". Adapt your style and topic to this instruction.` : 'Start the conversation with a warm greeting in English.'}`
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
    const saveSettings = (key: string, prompt: string) => {
        localStorage.setItem('gemini_api_key', key);
        localStorage.setItem('speaking_custom_prompt', prompt);
        setApiKey(key);
        setCustomPrompt(prompt);
        setShowKeyModal(false);
    };

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
            {/* Header */}
            <div className="w-full flex items-center justify-between p-6 md:p-10 z-10">
                <div className="flex-1" />

                <div className="flex-1 flex justify-end">
                    <button
                        onClick={() => setShowKeyModal(true)}
                        className="p-3 rounded-xl bg-surface/50 hover:bg-surface transition-all text-muted-foreground hover:text-foreground"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 w-full flex flex-col items-center justify-center z-10 gap-10 md:gap-16 py-4">
                <VoiceOrb volume={volume} state={state} />

                <div className="flex flex-col items-center gap-4 px-4 text-center">
                    <p className="text-xs font-black uppercase tracking-[4px] text-muted-foreground transition-all duration-500">
                        {getStatusText()}
                    </p>

                    {state === 'idle' && (
                        <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary/5 text-primary max-w-xs text-center border-none">
                            <Sparkles className="w-4 h-4 shrink-0" />
                            <span className="text-xs font-bold tracking-tight">{TIPS[tipIndex]}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="w-full max-w-lg flex flex-col items-center gap-6 pb-10 md:pb-16 z-10 px-6">
                <div className="flex items-center justify-center gap-3 w-full">
                    {!isConnected ? (
                        <button
                            onClick={connect}
                            disabled={state === 'connecting'}
                            className="group relative flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm transition-all shadow-lg shadow-primary/10 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 w-full sm:w-auto min-w-[240px]"
                        >
                            <Mic className="w-5 h-5" />
                            <span>{state === 'connecting' ? 'Connecting...' : 'Start Session'}</span>
                        </button>
                    ) : (
                        <div className="flex items-center gap-3 w-full">
                            <button
                                onClick={toggleMic}
                                className={`p-4 rounded-xl transition-all ${isMicOn
                                    ? 'bg-surface/50 text-foreground hover:bg-surface'
                                    : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                    }`}
                            >
                                {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                            </button>
                            <button
                                onClick={disconnect}
                                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold text-sm transition-all"
                            >
                                <X className="w-5 h-5" />
                                <span>End Practice</span>
                            </button>
                        </div>
                    )}
                </div>

                {taskId && !isConnected && (
                    <button
                        onClick={() => setShowSummary(true)}
                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 hover:text-primary transition-all flex items-center gap-2"
                    >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Quick Finish
                    </button>
                )}
            </div>

            {/* Modals - Clean Flat Board Style */}
            {showSummary && (
                <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-surface p-6 md:p-10 rounded-2xl w-full max-w-sm text-center space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-300 border-none">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto">
                            <Trophy className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black tracking-tight">Great Work!</h2>
                        </div>
                        <div className="space-y-2 pt-4">
                            {taskId ? (
                                <>
                                    <button
                                        onClick={handleCompleteTask}
                                        disabled={state === 'completing'}
                                        className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/10 disabled:opacity-50"
                                    >
                                        {state === 'completing' ? 'Saving...' : 'Claim 80 XP'}
                                    </button>
                                    <button
                                        onClick={() => setShowSummary(false)}
                                        className="w-full py-3 rounded-xl hover:bg-muted/5 text-muted-foreground font-black uppercase tracking-widest text-[9px]"
                                    >
                                        Keep Practicing
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="w-full py-4 rounded-xl bg-surface hover:bg-surface/80 text-foreground font-bold text-sm transition-all"
                                >
                                    Finish
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showKeyModal && (
                <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center p-6">
                    <div className="bg-surface p-6 rounded-2xl w-full max-w-sm shadow-2xl space-y-5 border-none">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-black tracking-tight">Session Settings</h3>
                            <button onClick={() => setShowKeyModal(false)} className="hover:rotate-90 transition-transform"><X className="w-5 h-5 text-muted-foreground" /></button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-70">Personalization (Optional)</label>
                                <textarea
                                    placeholder="e.g. Talk about tech jobs, act like a pirate, or help me practice for a job interview..."
                                    className="w-full h-24 bg-background border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary/40 outline-none text-xs leading-relaxed resize-none shadow-inner"
                                    value={customPrompt}
                                    onChange={(e) => setCustomPrompt(e.target.value)}
                                />
                                <p className="text-[9px] text-muted-foreground italic leading-tight">This will change how the AI behaves and what it talks about.</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-70">Gemini API Key</label>
                                <input
                                    type="password"
                                    placeholder="your-api-key..."
                                    className="w-full bg-background border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary/40 outline-none font-mono text-xs shadow-inner"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button onClick={() => setShowKeyModal(false)} className="flex-1 py-3 rounded-lg hover:bg-muted/50 font-black uppercase tracking-widest text-[9px] text-muted-foreground">Cancel</button>
                            <button onClick={() => saveSettings(apiKey, customPrompt)} className="flex-1 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[9px]">Apply Settings</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
