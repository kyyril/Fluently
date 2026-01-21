
import React from 'react';

interface VoiceOrbProps {
    volume: number; // 0 to 1
    state: 'idle' | 'listening' | 'speaking' | 'connecting' | 'error' | 'completing';
}

export const VoiceOrb: React.FC<VoiceOrbProps> = ({ volume, state }) => {
    // Base scale
    const scale = 1 + Math.min(volume * 2, 1.5);

    let colorClass = 'bg-blue-500';
    let pulseColor = 'bg-blue-400';

    switch (state) {
        case 'idle':
            colorClass = 'bg-gray-500';
            pulseColor = 'bg-gray-400';
            break;
        case 'listening':
            colorClass = 'bg-white';
            pulseColor = 'bg-blue-100';
            break;
        case 'speaking':
            // Gemini speaking
            colorClass = 'bg-gradient-to-br from-blue-400 to-purple-500';
            pulseColor = 'bg-purple-300';
            break;
        case 'connecting':
            colorClass = 'bg-yellow-500';
            pulseColor = 'bg-yellow-300';
            break;
        case 'error':
            colorClass = 'bg-red-500';
            pulseColor = 'bg-red-300';
            break;
        case 'completing':
            colorClass = 'bg-green-500';
            pulseColor = 'bg-green-300';
            break;
    }

    return (
        <div className="relative flex items-center justify-center w-64 h-64">
            {/* Background Glow */}
            <div
                className={`absolute rounded-full opacity-20 blur-3xl transition-all duration-100 ${colorClass}`}
                style={{
                    width: `${100 * scale}%`,
                    height: `${100 * scale}%`,
                    maxWidth: '300px',
                    maxHeight: '300px'
                }}
            />

            {/* Core Orb */}
            <div
                className={`relative w-32 h-32 rounded-full shadow-2xl transition-all duration-75 flex items-center justify-center ${colorClass}`}
                style={{
                    transform: `scale(${scale})`
                }}
            >
                <div className={`absolute inset-0 rounded-full blur-sm opacity-50 ${pulseColor}`} />
            </div>

            {/* Status Text */}
            <div className="absolute -bottom-12 text-center">
                <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    {state === 'idle' && 'Ready'}
                    {state === 'connecting' && 'Connecting...'}
                    {state === 'listening' && 'Listening'}
                    {state === 'speaking' && 'Gemini'}
                    {state === 'error' && 'Error'}
                    {state === 'completing' && 'Completing Task...'}
                </p>
            </div>
        </div>
    );
};
