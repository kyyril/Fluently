import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { decodeBase64, createPcmBlob, calculateVolume } from './audio-utils';

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

    public onConnected: () => void = () => { };
    public onDisconnected: () => void = () => { };
    public onError: (error: any) => void = () => { };
    public onAudioData: (base64: string) => void = () => { };
    public onVolumeLevel: (level: number) => void = () => { };
    public onInterrupted: () => void = () => { };

    constructor(apiKey: string, config: LiveConfig) {
        this.apiKey = apiKey;
        this.config = config;
    }

    async connect() {
        try {
            const ai = new GoogleGenAI({ apiKey: this.apiKey });

            console.log("Connecting to Gemini Live (SDK)...");

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

        if (base64Audio) {
            this.onAudioData(base64Audio);

            // Real volume calculation from PCM bytes
            const audioBytes = decodeBase64(base64Audio);
            const volume = calculateVolume(audioBytes);
            this.onVolumeLevel(volume);
        }

        if (message.serverContent?.interrupted) {
            this.onInterrupted();
        }
    }

    sendAudioChunk(pcmData: Float32Array) {
        if (this.session) {
            this.session.sendRealtimeInput({
                media: createPcmBlob(pcmData)
            });
        }
    }

    /**
     * Sends a silent audio chunk to keep the connection alive
     */
    sendSilence() {
        const silentData = new Float32Array(2048).fill(0);
        this.sendAudioChunk(silentData);
    }

    disconnect() {
        if (this.session) {
            this.session.close();
            this.session = null;
        }
    }
}
