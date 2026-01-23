import React from 'react';
import { Text } from 'react-native';

interface InteractiveTextProps {
    text: string;
    onWordClick: (word: string) => void;
    className?: string;
    textClassName?: string;
}

export const InteractiveText = ({ text, onWordClick, className, textClassName }: InteractiveTextProps) => {
    return (
        <Text className={className}>
            {text.split(/(\s+)/).map((part, index) => {
                if (/^\s+$/.test(part) || part === '') return part;

                return (
                    <Text
                        key={index}
                        onPress={() => onWordClick(part)}
                        className={`active:bg-indigo-500/40 rounded-sm ${textClassName}`}
                    >
                        {part}
                    </Text>
                );
            })}
        </Text>
    );
};
