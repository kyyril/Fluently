'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser, useAuth } from '@/hooks';

import {
    Home,
    Trophy,
    User,
    ShieldCheck,
    BookOpen
} from 'lucide-react';
import { SmartHeader } from '@/components/SmartHeader';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { data: user, isLoading, isError } = useUser();

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
            <SmartHeader />

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
                                    flex flex-col items-center justify-center gap-1 w-20 h-full   relative
                                    ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
                                `}
                            >
                                <div className={`
                                    p-2 rounded-xl  
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
