'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser, useAuth } from '@/hooks';
import { Loader2 } from 'lucide-react';

import {
    Home,
    Trophy,
    User,
    ShieldCheck,
    BookOpen,
} from 'lucide-react';
import { SmartHeader } from '@/components/SmartHeader';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { session, isLoading: isSessionLoading } = useAuth();
    const { data: user, isLoading: isUserLoading, isFetched } = useUser();

    // Auth redirect
    useEffect(() => {
        // Wait for session to load
        if (isSessionLoading) return;

        // No session = redirect to sign-in
        if (!session?.user) {
            router.replace('/auth/sign-in');
            return;
        }

        // Session exists, wait for user data
        if (!isFetched) return;

        // User loaded - check for redirects
        if (user) {
            if (!user.level && user.role !== 'ADMIN') {
                router.replace('/onboarding');
            } else if (user.role === 'ADMIN' && !pathname.startsWith('/admin')) {
                router.replace('/admin');
            }
        }
    }, [isSessionLoading, session, isFetched, user, router, pathname]);

    // Loading states
    if (isSessionLoading || !session?.user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isUserLoading || !isFetched) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading profile...</p>
                </div>
            </div>
        );
    }

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
            <SmartHeader />

            <main className="flex-1 pb-32">
                {children}
            </main>

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
                                    flex flex-col items-center justify-center gap-1 w-20 h-full relative
                                    ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
                                `}
                            >
                                <div className={`p-2 rounded-xl ${isActive ? 'bg-primary/10' : 'bg-transparent'}`}>
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
