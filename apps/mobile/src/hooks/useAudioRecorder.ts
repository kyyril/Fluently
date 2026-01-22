import { useState, useRef, useCallback, useEffect } from 'react';
import { Audio } from 'expo-av';
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

    const [state, setState] = useState<AudioRecorderState>({
        isRecording: false,
        isPaused: false,
        duration: 0,
        uri: null,
    });

    const recordingRef = useRef<Audio.Recording | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Request permissions on mount
    useEffect(() => {
        const requestPermissions = async () => {
            try {
                const { granted } = await Audio.requestPermissionsAsync();
                if (!granted) {
                    onError?.(new Error('Microphone permission not granted'));
                }
            } catch (error) {
                onError?.(error as Error);
            }
        };
        requestPermissions();

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const startRecording = useCallback(async () => {
        try {
            // Configure audio mode
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            await recording.startAsync();

            recordingRef.current = recording;
            setState(prev => ({ ...prev, isRecording: true, isPaused: false, duration: 0 }));

            // Start duration timer
            timerRef.current = setInterval(() => {
                setState(prev => ({ ...prev, duration: prev.duration + 1 }));
            }, 1000);

        } catch (error) {
            onError?.(error as Error);
        }
    }, [onError]);

    const stopRecording = useCallback(async () => {
        try {
            if (!recordingRef.current) return;

            // Stop timer
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            await recordingRef.current.stopAndUnloadAsync();
            const uri = recordingRef.current.getURI();
            const duration = state.duration;

            recordingRef.current = null;
            setState(prev => ({ ...prev, isRecording: false, isPaused: false, uri }));

            // Reset audio mode
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });

            if (uri) {
                onRecordingComplete?.(uri, duration);
            }

            return uri;
        } catch (error) {
            onError?.(error as Error);
            return null;
        }
    }, [state.duration, onRecordingComplete, onError]);

    const pauseRecording = useCallback(async () => {
        try {
            if (!recordingRef.current || !state.isRecording) return;

            await recordingRef.current.pauseAsync();

            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            setState(prev => ({ ...prev, isPaused: true }));
        } catch (error) {
            onError?.(error as Error);
        }
    }, [state.isRecording, onError]);

    const resumeRecording = useCallback(async () => {
        try {
            if (!recordingRef.current || !state.isPaused) return;

            await recordingRef.current.startAsync();

            timerRef.current = setInterval(() => {
                setState(prev => ({ ...prev, duration: prev.duration + 1 }));
            }, 1000);

            setState(prev => ({ ...prev, isPaused: false }));
        } catch (error) {
            onError?.(error as Error);
        }
    }, [state.isPaused, onError]);

    const cancelRecording = useCallback(async () => {
        try {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            if (recordingRef.current) {
                await recordingRef.current.stopAndUnloadAsync();
                const uri = recordingRef.current.getURI();

                // Delete the file
                if (uri) {
                    await FileSystem.deleteAsync(uri, { idempotent: true });
                }

                recordingRef.current = null;
            }

            setState({ isRecording: false, isPaused: false, duration: 0, uri: null });

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });
        } catch (error) {
            onError?.(error as Error);
        }
    }, [onError]);

    return {
        ...state,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        cancelRecording,
    };
}
