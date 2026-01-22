import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '@/stores/settingsStore';

export interface ButtonProps {
    onPress: () => void;
    title?: string;
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    textClassName?: string;
    icon?: React.ReactNode;
}


export function Button({
    onPress,
    title,
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className = '',
    textClassName = '',
    icon,
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
        <Pressable
            onPress={handlePress}
            disabled={disabled || loading}
            className={`flex-row items-center justify-center ${variantStyles[variant as keyof typeof variantStyles]} ${sizeStyles[size as keyof typeof sizeStyles]} ${disabled ? 'opacity-50' : ''} ${className}`}
        >
            {loading ? (
                <ActivityIndicator color="white" size="small" />
            ) : (
                <>
                    {icon && <View className="mr-2">{icon}</View>}
                    {children ? (
                        children
                    ) : (
                        <Text
                            className={`font-bold text-white text-center ${textSizeStyles[size as keyof typeof textSizeStyles]} ${textClassName}`}
                        >
                            {title}
                        </Text>
                    )}
                </>
            )}
        </Pressable>
    );
}

