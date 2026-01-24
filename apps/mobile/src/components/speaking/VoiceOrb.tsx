import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { Mic2, Volume2 } from 'lucide-react-native';

interface VoiceOrbProps {
    volume: number;
    state: 'idle' | 'listening' | 'speaking' | 'connecting' | 'error' | 'completing';
}

export function VoiceOrb({ volume, state }: VoiceOrbProps) {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.3);

    useEffect(() => {
        if (state === 'listening' || state === 'speaking') {
            scale.value = withSpring(1 + volume * 0.5, { damping: 15, stiffness: 120 });
            opacity.value = withTiming(0.5 + volume * 0.3, { duration: 100 });
        } else if (state === 'connecting') {
            scale.value = withRepeat(withTiming(1.1, { duration: 800 }), -1, true);
            opacity.value = 0.4;
        } else {
            scale.value = withSpring(1);
            opacity.value = withTiming(0.3);
        }
    }, [volume, state]);

    const getColor = () => {
        switch (state) {
            case 'listening': return '#3b82f6';
            case 'speaking': return '#a855f7';
            case 'connecting': return '#f59e0b';
            case 'error': return '#ef4444';
            default: return '#3f3f46';
        }
    };

    const animatedGlowStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value * 1.5 }],
        opacity: opacity.value * 0.6,
    }));

    const animatedCoreStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const color = getColor();
    const isActive = state === 'listening' || state === 'speaking';

    return (
        <View style={styles.container}>
            {/* Glow */}
            <Animated.View
                style={[
                    styles.glow,
                    { backgroundColor: color },
                    animatedGlowStyle,
                ]}
            />

            {/* Core */}
            <Animated.View
                style={[
                    styles.core,
                    { backgroundColor: color },
                    animatedCoreStyle,
                ]}
            >
                {/* Icon */}
                <View style={styles.iconContainer}>
                    {state === 'listening' && <Mic2 color="white" size={32} />}
                    {state === 'speaking' && <Volume2 color="white" size={32} />}
                    {state === 'idle' && <Mic2 color="rgba(255,255,255,0.5)" size={28} />}
                    {state === 'connecting' && <Mic2 color="white" size={28} />}
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    glow: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    core: {
        width: 90,
        height: 90,
        borderRadius: 45,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
