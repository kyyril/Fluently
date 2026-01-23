import { useState, useRef, useCallback } from 'react';
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

    const recordingRef = useRef<Audio.Recording | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [state, setState] = useState<AudioRecorderState>({
        isRecording: false,
        isPaused: false,
        duration: 0,
        uri: null,
    });

    const startRecording = useCallback(async () => {
        try {
            // Request permissions
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                throw new Error('Audio recording permission not granted');
            }

            // Set audio mode
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // Create and start recording
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            recordingRef.current = recording;

            setState(prev => ({ ...prev, isRecording: true, duration: 0 }));

            // Start duration timer
            timerRef.current = setInterval(() => {
                setState(prev => ({ ...prev, duration: prev.duration + 1 }));
            }, 1000);

        } catch (error) {
            console.error('Failed to start recording:', error);
            onError?.(error as Error);
        }
    }, [onError]);

    const stopRecording = useCallback(async () => {
        try {
            // Stop timer
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            if (!recordingRef.current) {
                return null;
            }

            await recordingRef.current.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });

            const uri = recordingRef.current.getURI();
            const duration = state.duration;

            recordingRef.current = null;
            setState(prev => ({ ...prev, isRecording: false, isPaused: false, uri }));

            if (uri) {
                onRecordingComplete?.(uri, duration);
            }

            return uri;
        } catch (error) {
            console.error('Failed to stop recording:', error);
            onError?.(error as Error);
            return null;
        }
    }, [state.duration, onRecordingComplete, onError]);

    const pauseRecording = useCallback(async () => {
        try {
            if (recordingRef.current) {
                await recordingRef.current.pauseAsync();
                setState(prev => ({ ...prev, isPaused: true }));
            }
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        } catch (error) {
            console.error('Failed to pause recording:', error);
            onError?.(error as Error);
        }
    }, [onError]);

    const resumeRecording = useCallback(async () => {
        try {
            if (recordingRef.current) {
                await recordingRef.current.startAsync();
                setState(prev => ({ ...prev, isPaused: false }));
            }
            timerRef.current = setInterval(() => {
                setState(prev => ({ ...prev, duration: prev.duration + 1 }));
            }, 1000);
        } catch (error) {
            console.error('Failed to resume recording:', error);
            onError?.(error as Error);
        }
    }, [onError]);

    const cancelRecording = useCallback(async () => {
        try {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            if (recordingRef.current) {
                await recordingRef.current.stopAndUnloadAsync();
                const uri = recordingRef.current.getURI();
                recordingRef.current = null;

                // Delete the file
                if (uri) {
                    await FileSystem.deleteAsync(uri, { idempotent: true });
                }
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });

            setState({ isRecording: false, isPaused: false, duration: 0, uri: null });
        } catch (error) {
            console.error('Failed to cancel recording:', error);
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
