'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@fluently/ui';
import { useAuth } from '@/hooks';
import { Loader2, Mail, Lock, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login.mutateAsync({ email, password });
        } catch (err: unknown) {
            const error = err as { response?: { data?: { error?: string } } };
            setError(error.response?.data?.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 py-20 relative overflow-y-auto">
            <ThemeToggle className="absolute top-4 right-4" />
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                        <img src="/brand.svg" alt="Fluently Logo" className="w-full h-full" />
                    </div>
                    <CardTitle className="text-2xl">Welcome back</CardTitle>
                    <p className="text-muted-foreground text-sm mt-2">
                        Sign in to continue your learning journey
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                                {error}
                            </div>
                        )}

                        <Input
                            type="email"
                            label="Email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={login.isPending}
                        >
                            {login.isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-primary hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>

                    {/* Demo account hint */}
                    <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
                        <p className="font-medium mb-1">Demo Account:</p>
                        <p className="text-muted-foreground">
                            Email: demo@fluently.app<br />
                            Password: demo1234
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
