import Link from 'next/link';
import { Button, Card, CardContent } from '@fluently/ui';
import { BookOpen, Trophy, Sparkles, ArrowRight } from 'lucide-react';

export default function HomePage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />

                <div className="relative container mx-auto px-4 py-20 sm:py-32">
                    <div className="max-w-3xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                            <Sparkles className="h-4 w-4" />
                            <span>Structure breeds fluency</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            Master Languages Through{' '}
                            <span className="text-primary">Daily Habits</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                            Build consistent language learning habits with our structured daily routine.
                            Track your progress, compete on leaderboards, and achieve fluency.
                        </p>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Start Learning Free
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-surface/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Your Daily Routine</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            A structured 6-step routine covering all language skills
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { icon: '🎧', title: 'Podcast Listening', desc: 'Start with immersive audio content' },
                            { icon: '📝', title: 'Article Transcription', desc: 'Improve writing through copying' },
                            { icon: '📚', title: 'Learn 25 Verbs', desc: 'Build vocabulary systematically' },
                            { icon: '🗣️', title: 'Speaking Session', desc: '45 minutes of active practice' },
                            { icon: '✍️', title: 'Create Sentences', desc: 'Apply new verbs in context' },
                            { icon: '📔', title: 'Day Recap Journal', desc: 'Reflect and get AI feedback' },
                        ].map((item, i) => (
                            <Card key={i} variant="interactive">
                                <CardContent className="pt-6">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gamification Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">
                                Compete & Earn Titles
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Stay motivated with our gamification system. Earn XP, maintain streaks,
                                climb the leaderboard, and unlock exclusive titles.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    '🌱 Seedling - First week completed',
                                    '🔥 On Fire - 7-day streak',
                                    '🏆 Champion - Top 10 on leaderboard',
                                    '💎 Diamond - 100-day streak',
                                ].map((title, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm">
                                        {title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="text-center">
                                <CardContent className="pt-6">
                                    <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
                                    <div className="text-2xl font-bold">XP System</div>
                                    <div className="text-sm text-muted-foreground">Earn points daily</div>
                                </CardContent>
                            </Card>
                            <Card className="text-center">
                                <CardContent className="pt-6">
                                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                                    <div className="text-2xl font-bold">Streaks</div>
                                    <div className="text-sm text-muted-foreground">Build consistency</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
                    <p className="mb-8 opacity-90">
                        Join thousands of learners building daily language habits.
                    </p>
                    <Link href="/register">
                        <Button
                            size="lg"
                            className="bg-white text-primary hover:bg-white/90"
                        >
                            Get Started for Free
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
