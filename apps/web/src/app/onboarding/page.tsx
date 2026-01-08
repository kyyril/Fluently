'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@fluently/ui';
import { useAuth, useUser } from '@/hooks';
import { Languages, Target, Gauge, Sparkles, Loader2 } from 'lucide-react';

const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
];

const LEVELS = [
    { id: 'BEGINNER', name: 'Beginner', desc: 'Just starting out', icon: '🌱' },
    { id: 'INTERMEDIATE', name: 'Intermediate', desc: 'Can hold basics', icon: '🌿' },
    { id: 'ADVANCED', name: 'Advanced', desc: 'Fluent speaker', icon: '🌳' },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { data: user, isLoading, isError } = useUser();
    const { onboarding } = useAuth();
    const [step, setStep] = useState(1);
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [level, setLevel] = useState('BEGINNER');

    useEffect(() => {
        if (!isLoading && (isError || (!user && typeof window !== 'undefined' && !localStorage.getItem('fluently-token')))) {
            router.push('/login');
        }

        // If already onboarded, go to dashboard
        if (!isLoading && user && user.nativeLanguage && user.targetLanguage) {
            router.push('/dashboard');
        }
    }, [isLoading, isError, user, router]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user && !isLoading) return null;

    // We need an onboarding specific mutation in useAuth or useUser
    // I will add it to useAuth for now.

    const handleComplete = () => {
        onboarding.mutate({ nativeLanguage, targetLanguage, level: level as any });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
            <div className="w-full max-w-2xl">
                {/* Progress Dots */}
                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`h-2 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-primary' : 'w-2 bg-muted'
                                }`}
                        />
                    ))}
                </div>

                <Card className="border-none shadow-2xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-black">
                            {step === 1 && "What's your native language?"}
                            {step === 2 && "Which language are you learning?"}
                            {step === 3 && "What's your current level?"}
                        </CardTitle>
                        <p className="text-muted-foreground">
                            Help us personalize your learning experience.
                        </p>
                    </CardHeader>
                    <CardContent className="p-6">
                        {step === 1 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => { setNativeLanguage(lang.code); setStep(2); }}
                                        className={`
                      p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3
                      ${nativeLanguage === lang.code ? 'border-primary bg-primary/5' : 'border-transparent bg-muted hover:bg-muted/80'}
                    `}
                                    >
                                        <span className="text-2xl">{lang.flag}</span>
                                        <span className="font-medium">{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => { setTargetLanguage(lang.code); setStep(3); }}
                                        className={`
                      p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3
                      ${targetLanguage === lang.code ? 'border-primary bg-primary/5' : 'border-transparent bg-muted hover:bg-muted/80'}
                    `}
                                    >
                                        <span className="text-2xl">{lang.flag}</span>
                                        <span className="font-medium">{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-3">
                                {LEVELS.map((l) => (
                                    <button
                                        key={l.id}
                                        onClick={() => setLevel(l.id)}
                                        className={`
                      w-full p-6 rounded-xl border-2 transition-all text-left flex items-center gap-6
                      ${level === l.id ? 'border-primary bg-primary/5 font-bold' : 'border-transparent bg-muted hover:bg-muted/80'}
                    `}
                                    >
                                        <span className="text-4xl">{l.icon}</span>
                                        <div>
                                            <div className="text-lg font-bold">{l.name}</div>
                                            <div className="text-muted-foreground text-sm">{l.desc}</div>
                                        </div>
                                    </button>
                                ))}

                                <div className="pt-6 flex gap-3">
                                    <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                                    <Button
                                        className="flex-1 h-12"
                                        onClick={handleComplete}
                                        disabled={onboarding.isPending}
                                    >
                                        {onboarding.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                        Finish Onboarding
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
