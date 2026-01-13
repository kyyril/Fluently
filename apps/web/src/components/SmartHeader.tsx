'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useUser, useAuth } from '@/hooks';
import { Button } from '@fluently/ui';
import { Flame, Star, LogOut } from 'lucide-react';
import Image from 'next/image';

export function SmartHeader() {
    const { data: user, isLoading } = useUser();
    const { logout } = useAuth();
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show header if scrolling up or at the top
            if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                // Hide header if scrolling down and past the top threshold
                setIsVisible(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 bg-surface/80 backdrop-blur-lg   ${isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="font-bold text-xl text-primary flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm">
                            <Image
                                src="/brand.svg"
                                alt="Fluently"
                                fill
                                priority
                                className="object-contain"
                            />
                        </div>
                        <span>Fluently</span>
                    </Link>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-2 text-sm px-3 py-1.5 bg-orange-500/10 rounded-full text-orange-600 dark:text-orange-400">
                        <Flame className="h-4 w-4" />
                        {isLoading ? (
                            <div className="h-4 w-6 bg-muted animate-shimmer rounded" />
                        ) : (
                            <span className="font-bold">{user?.currentStreak || 0}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-sm px-3 py-1.5 bg-yellow-500/10 rounded-full text-yellow-600 dark:text-yellow-400">
                        <Star className="h-4 w-4" />
                        {isLoading ? (
                            <div className="h-4 w-10 bg-muted animate-shimmer rounded" />
                        ) : (
                            <span className="font-bold">{user?.totalXp?.toLocaleString() || 0}</span>
                        )}
                    </div>
                </div>

                {/* Right side Actions */}
                <div className="flex items-center gap-2 pl-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={logout}
                        title="Sign Out"
                        className="hidden sm:inline-flex"
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
