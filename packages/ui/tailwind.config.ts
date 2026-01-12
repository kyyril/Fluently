import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        '../../apps/web/src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // Primary
                primary: {
                    DEFAULT: 'hsl(var(--color-primary))',
                    foreground: 'hsl(var(--color-primary-foreground))',
                },
                // Secondary
                secondary: {
                    DEFAULT: 'hsl(var(--color-secondary))',
                    foreground: 'hsl(var(--color-secondary-foreground))',
                },
                // Background & Foreground
                background: 'hsl(var(--color-background))',
                foreground: 'hsl(var(--color-foreground))',
                // Surface (Cards, Inputs)
                surface: {
                    DEFAULT: 'hsl(var(--color-surface))',
                    foreground: 'hsl(var(--color-surface-foreground))',
                },
                // Muted
                muted: {
                    DEFAULT: 'hsl(var(--color-muted))',
                    foreground: 'hsl(var(--color-muted-foreground))',
                },
                // Accent
                accent: {
                    DEFAULT: 'hsl(var(--color-accent))',
                    foreground: 'hsl(var(--color-accent-foreground))',
                },
                // Destructive
                destructive: {
                    DEFAULT: 'hsl(var(--color-destructive))',
                    foreground: 'hsl(var(--color-destructive-foreground))',
                },
                // Border & Ring
                border: 'hsl(var(--color-border))',
                ring: 'hsl(var(--color-ring))',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '1' },
                },
                'fade-in-up': {
                    '0%': { opacity: '1', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.95)' },
                    '100%': { transform: 'scale(1)' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(20px)' },
                    '100%': { transform: 'translateY(0)' },
                },
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.2s ease-out',
                'fade-in-up': 'fade-in-up 0.3s ease-out',
                'scale-in': 'scale-in 0.2s ease-out',
                'slide-up': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                shimmer: 'shimmer 1.5s infinite',
            },
        },
    },
    plugins: [],
};

export default config;
