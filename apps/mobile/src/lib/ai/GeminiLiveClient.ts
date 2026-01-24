/**
 * WebSocket-based Gemini Live Client for React Native
 * Bypasses the @google/genai SDK which doesn't work in RN environment
 */

import { decodeBase64, createPcmBlob, calculateVolume, encodeBase64 } from './audio-utils';

export type VoiceName = 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';

export interface LiveConfig {
    model: string;
    systemInstruction: string;
    voiceName: VoiceName;
}

const GEMINI_WS_URL = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent';

export class GeminiLiveClient {
    private apiKey: string;
    public config: LiveConfig;
    private ws: WebSocket | null = null;

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
            const url = `${GEMINI_WS_URL}?key=${this.apiKey}`;

            console.log("Connecting to Gemini Live (WebSocket)...");

            this.ws = new WebSocket(url);

            this.ws.onopen = () => {
                console.log("WebSocket connected, sending setup...");
                this.sendSetup();
            };

            this.ws.onmessage = async (event) => {
                try {
                    let data;

                    // Handle different message types
                    if (typeof event.data === 'string') {
                        data = JSON.parse(event.data);
                    } else if (event.data instanceof Blob) {
                        const text = await event.data.text();
                        data = JSON.parse(text);
                    } else if (event.data instanceof ArrayBuffer) {
                        const decoder = new TextDecoder();
                        const text = decoder.decode(event.data);
                        data = JSON.parse(text);
                    } else {
                        console.log("Unknown message type:", typeof event.data, event.data);
                        return;
                    }

                    this.handleMessage(data);
                } catch (e) {
                    console.log("Message parse error:", e, "Raw:", event.data?.substring?.(0, 100));
                }
            };

            this.ws.onclose = (event) => {
                console.log("WebSocket closed:", event.code, event.reason);
                this.onDisconnected();
            };

            this.ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                this.onError(error);
            };

        } catch (error) {
            console.error("Connection failed", error);
            this.onError(error);
        }
    }

    private sendSetup() {
        if (!this.ws) return;

        const setupMessage = {
            setup: {
                model: `models/${this.config.model}`,
                generationConfig: {
                    responseModalities: ["AUDIO"],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: {
                                voiceName: this.config.voiceName
                            }
                        }
                    }
                },
                systemInstruction: {
                    parts: [{ text: this.config.systemInstruction }]
                }
            }
        };

        this.ws.send(JSON.stringify(setupMessage));
    }

    private handleMessage(message: any) {
        // Setup complete
        if (message.setupComplete) {
            console.log("Gemini Live setup complete");
            this.onConnected();
            return;
        }

        // Server content (audio response)
        if (message.serverContent) {
            const parts = message.serverContent.modelTurn?.parts || [];

            for (const part of parts) {
                if (part.inlineData?.data) {
                    const base64Audio = part.inlineData.data;
                    this.onAudioData(base64Audio);

                    // Calculate volume for visualization
                    const audioBytes = decodeBase64(base64Audio);
                    const volume = calculateVolume(audioBytes);
                    this.onVolumeLevel(volume);
                }
            }

            // Check for interruption
            if (message.serverContent.interrupted) {
                this.onInterrupted();
            }
        }
    }

    sendAudioChunk(pcmData: Float32Array) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

        const pcmBlob = createPcmBlob(pcmData);

        const message = {
            realtimeInput: {
                mediaChunks: [{
                    mimeType: pcmBlob.mimeType,
                    data: pcmBlob.data
                }]
            }
        };

        this.ws.send(JSON.stringify(message));
    }

    /**
     * Sends a silent audio chunk to keep the connection alive
     */
    sendSilence() {
        const silentData = new Float32Array(2048).fill(0);
        this.sendAudioChunk(silentData);
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}
