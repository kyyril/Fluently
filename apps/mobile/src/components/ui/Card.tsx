import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onPress?: () => void;
}

export function Card({ children, className = '', onPress }: CardProps): JSX.Element {
    const Component = onPress ? StyledPressable : StyledView;
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
        <StyledView className={`mb-4 ${className}`}>
            <StyledText className="text-white text-xl font-black">{title}</StyledText>
            {subtitle && (
                <StyledText className="text-zinc-400 text-xs font-medium uppercase tracking-widest mt-1">
                    {subtitle}
                </StyledText>
            )}
        </StyledView>
    );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }): JSX.Element {
    return <StyledView className={className}>{children}</StyledView>;
}
