'use client';

import { useState, useEffect } from 'react';
import { useArticle, useCompleteArticle } from '@/hooks';
import { Card, CardContent, Button } from '@fluently/ui';
import {
    ArrowLeft,
    Clock,
    CheckCircle2,
    Award,
    Calendar,
    AlertCircle,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { ArticleContent } from '@/features/articles/components/ArticleContent';
import { DictionaryModal } from '@/components/DictionaryModal';
import Image from 'next/image';

export default function ArticleViewPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;

    const { data: article, isLoading } = useArticle(slug);
    const completeArticle = useCompleteArticle();
    const [reward, setReward] = useState<{ xp: number; bonus: boolean } | null>(null);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentProgress = window.scrollY;
            setProgress((currentProgress / totalHeight) * 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleComplete = async () => {
        if (!article) return;

        try {
            const result = await completeArticle.mutateAsync(article.id);
            setReward({ xp: result.xpEarned, bonus: result.bonusEarned });
            const confetti = await import('canvas-confetti');
            confetti.default({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
        } catch (error) {
            console.error('Failed to complete article:', error);
        }
    };

    const handleWordClick = (word: string) => {
        const cleanWord = word.replace(/^[^\w]+|[^\w]+$/g, '');
        if (cleanWord) {
            setSelectedWord(cleanWord);
            setIsDictionaryOpen(true);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto py-8 animate-pulse space-y-8">
                <div className="space-y-4">
                    <div className="h-8 w-24 bg-muted rounded" />
                    <div className="h-12 w-3/4 bg-muted rounded" />
                    <div className="flex gap-4">
                        <div className="h-4 w-24 bg-muted rounded" />
                        <div className="h-4 w-24 bg-muted rounded" />
                    </div>
                </div>
                <div className="h-64 bg-muted rounded-xl" />
                <div className="space-y-4">
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
                <AlertCircle className="h-12 w-12 mb-4 opacity-50" />
                <h2 className="text-xl font-bold mb-2">Article Not Found</h2>
                <Button onClick={() => router.push('/dashboard/articles')}>Back to Library</Button>
            </div>
        );
    }

    return (
        <div className="relative pb-24">
            <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
                <div
                    className="h-full bg-primary transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <DictionaryModal
                word={selectedWord}
                isOpen={isDictionaryOpen}
                onClose={() => setIsDictionaryOpen(false)}
            />

            <div className="container py-8 px-4 max-w-3xl mx-auto space-y-8">
                <div className="space-y-6">
                    <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2 -ml-4">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Library
                    </Button>

                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="bg-primary/10 text-primary text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                                {article.category || 'Reading Practice'}
                            </span>
                            {article.tags?.map((tag: string) => (
                                <span key={tag} className="bg-muted text-muted-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {article.readTime} min read
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {new Date(article.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>

                {article.coverImage && (
                    <div className="rounded-2xl overflow-hidden aspect-[21/9] shadow-2xl relative">
                        <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                            className="object-cover"
                        />
                    </div>
                )}

                <article className="
                    prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground
                    prose-p:leading-loose prose-p:text-muted-foreground
                    prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                    prose-strong:font-black prose-strong:text-foreground
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:w-full prose-img:h-auto
                    prose-li:text-muted-foreground
                    prose-hr:border-border
                ">
                    <ArticleContent article={article} onWordClick={handleWordClick} />
                </article>

                <div className="pt-12 mt-12 mb-12">
                    <Card className={`
                        overflow-hidden transition-all duration-500
                        ${reward ? 'bg-gradient-to-br from-green-500/10 to-transparent' : 'bg-surface'}
                    `}>
                        <CardContent className="p-8 text-center">
                            {reward ? (
                                <div className="space-y-4 animate-in zoom-in duration-300">
                                    <div className="h-16 w-16 mx-auto bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                                        <CheckCircle2 className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-foreground">Completed!</h2>
                                        <p className="text-lg font-medium text-muted-foreground mt-2">
                                            You earned <span className="text-primary font-bold">+{reward.xp} XP</span>
                                            {reward.bonus && (
                                                <span className="ml-2 inline-flex items-center gap-1 bg-yellow-500/10 text-yellow-600 px-2 py-0.5 rounded-full text-xs font-bold uppercase">
                                                    <Award className="h-3 w-3" />
                                                    Daily Bonus
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                    <Button onClick={() => router.push('/dashboard/articles')} className="mt-4">
                                        Read Another Article
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold">Finished Reading?</h3>
                                        <p className="text-muted-foreground">Complete this article to earn 20 XP towards your daily goal.</p>
                                    </div>
                                    <Button
                                        size="lg"
                                        onClick={handleComplete}
                                        disabled={completeArticle.isPending}
                                        className="w-full sm:w-auto min-w-[200px] h-14 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1"
                                    >
                                        {completeArticle.isPending ? 'Claiming XP...' : 'Complete & Claim XP'}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
