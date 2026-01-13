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

        },
    },
    plugins: [],
};

export default config;
