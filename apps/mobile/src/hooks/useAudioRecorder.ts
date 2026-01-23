import { useState, useRef, useCallback, useEffect } from 'react';
import { useAudioRecorder as useExpoAudioRecorder, RecordingOptionsPresets } from 'expo-audio';
import * as FileSystem from 'expo-file-system';

interface UseAudioRecorderOptions {
    onRecordingComplete?: (uri: string, duration: number) => void;
    onError?: (error: Error) => void;
}

interface AudioRecorderState {
    isRecording: boolean;
    isPaused: boolean;
    duration: number;
    uri: string | null;
}

export function useAudioRecorder(options: UseAudioRecorderOptions = {}) {
    const { onRecordingComplete, onError } = options;
    const recorder = useExpoAudioRecorder(RecordingOptionsPresets.HIGH_QUALITY);

    const [state, setState] = useState<AudioRecorderState>({
        isRecording: false,
        isPaused: false,
        duration: 0,
        uri: null,
    });

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Sync state with recorder
    useEffect(() => {
        setState(prev => ({
            ...prev,
            isRecording: recorder.isRecording,
            isPaused: recorder.status === 'paused',
        }));
    }, [recorder.isRecording, recorder.status]);

    const startRecording = useCallback(async () => {
        try {
            recorder.record();
            setState(prev => ({ ...prev, duration: 0 }));

            // Start duration timer
            timerRef.current = setInterval(() => {
                setState(prev => ({ ...prev, duration: prev.duration + 1 }));
            }, 1000);

        } catch (error) {
            onError?.(error as Error);
        }
    }, [recorder, onError]);

    const stopRecording = useCallback(async () => {
        try {
            // Stop timer
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            await recorder.stop();
            const uri = recorder.uri;
            const duration = state.duration;

            setState(prev => ({ ...prev, isRecording: false, isPaused: false, uri }));

            if (uri) {
                onRecordingComplete?.(uri, duration);
            }

            return uri;
        } catch (error) {
            onError?.(error as Error);
            return null;
        }
    }, [recorder, state.duration, onRecordingComplete, onError]);

    const pauseRecording = useCallback(async () => {
        try {
            recorder.pause();
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        } catch (error) {
            onError?.(error as Error);
        }
    }, [recorder, onError]);

    const resumeRecording = useCallback(async () => {
        try {
            recorder.record();
            timerRef.current = setInterval(() => {
                setState(prev => ({ ...prev, duration: prev.duration + 1 }));
            }, 1000);
        } catch (error) {
            onError?.(error as Error);
        }
    }, [recorder, onError]);

    const cancelRecording = useCallback(async () => {
        try {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            await recorder.stop();
            const uri = recorder.uri;

            // Delete the file
            if (uri) {
                await FileSystem.deleteAsync(uri, { idempotent: true });
            }

            setState({ isRecording: false, isPaused: false, duration: 0, uri: null });
        } catch (error) {
            onError?.(error as Error);
        }
    }, [recorder, onError]);

    return {
        ...state,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        cancelRecording,
    };
}
