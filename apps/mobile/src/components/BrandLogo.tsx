import React from 'react';
import Svg, { Rect, Path, Circle } from 'react-native-svg';

interface BrandLogoProps {
    size?: number;
}

export function BrandLogo({ size = 80 }: BrandLogoProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 80 80">
            <Rect x="8" y="8" width="64" height="64" rx="18" fill="#0B1220" />
            <Path
                d="M22 42 C28 28, 36 28, 40 42 C44 56, 52 56, 58 42"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="round"
            />
            <Circle cx="40" cy="22" r="3" fill="#FFFFFF" />
        </Svg>
    );
}

export default BrandLogo;
