'use client';

import { authClient } from '@/lib/auth-client';
import { Button } from '@fluently/ui';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useUser } from '@/hooks';

export default function AuthPage() {
    const { data: session, isPending } = authClient.useSession();
    const { data: user, isLoading: isUserLoading } = useUser();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        if (mounted && !isPending && session?.user && !isUserLoading && user) {
            console.log('[AuthPage] Valid user found, role:', user.role);
            if (user.role === 'ADMIN') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        }
    }, [session, isPending, user, isUserLoading, router, mounted]);

    const handleClearSession = async () => {
        await authClient.signOut();
        window.location.reload();
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/dashboard'
            });
        } catch (error) {
            console.error('Google login failed:', error);
            setIsLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px]" />

            <div className="w-full max-w-[400px] z-10 -up">
                <div className="bg-surface/40 backdrop-blur-xl border border-border/50 p-8 rounded-3xl shadow-2xl text-center space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter">Welcome back</h1>
                        <p className="text-muted-foreground">Sign in to continue your language journey</p>
                    </div>

                    <Button
                        size="lg"
                        className="w-full h-14 text-lg font-semibold bg-white text-black hover:bg-neutral-200 border-none"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <img src="/google.svg" alt="Google" className="mr-3 h-5 w-5" />
                        )}
                        Continue with Google
                    </Button>

                    <p className="text-xs text-muted-foreground">
                        By signing in, you agree to our Terms and Conditions and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
}
