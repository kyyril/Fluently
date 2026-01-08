'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    Menu,
    X,
} from 'lucide-react';
import { useUIStore } from '@/stores';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { data: user, isLoading, isError } = useUser();
    const { logout } = useAuth();
    const { sidebarOpen, toggleSidebar } = useUIStore();

    // No full-page loader. Main layout renders immediately.

    // Auth redirect (client side only)
    useEffect(() => {
        if (!isLoading && isError) {
            router.push('/login');
        }

        // Redirect to onboarding if not completed
        if (!isLoading && user && (!user.targetLanguage || !user.nativeLanguage)) {
            router.push('/onboarding');
        }
    }, [isLoading, isError, user, router]);

    return (
        <div className="min-h-screen bg-background">
            {/* Top Header */}
            <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            className="lg:hidden"
                        >
                            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                        <Link href="/dashboard" className="font-bold text-xl text-primary">
                            Fluently
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="hidden sm:flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm">
                            <Flame className={`h-5 w-5 ${isLoading ? 'text-muted' : 'text-orange-500'}`} />
                            {isLoading ? (
                                <div className="h-4 w-8 animate-shimmer rounded" />
                            ) : (
                                <span className="font-bold">{user?.currentStreak || 0}</span>
                            )}
                            <span className="text-muted-foreground">day streak</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full">
                            <Star className={`h-4 w-4 ${isLoading ? 'text-muted' : 'text-yellow-500'}`} />
                            {isLoading ? (
                                <div className="h-4 w-12 animate-shimmer rounded" />
                            ) : (
                                <span className="font-bold">{user?.totalXp?.toLocaleString() || 0}</span>
                            )}
                            <span className="text-muted-foreground">XP</span>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-border">
                        {isLoading ? (
                            <div className="h-4 w-24 animate-shimmer rounded hidden md:block" />
                        ) : (
                            <div className="hidden md:block text-right">
                                <div className="text-sm font-bold">{user?.displayName}</div>
                                <div className="text-xs text-muted-foreground">{user?.level}</div>
                            </div>
                        )}<Button variant="ghost" size="icon" onClick={logout}>
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`
            fixed lg:static inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border
            transform transition-transform duration-200 ease-in-out pt-16 lg:pt-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
                >
                    <nav className="p-4 space-y-2">
                        <NavLink href="/dashboard" icon={Home}>
                            Dashboard
                        </NavLink>
                        <NavLink href="/dashboard/leaderboard" icon={Trophy}>
                            Leaderboard
                        </NavLink>
                        <NavLink href="/dashboard/profile" icon={User}>
                            Profile
                        </NavLink>
                    </nav>

                    {/* Mobile stats */}
                    <div className="sm:hidden p-4 border-t border-border">
                        <div className="flex items-center gap-3 mb-3">
                            <Flame className={`h-5 w-5 ${isLoading ? 'text-muted' : 'text-orange-500'}`} />
                            {isLoading ? (
                                <div className="h-5 w-24 animate-shimmer rounded" />
                            ) : (
                                <span className="font-semibold">{user?.currentStreak} day streak</span>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <Star className={`h-5 w-5 ${isLoading ? 'text-muted' : 'text-yellow-500'}`} />
                            {isLoading ? (
                                <div className="h-5 w-20 animate-shimmer rounded" />
                            ) : (
                                <span className="font-semibold">{user?.totalXp?.toLocaleString()} XP</span>
                            )}
                        </div>
                    </div>
                </aside>

                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                        onClick={toggleSidebar}
                    />
                )}

                {/* Main content */}
                <main className="flex-1 min-h-[calc(100vh-4rem)]">{children}</main>
            </div>
        </div>
    );
}

function NavLink({
    href,
    icon: Icon,
    children,
}: {
    href: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
            <Icon className="h-5 w-5" />
            <span>{children}</span>
        </Link>
    );
}
