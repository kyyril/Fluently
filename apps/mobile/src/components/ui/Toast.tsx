import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react-native';
import { useToastStore } from '@/stores/toastStore';

const TOAST_COLORS = {
    success: {
        bg: 'bg-green-900/90',
        border: 'border-green-700',
        icon: '#22c55e',
    },
    error: {
        bg: 'bg-red-900/90',
        border: 'border-red-700',
        icon: '#ef4444',
    },
    info: {
        bg: 'bg-blue-900/90',
        border: 'border-blue-700',
        icon: '#3b82f6',
    },
    warning: {
        bg: 'bg-yellow-900/90',
        border: 'border-yellow-700',
        icon: '#eab308',
    },
};

const TOAST_ICONS = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertCircle,
};

interface ToastItemProps {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message?: string;
    onDismiss: () => void;
}

function ToastItem({ id, type, title, message, onDismiss }: ToastItemProps): JSX.Element {
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const Icon = TOAST_ICONS[type];
    const colors = TOAST_COLORS[type];

    useEffect(() => {
        Animated.parallel([
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                tension: 100,
                friction: 10,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleDismiss = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => onDismiss());
    };

    return (
        <Animated.View
            style={{
                transform: [{ translateY }],
                opacity,
            }}
            className={`mx-4 mb-2 p-4 rounded-2xl ${colors.bg} border ${colors.border} flex-row items-start`}
        >
            <Icon size={20} color={colors.icon} />
            <View className="flex-1 ml-3">
                <Text className="text-white font-bold">{title}</Text>
                {message && (
                    <Text className="text-zinc-300 text-sm mt-0.5">{message}</Text>
                )}
            </View>
            <Pressable onPress={handleDismiss} className="ml-2">
                <X size={18} color="#71717a" />
            </Pressable>
        </Animated.View>
    );
}

export function ToastContainer(): JSX.Element | null {
    const { toasts, removeToast } = useToastStore();

    if (toasts.length === 0) return null;

    return (
        <View className="absolute top-16 left-0 right-0 z-50">
            {toasts.map((toast) => (
                <ToastItem
                    key={toast.id}
                    {...toast}
                    onDismiss={() => removeToast(toast.id)}
                />
            ))}
        </View>
    );
}
