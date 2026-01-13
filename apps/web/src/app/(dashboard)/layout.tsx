'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser, useAuth } from '@/hooks';
import { Button } from '@fluently/ui';
import {
    Home,
    Trophy,
    User,
    LogOut,
    Flame,
    Star,
    ShieldCheck,
    BookOpen
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import Image from 'next/image';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { data: user, isLoading, isError } = useUser();
    const { logout } = useAuth();

    // Auth redirect (client side only)
    useEffect(() => {
        if (!isLoading && isError) {
            router.push('/auth/sign-in');
        }

        // Redirect to onboarding if level not set (simplified onboarding)
        if (!isLoading && user && !user.level && user.role !== 'ADMIN') {
            router.push('/onboarding');
        }

        // Redirect admins to admin area
        if (!isLoading && user?.role === 'ADMIN' && !pathname.startsWith('/admin')) {
            router.push('/admin');
        }
    }, [isLoading, isError, user, router, pathname]);

    const navItems = [
        { href: '/dashboard', label: 'Home', icon: Home },
        { href: '/dashboard/articles', label: 'Articles', icon: BookOpen },
        { href: '/dashboard/leaderboard', label: 'Leaderboard', icon: Trophy },
        { href: '/dashboard/profile', label: 'Profile', icon: User },
    ];

    if (user?.role === 'ADMIN') {
        navItems.push({ href: '/admin', label: 'Admin', icon: ShieldCheck });
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Top Header */}
            <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg">
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
                                <div className="h-4 w-6 animate-shimmer rounded" />
                            ) : (
                                <span className="font-bold">{user?.currentStreak || 0}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-sm px-3 py-1.5 bg-yellow-500/10 rounded-full text-yellow-600 dark:text-yellow-400">
                            <Star className="h-4 w-4" />
                            {isLoading ? (
                                <div className="h-4 w-10 animate-shimmer rounded" />
                            ) : (
                                <span className="font-bold">{user?.totalXp?.toLocaleString() || 0}</span>
                            )}
                        </div>
                    </div>

                    {/* Right side Actions */}
                    <div className="flex items-center gap-2 pl-4">
                        <ThemeToggle />
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

            {/* Main content */}
            <main className="flex-1 pb-32">
                {children}
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl sm:max-w-md sm:mx-auto sm:bottom-6 sm:rounded-2xl sm:shadow-2xl">
                <div className="flex items-center justify-around h-20 px-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex flex-col items-center justify-center gap-1 w-20 h-full transition-all duration-300 relative
                                    ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
                                `}
                            >
                                <div className={`
                                    p-2 rounded-xl transition-all duration-300
                                    ${isActive ? 'bg-primary/10' : 'bg-transparent'}
                                `}>
                                    <Icon className={`h-6 w-6 ${isActive ? 'scale-110' : ''}`} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                                {isActive && (
                                    <div className="absolute bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
