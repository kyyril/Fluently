import React, { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withDelay,
    FadeInDown,
    Layout
} from 'react-native-reanimated';
import { Card as UICard } from './Card';

interface AnimatedCardProps {
    children: React.ReactNode;
    index?: number;
    delay?: number;
    className?: string;
    onPress?: () => void;
}

export function AnimatedCard({
    children,
    index = 0,
    delay = 100,
    className = '',
    onPress
}: AnimatedCardProps): JSX.Element {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withDelay(index * delay, withSpring(1));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.98);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    return (
        <Animated.View
            entering={FadeInDown.delay(index * delay).springify()}
            layout={Layout.springify()}
            style={animatedStyle}
            className={className}
        >
            <UICard onPress={onPress}>
                {children}
            </UICard>
        </Animated.View>
    );
}
