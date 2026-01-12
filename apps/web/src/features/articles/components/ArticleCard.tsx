'use client';

import { Card, CardContent } from '@fluently/ui';
import { BookOpen, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Article {
    id: string;
    slug: string;
    title: string;
    summary: string;
    coverImage?: string | null;
    readTime: number;
    category?: string;
    tags?: string[];
    isReadToday?: boolean;
}

interface ArticleCardProps {
    article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
    return (
        <Link href={`/dashboard/articles/${article.slug}`} className="block h-full group">
            <Card padding="none" className={`
                h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 
                overflow-hidden bg-surface/50 backdrop-blur-sm border-none shadow-xl
                ${article.isReadToday ? 'ring-2 ring-primary/20 bg-primary/5' : ''}
            `}>
                {/* Image Section */}
                <div className="aspect-[16/10] w-full bg-muted relative overflow-hidden">
                    {/* Badge for Read Status */}
                    {article.isReadToday && (
                        <div className="absolute top-4 right-4 z-20 bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg animate-in zoom-in duration-300">
                            <CheckCircle2 className="h-3 w-3" />
                            READ TODAY
                        </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    {/* Fallback pattern */}
                    <div className="absolute inset-0 bg-primary/5 flex items-center justify-center opacity-30">
                        <BookOpen className="h-12 w-12 text-primary/40" />
                    </div>

                    {article.coverImage && (
                        <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    )}
                </div>

                {/* Content Section */}
                <CardContent className="p-5 flex flex-col flex-1 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-[10px] font-black text-primary/70 uppercase tracking-widest">
                            <Clock className="h-3 w-3" />
                            {article.readTime} min read
                        </div>
                        {article.category && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-bold">
                                {article.category}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2 flex-1">
                        <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                        </h3>

                        <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
                            {article.summary}
                        </p>

                        {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {article.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[9px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="pt-2 flex items-center text-xs font-bold text-primary transition-all group-hover:translate-x-1">
                        Read more
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
