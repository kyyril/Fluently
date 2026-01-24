import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withRepeat,
    withTiming,
    withSequence,
    interpolate,
    interpolateColor,
    Easing,
} from 'react-native-reanimated';
import { Mic2, Volume2, Loader } from 'lucide-react-native';

interface VoiceOrbProps {
    volume: number;
    state: 'idle' | 'listening' | 'speaking' | 'connecting' | 'error' | 'completing';
}

export function VoiceOrb({ volume, state }: VoiceOrbProps) {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.15);
    const innerScale = useSharedValue(1);
    const pulseScale = useSharedValue(1);
    const rotation = useSharedValue(0);
    const ring1Scale = useSharedValue(1);
    const ring2Scale = useSharedValue(1);
    const ring3Scale = useSharedValue(1);

    // Continuous rotation for idle state
    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, { duration: 20000, easing: Easing.linear }),
            -1,
            false
        );
    }, []);

    // Pulsing rings effect
    useEffect(() => {
        if (state === 'listening' || state === 'speaking') {
            ring1Scale.value = withRepeat(
                withSequence(
                    withTiming(1.3, { duration: 1500 }),
                    withTiming(1, { duration: 1500 })
                ),
                -1,
                false
            );
            ring2Scale.value = withRepeat(
                withSequence(
                    withTiming(1.2, { duration: 2000 }),
                    withTiming(1, { duration: 2000 })
                ),
                -1,
                false
            );
            ring3Scale.value = withRepeat(
                withSequence(
                    withTiming(1.1, { duration: 2500 }),
                    withTiming(1, { duration: 2500 })
                ),
                -1,
                false
            );
        } else {
            ring1Scale.value = withTiming(1);
            ring2Scale.value = withTiming(1);
            ring3Scale.value = withTiming(1);
        }
    }, [state]);

    useEffect(() => {
        if (state === 'listening' || state === 'speaking') {
            scale.value = withSpring(1 + volume * 1.5, { damping: 12, stiffness: 120 });
            opacity.value = withTiming(0.3 + volume * 0.4, { duration: 80 });
            innerScale.value = withSpring(1 + volume * 0.3, { damping: 15, stiffness: 150 });
            pulseScale.value = withSpring(1 + volume * 0.8, { damping: 10 });
        } else if (state === 'connecting') {
            scale.value = withRepeat(
                withSequence(
                    withTiming(1.1, { duration: 800 }),
                    withTiming(1, { duration: 800 })
                ),
                -1,
                true
            );
            opacity.value = 0.2;
            innerScale.value = 1;
            pulseScale.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true);
        } else {
            scale.value = withSpring(1, { damping: 15 });
            opacity.value = withTiming(0.15, { duration: 300 });
            innerScale.value = withSpring(1);
            pulseScale.value = withTiming(1);
        }
    }, [volume, state]);

    const getStateColors = () => {
        switch (state) {
            case 'speaking':
                return { primary: '#a855f7', secondary: '#7c3aed', glow: 'rgba(168, 85, 247, 0.5)' };
            case 'listening':
                return { primary: '#3b82f6', secondary: '#2563eb', glow: 'rgba(59, 130, 246, 0.5)' };
            case 'connecting':
                return { primary: '#f59e0b', secondary: '#d97706', glow: 'rgba(245, 158, 11, 0.4)' };
            case 'error':
                return { primary: '#ef4444', secondary: '#dc2626', glow: 'rgba(239, 68, 68, 0.5)' };
            default:
                return { primary: '#3f3f46', secondary: '#27272a', glow: 'rgba(63, 63, 70, 0.3)' };
        }
    };

    const colors = getStateColors();

    const animatedOuterStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value * 1.8 }],
        opacity: opacity.value * 0.6,
    }));

    const animatedMiddleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value * 1.4 }],
        opacity: opacity.value * 0.8,
    }));

    const animatedInnerGlowStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const animatedCoreStyle = useAnimatedStyle(() => ({
        transform: [{ scale: innerScale.value }],
    }));

    const animatedPulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulseScale.value }],
        opacity: interpolate(pulseScale.value, [1, 1.8], [0.6, 0]),
    }));

    const animatedRing1Style = useAnimatedStyle(() => ({
        transform: [{ scale: ring1Scale.value }, { rotate: `${rotation.value}deg` }],
        opacity: interpolate(ring1Scale.value, [1, 1.3], [0.15, 0.05]),
    }));

    const animatedRing2Style = useAnimatedStyle(() => ({
        transform: [{ scale: ring2Scale.value }, { rotate: `${-rotation.value * 0.5}deg` }],
        opacity: interpolate(ring2Scale.value, [1, 1.2], [0.12, 0.04]),
    }));

    const animatedRing3Style = useAnimatedStyle(() => ({
        transform: [{ scale: ring3Scale.value }, { rotate: `${rotation.value * 0.3}deg` }],
        opacity: interpolate(ring3Scale.value, [1, 1.1], [0.1, 0.03]),
    }));

    const isActive = state === 'listening' || state === 'speaking' || state === 'connecting';

    return (
        <View style={styles.container}>
            {/* Decorative Rings */}
            <Animated.View style={[styles.ring, { width: 280, height: 280, borderColor: colors.primary }, animatedRing1Style]} />
            <Animated.View style={[styles.ring, { width: 320, height: 320, borderColor: colors.primary }, animatedRing2Style]} />
            <Animated.View style={[styles.ring, { width: 360, height: 360, borderColor: colors.primary }, animatedRing3Style]} />

            {/* Outer Glow Layers */}
            <Animated.View
                style={[
                    styles.glowLayer,
                    { width: 200, height: 200, backgroundColor: colors.glow },
                    animatedOuterStyle,
                ]}
            />
            <Animated.View
                style={[
                    styles.glowLayer,
                    { width: 160, height: 160, backgroundColor: colors.glow },
                    animatedMiddleStyle,
                ]}
            />
            <Animated.View
                style={[
                    styles.glowLayer,
                    { width: 130, height: 130, backgroundColor: colors.glow },
                    animatedInnerGlowStyle,
                ]}
            />

            {/* Pulse Effect */}
            {isActive && (
                <Animated.View
                    style={[
                        styles.pulse,
                        { backgroundColor: colors.primary },
                        animatedPulseStyle,
                    ]}
                />
            )}

            {/* Main Core */}
            <Animated.View
                style={[
                    styles.core,
                    { backgroundColor: colors.primary, shadowColor: colors.primary },
                    animatedCoreStyle,
                ]}
            >
                {/* Inner Gradient Effect */}
                <View style={[styles.coreInner, { backgroundColor: colors.secondary }]} />

                {/* Center Highlight */}
                <View style={styles.coreHighlight} />

                {/* Icon */}
                <View style={styles.iconContainer}>
                    {state === 'listening' && <Mic2 color="white" size={32} />}
                    {state === 'speaking' && <Volume2 color="white" size={32} />}
                    {state === 'connecting' && <Loader color="white" size={28} />}
                    {state === 'idle' && <Mic2 color="rgba(255,255,255,0.5)" size={28} />}
                    {state === 'error' && <Mic2 color="white" size={28} />}
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ring: {
        position: 'absolute',
        borderRadius: 999,
        borderWidth: 1,
        borderStyle: 'dashed',
    },
    glowLayer: {
        position: 'absolute',
        borderRadius: 999,
    },
    pulse: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    core: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 20,
        overflow: 'hidden',
    },
    coreInner: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        opacity: 0.5,
    },
    coreHighlight: {
        position: 'absolute',
        top: 8,
        left: 16,
        width: 30,
        height: 20,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        transform: [{ rotate: '-20deg' }],
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
});
