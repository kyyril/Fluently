import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onPress?: () => void;
}

export function Card({ children, className = '', onPress }: CardProps): JSX.Element {
    const Component = onPress ? Pressable : View;
    return (
        <Component
            onPress={onPress}
            className={`bg-zinc-900 border border-zinc-800 rounded-3xl p-5 ${className}`}
        >
            {children}
        </Component>
    );
}


export function CardHeader({ title, subtitle, className = '' }: { title: string; subtitle?: string; className?: string }): JSX.Element {
    return (
        <View className={`mb-4 ${className}`}>
            <Text className="text-white text-xl font-black">{title}</Text>
            {subtitle && (
                <Text className="text-zinc-400 text-xs font-medium uppercase tracking-widest mt-1">
                    {subtitle}
                </Text>
            )}
        </View>
    );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }): JSX.Element {
    return <View className={className}>{children}</View>;
}
