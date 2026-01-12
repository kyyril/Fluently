'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@fluently/ui';
import { useAuth, useUser } from '@/hooks';
import { Loader2, BookOpen } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const LEVELS = [
    { id: 'BEGINNER', name: 'Beginner', desc: 'Just starting to learn English', icon: '🌱' },
    { id: 'INTERMEDIATE', name: 'Intermediate', desc: 'Can hold basic conversations', icon: '🌿' },
    { id: 'ADVANCED', name: 'Advanced', desc: 'Near-fluent, refining skills', icon: '🌳' },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { data: user, isLoading, isError } = useUser();
    const { onboarding } = useAuth();
    const [level, setLevel] = useState('BEGINNER');

    useEffect(() => {
        if (!isLoading && (isError || (!user && typeof window !== 'undefined' && !localStorage.getItem('fluently-token')))) {
            router.push('/login');
        }

        // If admin, go to admin dashboard
        if (!isLoading && user?.role === 'ADMIN') {
            router.push('/admin');
            return;
        }

        // If already onboarded, go to dashboard
        if (!isLoading && user && user.level) {
            router.push('/dashboard');
        }
    }, [isLoading, isError, user, router]);

    const handleComplete = () => {
        // English is the only target language, set defaults
        onboarding.mutate({
            nativeLanguage: 'Indonesian',
            targetLanguage: 'English',
            country: 'Indonesia',
            level: level as any
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 py-12 relative overflow-y-auto">
            <ThemeToggle className="absolute top-4 right-4" />
            <div className="w-full max-w-xl">
                <Card className="border-none shadow-2xl">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center bg-primary/10 rounded-3xl">
                            <BookOpen className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-black">
                            {isLoading ? (
                                <div className="h-9 w-64 animate-shimmer rounded mx-auto" />
                            ) : (
                                "What's your English level?"
                            )}
                        </CardTitle>
                        {isLoading ? (
                            <div className="h-5 w-48 bg-muted animate-shimmer rounded mx-auto mt-2" />
                        ) : (
                            <p className="text-muted-foreground mt-2">
                                Help us personalize your learning experience.
                            </p>
                        )}
                    </CardHeader>
                    <CardContent className="p-6">
                        {isLoading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-24 animate-shimmer rounded-xl" />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {LEVELS.map((l) => (
                                    <button
                                        key={l.id}
                                        onClick={() => setLevel(l.id)}
                                        className={`
                                            w-full p-6 rounded-2xl transition-all text-left flex items-center gap-6 group
                                            ${level === l.id
                                                ? 'bg-primary/10 shadow-xl shadow-primary/10 scale-[1.02]'
                                                : 'bg-muted/30 hover:bg-muted/50'}
                                        `}
                                    >
                                        <span className={`text-4xl transition-transform duration-300 ${level === l.id ? 'scale-125' : 'group-hover:scale-110'}`}>
                                            {l.icon}
                                        </span>
                                        <div>
                                            <div className={`text-lg font-bold ${level === l.id ? 'text-primary' : ''}`}>
                                                {l.name}
                                            </div>
                                            <div className="text-muted-foreground text-sm">{l.desc}</div>
                                        </div>
                                    </button>
                                ))}

                                <div className="pt-6">
                                    <Button
                                        className="w-full h-14 text-lg font-bold"
                                        onClick={handleComplete}
                                        disabled={onboarding.isPending}
                                    >
                                        {onboarding.isPending ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                                Setting up...
                                            </>
                                        ) : (
                                            'Start Learning English 🚀'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <p className="text-center text-muted-foreground text-sm mt-6">
                    Fluently is designed to help you master English through daily practice.
                </p>
            </div>
        </div>
    );
}
