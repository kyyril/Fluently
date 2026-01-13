'use client';

import { useArticle, useCompleteArticle } from '@/hooks';
import { Card, CardContent, Button } from '@fluently/ui';
import { ArrowLeft, Clock, CheckCircle2, Award, Calendar, AlertCircle, Quote } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect, isValidElement, cloneElement, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { DictionaryModal } from '@/components/DictionaryModal';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

export default function ArticleViewPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;

    const { data: article, isLoading } = useArticle(slug);
    const completeArticle = useCompleteArticle();
    const [reward, setReward] = useState<{ xp: number; bonus: boolean } | null>(null);

    // Dictionary State
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);

    // Scroll progress
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

            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } catch (error) {
            console.error('Failed to complete article:', error);
        }
    };

    const handleWordClick = (word: string) => {
        // Clean punctuation: remove non-word chars from start/end
        const cleanWord = word.replace(/^[^\w]+|[^\w]+$/g, '');
        if (cleanWord) {
            setSelectedWord(cleanWord);
            setIsDictionaryOpen(true);
        }
    };

    // Helper to wrap words in clickable spans
    const InteractiveText = ({ children }: { children: ReactNode }) => {
        const wrapText = (node: ReactNode): ReactNode => {
            if (typeof node === 'string') {
                return node.split(/(\s+)/).map((part, index) => {
                    // Return whitespace as is
                    if (/^\s+$/.test(part) || part === '') return part;

                    return (
                        <span
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleWordClick(part);
                            }}
                            className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors rounded-sm px-0.5 -mx-0.5 py-0.5 select-text"
                            title="Click for definition"
                        >
                            {part}
                        </span>
                    );
                });
            }

            if (Array.isArray(node)) {
                return node.map((child, i) => <span key={i}>{wrapText(child)}</span>);
            }

            if (isValidElement(node)) {
                // Skip icons, code blocks, etc
                if (node.type === 'code' || node.type === 'pre' || node.type === 'svg') return node;

                const { children, ...props } = node.props;
                // Use recursion on children if they exist
                if (children) {
                    return cloneElement(node, props, wrapText(children));
                }
                return node;
            }

            return node;
        };

        return <>{wrapText(children)}</>;
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
            {/* Reading Progress Bar */}
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

            <div className="container py-8 px-4 max-w-3xl mx-auto space-y-8 ">
                {/* Navigation & Meta */}
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

                {/* Cover Image */}
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

                {/* Content */}
                <article className="
                    prose prose-lg dark:prose-invert max-w-none 
                    prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground
                    prose-p:leading-loose prose-p:text-muted-foreground
                    prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                    prose-strong:font-black prose-strong:text-foreground
                    prose-strong:font-black prose-strong:text-foreground
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:w-full prose-img:h-auto
                    prose-li:text-muted-foreground
                    prose-li:text-muted-foreground
                    prose-hr:border-border
                ">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ children }) => <p className="mb-4 text-lg leading-relaxed"><InteractiveText>{children}</InteractiveText></p>,
                            ul: ({ children }) => <ul className="list-disc pl-8 mb-6 space-y-2 text-lg">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-8 mb-6 space-y-2 text-lg">{children}</ol>,
                            li: ({ children }) => <li className="pl-2"><InteractiveText>{children}</InteractiveText></li>,
                            blockquote: ({ children }) => (
                                <blockquote className="relative my-10 pl-10 pr-6 py-6 border-l-4 border-primary bg-primary/5 rounded-r-2xl overflow-hidden group">
                                    <Quote className="absolute -top-2 -left-2 h-16 w-16 text-primary/5 -rotate-12 transition-transform group-hover:rotate-0 duration-500" />
                                    <div className="relative z-10 italic text-xl text-foreground font-medium leading-relaxed">
                                        <InteractiveText>{children}</InteractiveText>
                                    </div>
                                </blockquote>
                            ),
                            h1: ({ children }) => <h1 className="text-3xl sm:text-4xl mt-12 mb-6"><InteractiveText>{children}</InteractiveText></h1>,
                            h2: ({ children }) => <h2 className="text-2xl sm:text-3xl mt-10 mb-5 pb-2"><InteractiveText>{children}</InteractiveText></h2>,
                            h3: ({ children }) => <h3 className="text-xl sm:text-2xl mt-8 mb-4 font-bold"><InteractiveText>{children}</InteractiveText></h3>,
                            code: ({ node, className, children, ...props }: any) => {
                                const match = /language-(\w+)/.exec(className || '')
                                return match ? (
                                    <div className="rounded-xl overflow-hidden my-6 shadow-xl">
                                        <div className="bg-muted px-4 py-2 text-xs font-mono text-muted-foreground flex justify-between">
                                            <span>{match[1]}</span>
                                        </div>
                                        <SyntaxHighlighter
                                            {...props}
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            customStyle={{ margin: 0, borderRadius: 0 }}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary font-bold" {...props}>
                                        {children}
                                    </code>
                                )
                            },
                            // Custom Table Handling for professional look
                            table: ({ children }) => (
                                <div className="overflow-x-auto my-8 rounded-xl shadow-md bg-surface/30">
                                    <table className="w-full text-sm text-left">{children}</table>
                                </div>
                            ),
                            thead: ({ children }) => <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">{children}</thead>,
                            th: ({ children }) => <th className="px-6 py-4 font-bold">{children}</th>,
                            td: ({ children }) => <td className="px-6 py-4"><InteractiveText>{children}</InteractiveText></td>,
                        }}
                    >
                        {article.content || ''}
                    </ReactMarkdown>
                </article>

                {/* Completion Section */}
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
