import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = '' }: CardProps): JSX.Element {
    return (
        <StyledView className={`bg-zinc-900 border border-zinc-800 rounded-3xl p-5 ${className}`}>
            {children}
        </StyledView>
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
