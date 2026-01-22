import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingScreenProps {
    message?: string;
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps): JSX.Element {
    return (
        <View className="flex-1 bg-black items-center justify-center">
            <ActivityIndicator size="large" color="#6366f1" />
            <Text className="text-zinc-400 font-bold mt-4">{message}</Text>
        </View>
    );
}

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    message?: string;
    action?: React.ReactNode;
}

export function EmptyState({ icon, title, message, action }: EmptyStateProps): JSX.Element {
    return (
        <View className="flex-1 items-center justify-center py-20 px-10">
            {icon && (
                <View className="mb-4">
                    {icon}
                </View>
            )}
            <Text className="text-white text-lg font-bold text-center">{title}</Text>
            {message && (
                <Text className="text-zinc-500 text-sm text-center mt-2">{message}</Text>
            )}
            {action && (
                <View className="mt-6">
                    {action}
                </View>
            )}
        </View>
    );
}

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export function ErrorState({
    title = 'Something went wrong',
    message = 'Please try again later',
    onRetry
}: ErrorStateProps): JSX.Element {
    return (
        <View className="flex-1 items-center justify-center py-20 px-10">
            <View className="w-16 h-16 bg-red-500/10 rounded-full items-center justify-center mb-4">
                <Text className="text-red-500 text-3xl">!</Text>
            </View>
            <Text className="text-white text-lg font-bold text-center">{title}</Text>
            <Text className="text-zinc-500 text-sm text-center mt-2">{message}</Text>
            {onRetry && (
                <View className="mt-6">
                    <Text
                        className="text-indigo-500 font-bold"
                        onPress={onRetry}
                    >
                        Try Again
                    </Text>
                </View>
            )}
        </View>
    );
}
