import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface IconProps {
    size?: number;
    color?: string;
}

export function TrendingUpIcon({ size = 24, color = "currentColor" }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="m22 7-8.5 8.5-5-5L2 17" />
            <Path d="M16 7h6v6" />
        </Svg>
    );
}

export function TrophyIcon({ size = 24, color = "currentColor" }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <Path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <Path d="M4 22h16" />
            <Path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <Path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <Path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </Svg>
    );
}

export function MedalIcon({ size = 24, color = "currentColor" }: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
            <Path d="M11 12 5.12 2" />
            <Path d="m13 12 5.88-10" />
            <Path d="M8 7h8" />
            <Circle cx="12" cy="17" r="5" />
            <Path d="M12 18v-2h-.5" />
        </Svg>
    );
}
