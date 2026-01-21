import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { decodeBase64, decodeAudioData, createPcmBlob } from './audio-utils';

export type VoiceName = 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';

export interface LiveConfig {
    model: string;
    systemInstruction: string;
    voiceName: VoiceName;
}

export class GeminiLiveClient {
    private apiKey: string;
    public config: LiveConfig;
    private session: any = null;
    private audioContext: AudioContext | null = null;
    private nextPlayTime = 0;
    private activeSources = new Set<AudioBufferSourceNode>();

    public onConnected: () => void = () => { };
    public onDisconnected: () => void = () => { };
    public onError: (error: any) => void = () => { };
    public onAudioData: (level: number) => void = () => { };

    constructor(apiKey: string, config: LiveConfig) {
        this.apiKey = apiKey;
        this.config = config;
    }

    async connect() {
        try {
            const ai = new GoogleGenAI({ apiKey: this.apiKey });

            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
                sampleRate: 24000,
            });

            this.session = await ai.live.connect({
                model: this.config.model,
                config: {
                    responseModalities: [Modality.AUDIO],
                    systemInstruction: { parts: [{ text: this.config.systemInstruction }] },
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: {
                                voiceName: this.config.voiceName
                            }
                        }
                    },
                },
                callbacks: {
                    onopen: () => {
                        console.log("Gemini Live Connected");
                        this.onConnected();
                    },
                    onmessage: (msg: LiveServerMessage) => this.handleMessage(msg),
                    onclose: (e) => {
                        console.log("Gemini Live Disconnected", e);
                        this.onDisconnected();
                    },
                    onerror: (e) => {
                        console.error("Gemini Live Error", e);
                        this.onError(e);
                    }
                }
            });

        } catch (error) {
            console.error("Connection failed", error);
            this.onError(error);
        }
    }

    private async handleMessage(message: LiveServerMessage) {
        const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

        if (base64Audio && this.audioContext) {
            const ctx = this.audioContext;
            if (ctx.state === 'suspended') await ctx.resume();

            const audioBytes = decodeBase64(base64Audio);
            const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);

            // Visualizer data
            const data = audioBuffer.getChannelData(0);
            let sum = 0;
            for (let i = 0; i < data.length; i += 50) sum += Math.abs(data[i]);
            const avg = sum / (data.length / 50);
            this.onAudioData(avg);

            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);

            const currentTime = ctx.currentTime;
            if (this.nextPlayTime < currentTime) this.nextPlayTime = currentTime;

            source.start(this.nextPlayTime);
            this.nextPlayTime += audioBuffer.duration;

            this.activeSources.add(source);
            source.onended = () => this.activeSources.delete(source);
        }

        if (message.serverContent?.interrupted) {
            this.stopPlayback();
        }
    }

    sendAudioChunk(pcmData: Float32Array) {
        if (this.session) {
            this.session.sendRealtimeInput({
                media: createPcmBlob(pcmData)
            });
        }
    }

    stopPlayback() {
        this.activeSources.forEach(s => {
            try { s.stop(); } catch (e) { }
        });
        this.activeSources.clear();
        this.nextPlayTime = 0;
    }

    disconnect() {
        if (this.session) {
            this.session.close();
            this.session = null;
        }

        this.stopPlayback();

        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
    }
}
