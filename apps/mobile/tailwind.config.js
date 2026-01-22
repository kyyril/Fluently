/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--color-background))',
                foreground: 'hsl(var(--color-foreground))',
                primary: 'hsl(var(--color-primary))',
                secondary: 'hsl(var(--color-secondary))',
                surface: 'hsl(var(--color-surface))',
                muted: 'hsl(var(--color-muted))',
                accent: 'hsl(var(--color-accent))',
                // Task-specific colors
                task: {
                    podcast: '#3b82f6',
                    speaking: '#a855f7',
                    sentences: '#f97316',
                    recap: '#22c55e',
                },
            },
            fontFamily: {
                sans: ['system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
