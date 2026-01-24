/**
 * Mobile-compatible audio utilities for Gemini Live
 */

/**
 * Decodes a base64 string into a Uint8Array.
 * Using a JS-only implementation for React Native compatibility.
 */
export function decodeBase64(base64: string): Uint8Array {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const lookup = new Uint8Array(256);
    for (let i = 0; i < chars.length; i++) {
        lookup[chars.charCodeAt(i)] = i;
    }

    let bufferLength = base64.length * 0.75;
    let len = base64.length;
    let p = 0;
    let encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }

    const bytes = new Uint8Array(bufferLength);

    for (let i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];

        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return bytes;
}

/**
 * Encodes a Uint8Array into a base64 string.
 */
export function encodeBase64(bytes: Uint8Array): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let base64 = '';
    const len = bytes.length;

    for (let i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
    }

    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }

    return base64;
}

/**
 * Converts Float32Array data to PCM Blob for Gemini AI
 */
export function createPcmBlob(data: Float32Array): { data: string; mimeType: string } {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        const s = Math.max(-1, Math.min(1, data[i]));
        int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return {
        data: encodeBase64(new Uint8Array(int16.buffer)),
        mimeType: 'audio/pcm;rate=16000',
    };
}

/**
 * Calculates average volume level from PCM bytes
 */
export function calculateVolume(data: Uint8Array): number {
    const dataInt16 = new Int16Array(data.buffer);
    if (dataInt16.length === 0) return 0;

    let sum = 0;
    const step = 50;
    let count = 0;

    for (let i = 0; i < dataInt16.length; i += step) {
        sum += Math.abs(dataInt16[i] / 32768.0);
        count++;
    }

    return sum / count;
}

/**
 * Creates a WAV header for PCM data
 */
export function createWavHeader(pcmLength: number, sampleRate: number = 24000): Uint8Array {
    const header = new ArrayBuffer(44);
    const view = new DataView(header);

    // RIFF identifier
    view.setUint32(0, 0x52494646, false); // "RIFF"
    view.setUint32(4, 36 + pcmLength, true); // Chunk size
    view.setUint32(8, 0x57415645, false); // "WAVE"

    // fmt chunk
    view.setUint32(12, 0x666d7420, false); // "fmt "
    view.setUint32(16, 16, true);          // Subchunk 1 size (16 for PCM)
    view.setUint16(20, 1, true);           // Audio format (1 for PCM)
    view.setUint16(22, 1, true);           // Number of channels (1)
    view.setUint32(24, sampleRate, true);  // Sample rate
    view.setUint32(28, sampleRate * 2, true); // Byte rate (SampleRate * NumChannels * BitsPerSample/8)
    view.setUint16(32, 2, true);           // Block align (NumChannels * BitsPerSample/8)
    view.setUint16(34, 16, true);          // Bits per sample (16)

    // data chunk
    view.setUint32(36, 0x64617461, false); // "data"
    view.setUint32(40, pcmLength, true);   // Data size

    return new Uint8Array(header);
}

/**
 * Combines header and pcm into a single Uint8Array
 */
export function createWavFile(pcmData: Uint8Array, sampleRate: number = 24000): Uint8Array {
    const header = createWavHeader(pcmData.length, sampleRate);
    const wavFile = new Uint8Array(header.length + pcmData.length);
    wavFile.set(header);
    wavFile.set(pcmData, header.length);
    return wavFile;
}
