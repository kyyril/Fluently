'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser, useAuth } from '@/hooks';
import { Button } from '@fluently/ui';
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    BookOpen
} from 'lucide-react';

import { useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { data: user, isLoading, isError } = useUser();
    const { logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Security check
    useEffect(() => {
        if (!isLoading) {
            if (isError || !user) {
                router.push('/auth/sign-in');
            } else if (user.role !== 'ADMIN') {
                router.push('/dashboard');
            }
        }
    }, [user, isLoading, isError, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (user?.role !== 'ADMIN') return null;

    const navItems = [
        { href: '/admin', label: 'Overview', icon: LayoutDashboard },
        { href: '/admin/users', label: 'User Management', icon: Users },
        { href: '/admin/articles', label: 'Articles', icon: BookOpen },
        { href: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border   -out lg:relative lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="h-16 flex items-center justify-between px-6 border-b border-border">
                        <Link href="/admin" className="font-bold text-xl text-primary flex items-center gap-2">
                            <img src="/brand.svg" alt="Fluently" className="w-8 h-8" />
                            <span>Fluently <span className="text-[10px] bg-primary/10 px-1.5 py-0.5 rounded text-primary">ADMIN</span></span>
                        </Link>
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-lg   group
                                        ${isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'hover:bg-primary/5 text-muted-foreground hover:text-foreground'}
                                    `}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-border space-y-4">
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-primary ">
                            <ArrowLeft className="h-4 w-4" />
                            Back to App
                        </Link>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/5" onClick={logout}>
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navbar */}
                <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-border sticky top-0 z-40 px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                            <Menu className="h-5 w-5" />
                        </Button>
                        <h2 className="text-lg font-bold hidden sm:block">
                            {navItems.find(item => pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)))?.label || 'Dashboard'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">

                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
                        </Button>
                        <div className="flex items-center gap-3 pl-4 border-l border-border">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                                {user?.displayName.charAt(0)}
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-bold leading-none">{user?.displayName}</p>
                                <p className="text-[10px] text-muted-foreground leading-tight mt-1">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

// Add ArrowLeft icon to lucide-react import
import { ArrowLeft } from 'lucide-react';
