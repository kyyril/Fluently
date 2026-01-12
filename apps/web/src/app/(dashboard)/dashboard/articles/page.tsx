'use client';

import { useState } from 'react';
import { useArticles, useDailyReadingProgress } from '@/hooks';
import { Card, CardContent, Input } from '@fluently/ui';
import { BookOpen, Sparkles, Trophy, Search, Filter } from 'lucide-react';
import { ArticleCard } from '@/features/articles/components/ArticleCard';

const CATEGORIES = ['All', 'Technology', 'Culture', 'Health', 'Business', 'Grammar', 'Vocabulary'];

export default function ArticlesPage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const { data: articlesData, isLoading: isLoadingArticles } = useArticles({ search, category });
    const { data: progress } = useDailyReadingProgress();

    const articles = articlesData?.articles || [];
    const dailyProgress = articlesData?.dailyProgress || progress;

    return (
        <div className="container py-8 px-4 max-w-5xl mx-auto space-y-8 animate-fade-in pb-16">
            {/* Elegant Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                        <Sparkles className="h-3 w-3" />
                        Library
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                        Daily <span className="text-primary">Reading</span>
                    </h1>
                    <p className="text-muted-foreground text-sm max-w-md">
                        Master English through immersive daily articles.
                    </p>
                </div>

                {/* Compact Daily Progress */}
                <Card padding="sm" className="bg-surface/50 backdrop-blur-sm border-none shadow-xl min-w-[240px]">
                    <CardContent className="p-0">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Trophy className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-end mb-1.5">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Today</span>
                                    <span className="text-xs font-black">{dailyProgress?.completed || 0}/{dailyProgress?.max || 3}</span>
                                </div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] transition-all duration-1000"
                                        style={{ width: `${((dailyProgress?.completed || 0) / (dailyProgress?.max || 3)) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`
                                px-4 py-1.5 rounded-full text-xs font-bold transition-all
                                ${category === cat
                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                                    : 'bg-surface/50 text-muted-foreground hover:bg-surface hover:text-foreground'}
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search articles..."
                        className="pl-9 h-10 bg-surface/50 border-none shadow-sm rounded-xl focus:ring-2 focus:ring-primary/20"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Articles Grid */}
            {isLoadingArticles ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-80 rounded-3xl bg-muted animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article as any} />
                    ))}
                </div>
            )}

            {!isLoadingArticles && articles.length === 0 && (
                <div className="text-center py-32 rounded-3xl bg-surface/30 backdrop-blur-sm">
                    <BookOpen className="h-20 w-20 mx-auto mb-6 text-muted-foreground opacity-20" />
                    <h3 className="text-2xl font-black mb-2">The library is quiet...</h3>
                    <p className="text-muted-foreground">Check back soon for new articles to read!</p>
                </div>
            )}
        </div>
    );
}
