import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerClassName?: string;
}

export function Input({
    label,
    error,
    containerClassName = '',
    className = '',
    ...props
}: InputProps): JSX.Element {
    return (
        <View className={containerClassName}>
            {label && (
                <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                    {label}
                </Text>
            )}
            <TextInput
                placeholderTextColor="#52525b"
                className={`bg-zinc-950 border ${error ? 'border-red-500' : 'border-zinc-800'} text-white px-5 py-4 rounded-2xl font-bold ${className}`}
                {...props}
            />
            {error && (
                <Text className="text-red-500 text-xs font-bold mt-1 ml-1">{error}</Text>
            )}
        </View>
    );
}
