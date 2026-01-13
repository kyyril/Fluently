'use client';

import { useAdminArticles, useUpdateArticle } from '@/hooks';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea } from '@fluently/ui';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditArticlePage() {
    const router = useRouter();
    const params = useParams();
    const articleId = params.id as string;

    // Fetch article data (we can use the list cache for now, or dedicated hook)
    const { data: articles, isLoading: isLoadingArticle } = useAdminArticles();
    const updateArticle = useUpdateArticle();

    // Form State
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [readTime, setReadTime] = useState(5);
    const [published, setPublished] = useState(false);
    const [category, setCategory] = useState('General');
    const [tagsInput, setTagsInput] = useState('');

    // Load data
    useEffect(() => {
        if (articles) {
            const article = articles.find(a => a.id === articleId);
            if (article) {
                setTitle(article.title);
                setSummary(article.summary);
                setContent(article.content || '');
                setCoverImage(article.coverImage || '');
                setReadTime(article.readTime);
                setPublished(article.published);
                setCategory(article.category || 'General');
                setTagsInput(Array.isArray(article.tags) ? article.tags.join(', ') : (article.tags || ''));
            }
        }
    }, [articles, articleId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateArticle.mutateAsync({
                articleId,
                data: {
                    title,
                    summary,
                    content,
                    coverImage: coverImage || undefined,
                    readTime,
                    published,
                    category,
                    tags: tagsInput.split(',').map(tag => tag.trim()).filter(Boolean),
                }
            });
            router.push('/admin/articles');
        } catch (error) {
            console.error('Failed to update article:', error);
        }
    };

    if (isLoadingArticle) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 animate-fade-in max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Article</h1>
                    <p className="text-muted-foreground font-medium">Update content and settings.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card variant="default" className="border-none shadow-xl bg-surface/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-border pb-6 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-bold">Article Details</CardTitle>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium mr-2">Published Status</label>
                            <button
                                type="button"
                                onClick={() => setPublished(!published)}
                                className={`
                                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                                    ${published ? 'bg-primary' : 'bg-input'}
                                `}
                            >
                                <span
                                    className={`
                                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                        ${published ? 'translate-x-5' : 'translate-x-0'}
                                    `}
                                />
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-bold">Title</label>
                            <Input
                                placeholder="e.g. 10 Common English Idioms"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="text-lg font-medium"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-sm font-bold">Category</label>
                                <Input
                                    placeholder="e.g. Technology, Grammar"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-bold">Tags (comma separated)</label>
                                <Input
                                    placeholder="e.g. beginner, verbs, tech"
                                    value={tagsInput}
                                    onChange={(e) => setTagsInput(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-sm font-bold">Read Time (minutes)</label>
                                <Input
                                    type="number"
                                    min={1}
                                    value={readTime}
                                    onChange={(e) => setReadTime(parseInt(e.target.value))}
                                    required
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-bold">Cover Image URL (Optional)</label>
                                <Input
                                    placeholder="https://example.com/image.jpg"
                                    value={coverImage}
                                    onChange={(e) => setCoverImage(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold">Summary</label>
                            <Textarea
                                placeholder="Brief description of the article..."
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                required
                                className="h-24 resize-none"
                            />
                            <p className="text-xs text-muted-foreground text-right">{summary.length} / 200 characters</p>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold">Content (Markdown supported)</label>
                            <Textarea
                                placeholder="# Introduction..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                className="h-96 font-mono text-sm leading-relaxed"
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex items-center justify-end gap-4">
                    <Button type="button" variant="ghost" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={updateArticle.isPending} className="min-w-[150px]">
                        {updateArticle.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
