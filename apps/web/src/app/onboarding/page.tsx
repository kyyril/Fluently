'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@fluently/ui';
import { useAuth, useUser } from '@/hooks';
import { Loader2, BookOpen, Sprout, Leaf, TreeDeciduous } from 'lucide-react';


const LEVELS = [
    { id: 'BEGINNER', name: 'Beginner', desc: 'Just starting to learn English', icon: <Sprout className="w-10 h-10" /> },
    { id: 'INTERMEDIATE', name: 'Intermediate', desc: 'Can hold basic conversations', icon: <Leaf className="w-10 h-10" /> },
    { id: 'ADVANCED', name: 'Advanced', desc: 'Near-fluent, refining skills', icon: <TreeDeciduous className="w-10 h-10" /> },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { data: user, isLoading, isError } = useUser();
    const { onboarding } = useAuth();

    const [step, setStep] = useState(1);
    const [level, setLevel] = useState('BEGINNER');
    const [nativeLanguage, setNativeLanguage] = useState('Indonesian');
    const [country, setCountry] = useState('Indonesia');

    useEffect(() => {
        if (!isLoading && (isError || (!user && typeof window !== 'undefined' && !localStorage.getItem('fluently-token')))) {
            router.push('/auth/sign-in');
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
        onboarding.mutate({
            nativeLanguage,
            targetLanguage: 'English',
            country,
            level: level as any
        });
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 py-12 relative overflow-y-auto">

            <div className="w-full max-w-xl">
                <Card className="border-none shadow-2xl">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center bg-primary/10 rounded-3xl">
                            <BookOpen className="w-10 h-10 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-black">
                            {isLoading ? (
                                <div className="h-9 w-64 bg-muted animate-shimmer rounded mx-auto" />
                            ) : step === 1 ? (
                                "Where are you from?"
                            ) : (
                                "What's your English level?"
                            )}
                        </CardTitle>
                        {!isLoading && (
                            <p className="text-muted-foreground mt-2">
                                {step === 1
                                    ? "Tell us a bit about your background."
                                    : "Help us personalize your learning experience."}
                            </p>
                        )}
                    </CardHeader>
                    <CardContent className="p-6">
                        {isLoading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-24 bg-muted animate-shimmer rounded-xl" />
                                ))}
                            </div>
                        ) : step === 1 ? (
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Native Language</label>
                                    <select
                                        value={nativeLanguage}
                                        onChange={(e) => setNativeLanguage(e.target.value)}
                                        className="w-full h-14 px-4 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary font-bold text-lg"
                                    >
                                        {['Indonesian', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean', 'Portuguese', 'Russian', 'Arabic', 'Hindi'].sort().map(lang => (
                                            <option key={lang} value={lang}>{lang}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Country</label>
                                    <select
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="w-full h-14 px-4 rounded-xl bg-muted/50 border-none focus:ring-2 focus:ring-primary font-bold text-lg"
                                    >
                                        {['Indonesia', 'Malaysia', 'Singapore', 'Thailand', 'Philippines', 'Vietnam', 'Japan', 'South Korea', 'China', 'United States', 'United Kingdom', 'Brazil', 'Mexico', 'Spain', 'Germany', 'France'].sort().map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="pt-6">
                                    <Button className="w-full h-14 text-lg font-bold" onClick={nextStep}>
                                        Next Step
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {LEVELS.map((l) => (
                                    <button
                                        key={l.id}
                                        onClick={() => setLevel(l.id)}
                                        className={`
                                            w-full p-6 rounded-2xl  text-left flex items-center gap-6 group
                                            ${level === l.id
                                                ? 'bg-primary/10 shadow-xl shadow-primary/10 scale-[1.02]'
                                                : 'bg-muted/30 hover:bg-muted/50'}
                                        `}
                                    >
                                        <span className={`text-4xl   ${level === l.id ? 'scale-125' : 'group-hover:scale-110'}`}>
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

                                <div className="pt-6 flex gap-3">
                                    <Button variant="ghost" className="h-14 px-8 font-bold" onClick={prevStep}>
                                        Back
                                    </Button>
                                    <Button
                                        className="flex-1 h-14 text-lg font-bold"
                                        onClick={handleComplete}
                                        disabled={onboarding.isPending}
                                    >
                                        {onboarding.isPending ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                                Setting up...
                                            </>
                                        ) : (
                                            'Start Learning English'
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
