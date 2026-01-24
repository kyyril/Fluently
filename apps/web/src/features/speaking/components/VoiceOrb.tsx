
import React from 'react';
import { Mic, Volume2, Loader2 } from 'lucide-react';

interface VoiceOrbProps {
    volume: number;
    state: 'idle' | 'listening' | 'speaking' | 'connecting' | 'error' | 'completing';
}

export const VoiceOrb: React.FC<VoiceOrbProps> = ({ volume, state }) => {
    const scale = 1 + Math.min(volume * 1.2, 0.8);
    const isActive = state === 'listening' || state === 'speaking' || state === 'connecting';

    const getColors = () => {
        switch (state) {
            case 'listening':
                return { bg: 'bg-blue-500', glow: 'rgba(59, 130, 246, 0.5)', ring: 'border-blue-400/30' };
            case 'speaking':
                return { bg: 'bg-gradient-to-br from-purple-500 to-pink-500', glow: 'rgba(168, 85, 247, 0.5)', ring: 'border-purple-400/30' };
            case 'connecting':
                return { bg: 'bg-amber-500', glow: 'rgba(245, 158, 11, 0.4)', ring: 'border-amber-400/30' };
            case 'error':
                return { bg: 'bg-red-500', glow: 'rgba(239, 68, 68, 0.5)', ring: 'border-red-400/30' };
            case 'completing':
                return { bg: 'bg-green-500', glow: 'rgba(34, 197, 94, 0.5)', ring: 'border-green-400/30' };
            default:
                return { bg: 'bg-zinc-700', glow: 'rgba(63, 63, 70, 0.3)', ring: 'border-zinc-600/20' };
        }
    };

    const colors = getColors();

    return (
        <div className="relative flex items-center justify-center w-72 h-72 md:w-96 md:h-96">
            {/* Decorative Rings */}
            <div
                className={`absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full border border-dashed ${colors.ring} opacity-20 animate-spin`}
                style={{ animationDuration: '30s' }}
            />
            <div
                className={`absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full border border-dashed ${colors.ring} opacity-10`}
                style={{ animation: 'spin 45s linear infinite reverse' }}
            />

            {/* Outer Glow Layers */}
            <div
                className={`absolute w-48 h-48 md:w-64 md:h-64 rounded-full blur-[80px] transition-all duration-300 ${colors.bg}`}
                style={{
                    transform: `scale(${scale * 1.5})`,
                    opacity: 0.25 + volume * 0.3
                }}
            />
            <div
                className={`absolute w-36 h-36 md:w-48 md:h-48 rounded-full blur-[50px] transition-all duration-200 ${colors.bg}`}
                style={{
                    transform: `scale(${scale * 1.2})`,
                    opacity: 0.35 + volume * 0.25
                }}
            />

            {/* Pulse Ring (active states only) */}
            {isActive && (
                <div
                    className={`absolute w-28 h-28 md:w-36 md:h-36 rounded-full ${colors.bg} animate-ping`}
                    style={{
                        opacity: 0.2,
                        animationDuration: '2s'
                    }}
                />
            )}

            {/* Core Orb */}
            <div
                className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full ${colors.bg} shadow-2xl transition-transform duration-100 flex items-center justify-center overflow-hidden`}
                style={{
                    transform: `scale(${scale})`,
                    boxShadow: `0 0 60px ${colors.glow}, 0 0 100px ${colors.glow}`
                }}
            >
                {/* Inner highlight */}
                <div className="absolute top-2 left-4 w-8 h-5 bg-white/30 rounded-full blur-sm rotate-[-20deg]" />

                {/* Core center */}
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${colors.bg} opacity-60`} />

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center text-white/90">
                    {state === 'listening' && <Mic className="w-8 h-8 md:w-10 md:h-10" />}
                    {state === 'speaking' && <Volume2 className="w-8 h-8 md:w-10 md:h-10" />}
                    {state === 'connecting' && <Loader2 className="w-8 h-8 md:w-10 md:h-10 animate-spin" />}
                </div>
            </div>

        </div>
    );
};
