
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
        <div className="relative flex items-center justify-center w-56 h-56 md:w-80 md:h-80 transition-all duration-700">
            {/* Deep Ambient Glow */}
            <div
                className={`absolute rounded-full opacity-30 blur-[80px] md:blur-[120px] transition-all duration-1000 ${colorClass}`}
                style={{
                    width: `${150 * scale}%`,
                    height: `${150 * scale}%`,
                }}
            />

            {/* Core Orb */}
            <div
                className={`relative w-40 h-40 md:w-56 md:h-56 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-75 flex items-center justify-center ${colorClass}`}
                style={{
                    transform: `scale(${scale})`
                }}
            >
                <div className={`absolute inset-0 rounded-full blur-md opacity-60 ${pulseColor}`} />
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
