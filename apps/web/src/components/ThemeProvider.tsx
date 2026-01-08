'use client';

import { useEffect, type ReactNode } from 'react';
import { useUIStore } from '@/stores/ui-store';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const theme = useUIStore((s) => s.theme);

    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else if (theme === 'light') {
            root.classList.remove('dark');
        } else {
            // System preference
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', isDark);

            // Listen for system changes
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handler = (e: MediaQueryListEvent) => {
                root.classList.toggle('dark', e.matches);
            };
            mediaQuery.addEventListener('change', handler);
            return () => mediaQuery.removeEventListener('change', handler);
        }
    }, [theme]);

    return <>{children}</>;
}
