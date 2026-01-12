'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@fluently/ui';
import { useAuth, useUser } from '@/hooks';
import countries from 'world-countries';
import { Languages, Target, Gauge, Sparkles, Loader2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

// Derived from world-countries to ensure consistency
const ALL_LANGUAGES = (() => {
    const langMap = new Map<string, { name: string; flag: string; code: string }>();

    // Priority flags for common languages to avoid random ones
    const priorityFlags: Record<string, string> = {
        'English': '🇺🇸',
        'Spanish': '🇪🇸',
        'French': '🇫🇷',
        'German': '🇩🇪',
        'Italian': '🇮🇹',
        'Portuguese': '🇵🇹',
        'Japanese': '🇯🇵',
        'Korean': '🇰🇷',
        'Chinese': '🇨🇳',
        'Russian': '🇷🇺',
        'Arabic': '��',
        'Hindi': '🇮🇳',
        'Indonesian': '🇮🇩',
        'Turkish': '🇹🇷',
        'Dutch': '🇳🇱',
        'Polish': '🇵🇱',
        'Vietnamese': '🇻🇳',
        'Thai': '��',
    };

    countries.forEach(c => {
        if (c.languages) {
            Object.entries(c.languages).forEach(([code, name]) => {
                if (!langMap.has(name)) {
                    langMap.set(name, {
                        code,
                        name,
                        flag: priorityFlags[name] || c.flag
                    });
                }
            });
        }
    });

    return Array.from(langMap.values()).sort((a, b) => a.name.localeCompare(b.name));
})();

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
    const [country, setCountry] = useState('');
    const [countrySearch, setCountrySearch] = useState('');
    const [nativeLanguage, setNativeLanguage] = useState('');
    const [nativeSearch, setNativeSearch] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [targetSearch, setTargetSearch] = useState('');
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

    const handleComplete = () => {
        onboarding.mutate({ nativeLanguage, targetLanguage, country, level: level as any });
    };

    const sortedCountries = [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));
    const filteredCountries = sortedCountries.filter(c =>
        c.name.common.toLowerCase().includes(countrySearch.toLowerCase())
    ).slice(0, 15);

    const filteredNative = ALL_LANGUAGES.filter(l =>
        l.name.toLowerCase().includes(nativeSearch.toLowerCase())
    ).slice(0, 15);

    const filteredTarget = ALL_LANGUAGES.filter(l =>
        l.name.toLowerCase().includes(targetSearch.toLowerCase())
    ).slice(0, 15);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 py-12 relative overflow-y-auto">
            <ThemeToggle className="absolute top-4 right-4" />
            <div className="w-full max-w-2xl">
                {/* Progress Dots */}
                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={`h-2 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-primary' : 'w-2 bg-muted'}`}
                        />
                    ))}
                </div>

                <Card className="border-none shadow-2xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                            <img src="/brand.svg" alt="Fluently Logo" className="w-full h-full" />
                        </div>
                        <CardTitle className="text-3xl font-black">
                            {isLoading ? (
                                <div className="h-9 w-64 animate-shimmer rounded mx-auto" />
                            ) : (
                                <>
                                    {step === 1 && "Where are you from?"}
                                    {step === 2 && "What's your native language?"}
                                    {step === 3 && "Which language are you learning?"}
                                    {step === 4 && "What's your current level?"}
                                </>
                            )}
                        </CardTitle>
                        {isLoading ? (
                            <div className="h-5 w-48 bg-muted animate-shimmer rounded mx-auto mt-2" />
                        ) : (
                            <p className="text-muted-foreground">
                                Help us personalize your learning experience.
                            </p>
                        )}
                    </CardHeader>
                    <CardContent className="p-6">
                        {isLoading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="h-16 animate-shimmer rounded-xl" />
                                ))}
                            </div>
                        ) : (
                            <>
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <Input
                                            placeholder="Search your country..."
                                            value={countrySearch}
                                            onChange={(e) => setCountrySearch(e.target.value)}
                                            className="h-12 text-lg"
                                        />
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {filteredCountries.map((c) => (
                                                <button
                                                    key={c.cca2}
                                                    onClick={() => { setCountry(c.name.common); setStep(2); }}
                                                    className={`
                                                        p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3
                                                        ${country === c.name.common ? 'border-primary bg-primary/5' : 'border-transparent bg-muted hover:bg-muted/80'}
                                                    `}
                                                >
                                                    <span className="text-2xl">{c.flag}</span>
                                                    <span className="font-medium truncate text-sm">{c.name.common}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {filteredCountries.length === 0 && (
                                            <p className="text-center text-muted-foreground py-8 italic">No countries found for "{countrySearch}"</p>
                                        )}
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6">
                                        <Input
                                            placeholder="Search native language..."
                                            value={nativeSearch}
                                            onChange={(e) => setNativeSearch(e.target.value)}
                                            className="h-12 text-lg"
                                        />
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {filteredNative.map((lang) => (
                                                <button
                                                    key={lang.name}
                                                    onClick={() => { setNativeLanguage(lang.name); setStep(3); }}
                                                    className={`
                                                        p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3
                                                        ${nativeLanguage === lang.name ? 'border-primary bg-primary/5' : 'border-transparent bg-muted hover:bg-muted/80'}
                                                    `}
                                                >
                                                    <span className="text-2xl">{lang.flag}</span>
                                                    <span className="font-medium truncate text-sm">{lang.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {filteredNative.length === 0 && (
                                            <p className="text-center text-muted-foreground py-8 italic">No languages found for "{nativeSearch}"</p>
                                        )}
                                        <Button variant="ghost" className="w-full" onClick={() => setStep(1)}>Back to Country</Button>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6">
                                        <Input
                                            placeholder="Search target language..."
                                            value={targetSearch}
                                            onChange={(e) => setTargetSearch(e.target.value)}
                                            className="h-12 text-lg"
                                        />
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {filteredTarget.map((lang) => (
                                                <button
                                                    key={lang.name}
                                                    onClick={() => { setTargetLanguage(lang.name); setStep(4); }}
                                                    className={`
                                                        p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3
                                                        ${targetLanguage === lang.name ? 'border-primary bg-primary/5' : 'border-transparent bg-muted hover:bg-muted/80'}
                                                    `}
                                                >
                                                    <span className="text-2xl">{lang.flag}</span>
                                                    <span className="font-medium truncate text-sm">{lang.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                        {filteredTarget.length === 0 && (
                                            <p className="text-center text-muted-foreground py-8 italic">No languages found for "{targetSearch}"</p>
                                        )}
                                        <Button variant="ghost" className="w-full" onClick={() => setStep(2)}>Back to Native Language</Button>
                                    </div>
                                )}

                                {step === 4 && (
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
                                            <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>Back</Button>
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
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
