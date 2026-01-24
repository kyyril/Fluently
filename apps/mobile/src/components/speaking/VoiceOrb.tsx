import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withRepeat,
    withTiming,
    interpolateColor
} from 'react-native-reanimated';

interface VoiceOrbProps {
    volume: number;
    state: 'idle' | 'listening' | 'speaking' | 'connecting' | 'error' | 'completing';
}

export function VoiceOrb({ volume, state }: VoiceOrbProps) {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.2);
    const innerScale = useSharedValue(1);

    useEffect(() => {
        if (state === 'listening' || state === 'speaking') {
            scale.value = withSpring(1 + volume * 2, { damping: 10, stiffness: 100 });
            opacity.value = withTiming(0.4 + volume, { duration: 100 });
            innerScale.value = withSpring(1 + volume * 0.5, { damping: 15 });
        } else if (state === 'connecting') {
            scale.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true);
            opacity.value = 0.2;
            innerScale.value = 1;
        } else {
            scale.value = withSpring(1);
            opacity.value = withTiming(0.2);
            innerScale.value = withSpring(1);
        }
    }, [volume, state]);

    const animatedOuterStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            scale.value,
            [1, 1.5, 2],
            state === 'speaking'
                ? ['rgba(168, 85, 247, 0.4)', 'rgba(168, 85, 247, 0.6)', 'rgba(168, 85, 247, 0.8)']
                : ['rgba(59, 130, 246, 0.4)', 'rgba(59, 130, 246, 0.6)', 'rgba(59, 130, 246, 0.8)']
        );

        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
            backgroundColor: backgroundColor,
        };
    });

    const animatedInnerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: innerScale.value }],
            backgroundColor: state === 'speaking' ? '#a855f7' : state === 'listening' ? '#3b82f6' : '#27272a',
        };
    });

    const animatedOuter2Style = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value * 0.8 }],
            opacity: opacity.value * 0.5,
        };
    });

    return (
        <View className="items-center justify-center">
            {/* Outer Glows */}
            <Animated.View
                style={[styles.outer, animatedOuterStyle]}
                className="absolute w-40 h-40 rounded-full"
            />
            <Animated.View
                style={[styles.outer, animatedOuter2Style, animatedOuterStyle]}
                className="absolute w-40 h-40 rounded-full"
            />

            {/* Main Orb */}
            <Animated.View
                style={[styles.inner, animatedInnerStyle]}
                className="w-24 h-24 rounded-full shadow-2xl shadow-primary/50 flex items-center justify-center border border-white/10"
            >
                <View className="w-16 h-16 rounded-full bg-white/5 border border-white/5" />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    outer: {
        position: 'absolute',
    },
    inner: {
        zIndex: 10,
    }
});
