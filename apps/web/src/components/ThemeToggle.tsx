'use client';

import { useUIStore } from '@/stores';
import { Button } from '@fluently/ui';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, toggleTheme } = useUIStore();
    const [mounted, setMounted] = useState(false);

    // Only render icons after mounting to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={`w-9 h-9 ${className}`} />;
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={className}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-yellow-500 transition-all hover:scale-110" />
            ) : (
                <Moon className="h-4 w-4 text-blue-600 transition-all hover:scale-110" />
            )}
        </Button>
    );
}
