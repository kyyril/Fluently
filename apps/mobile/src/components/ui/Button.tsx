import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '@/stores/settingsStore';

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

export interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    textClassName?: string;
}

export function Button({
    onPress,
    title,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className = '',
    textClassName = '',
}: ButtonProps): JSX.Element {
    const { hapticsEnabled } = useSettingsStore();

    const handlePress = () => {
        if (disabled || loading) return;
        if (hapticsEnabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress();
    };

    const variantStyles = {
        primary: 'bg-indigo-600 active:bg-indigo-700',
        secondary: 'bg-zinc-800 active:bg-zinc-700',
        outline: 'bg-transparent border border-zinc-700 active:bg-zinc-900',
        ghost: 'bg-transparent active:bg-zinc-900',
        danger: 'bg-red-600 active:bg-red-700',
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 rounded-lg',
        md: 'px-5 py-3 rounded-xl',
        lg: 'px-6 py-4 rounded-2xl',
    };

    const textSizeStyles = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    };

    return (
        <StyledPressable
            onPress={handlePress}
            disabled={disabled || loading}
            className={`flex-row items-center justify-center ${variantStyles[variant as keyof typeof variantStyles]} ${sizeStyles[size as keyof typeof sizeStyles]} ${disabled ? 'opacity-50' : ''} ${className}`}
        >
            {loading ? (
                <ActivityIndicator color="white" size="small" />
            ) : (
                <StyledText
                    className={`font-bold text-white text-center ${textSizeStyles[size as keyof typeof textSizeStyles]} ${textClassName}`}
                >
                    {title}
                </StyledText>
            )}
        </StyledPressable>
    );
}
