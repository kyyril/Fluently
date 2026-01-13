'use client';

import { useCreateArticle } from '@/hooks';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Textarea } from '@fluently/ui';
import { ArrowLeft, Loader2, Save, Code, CheckCircle2, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewArticlePage() {
    const router = useRouter();
    const createArticle = useCreateArticle();

    // Form State (Single)
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [readTime, setReadTime] = useState(5);
    const [category, setCategory] = useState('General');
    const [tagsInput, setTagsInput] = useState('');

    // JSON Import State
    const [showJsonImport, setShowJsonImport] = useState(false);
    const [jsonInput, setJsonInput] = useState('');
    const [importError, setImportError] = useState('');

    // Bulk Import State
    const [bulkData, setBulkData] = useState<any[] | null>(null);
    const [isBulkImporting, setIsBulkImporting] = useState(false);
    const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });

    const handleParseJson = () => {
        setImportError('');
        setBulkData(null);

        try {
            const data = JSON.parse(jsonInput);

            if (Array.isArray(data)) {
                // Bulk Mode Detected
                if (data.length === 0) throw new Error('Array is empty');
                setBulkData(data);
            } else {
                // Single Mode - Fill Form
                if (data.title) setTitle(data.title);
                if (data.summary) setSummary(data.summary);
                if (data.content) setContent(data.content);
                if (data.coverImage) setCoverImage(data.coverImage);
                if (data.readTime) setReadTime(Number(data.readTime));
                if (data.category) setCategory(data.category);
                if (data.tags) setTagsInput(Array.isArray(data.tags) ? data.tags.join(', ') : data.tags);

                setShowJsonImport(false);
                setJsonInput('');
            }
        } catch (error) {
            setImportError('Invalid JSON format. Please check your syntax.');
        }
    };

    const executeBulkImport = async () => {
        if (!bulkData) return;

        setIsBulkImporting(true);
        setBulkProgress({ current: 0, total: bulkData.length });

        try {
            for (let i = 0; i < bulkData.length; i++) {
                const article = bulkData[i];
                await createArticle.mutateAsync({
                    title: article.title || 'Untitled',
                    summary: article.summary || '',
                    content: article.content || '',
                    coverImage: article.coverImage || undefined,
                    readTime: Number(article.readTime) || 5,
                    category: article.category || 'General',
                    tags: Array.isArray(article.tags) ? article.tags : [],
                });
                setBulkProgress(prev => ({ ...prev, current: i + 1 }));
            }

            // Allow a brief moment to see 100%
            setTimeout(() => {
                router.push('/admin/articles');
            }, 500);
        } catch (error) {
            console.error('Bulk import failed', error);
            setImportError('Failed to import some articles. Check console.');
            setIsBulkImporting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createArticle.mutateAsync({
                title,
                summary,
                content,
                coverImage: coverImage || undefined,
                readTime,
                category,
                tags: tagsInput.split(',').map(tag => tag.trim()).filter(Boolean),
            });
            router.push('/admin/articles');
        } catch (error) {
            console.error('Failed to create article:', error);
        }
    };

    return (
        <div className="p-8 space-y-8  max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create Article</h1>
                    <p className="text-muted-foreground font-medium">Draft a new learning article or import multiple.</p>
                </div>
            </div>

            {/* JSON Import Section */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
                <button
                    onClick={() => setShowJsonImport(!showJsonImport)}
                    className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 "
                >
                    <div className="flex items-center gap-2 font-bold text-sm text-primary">
                        <Code className="h-4 w-4" />
                        Import from JSON (Single or Multiple)
                    </div>
                    {showJsonImport ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {showJsonImport && (
                    <div className="p-4 border-t border-border space-y-4 -down">
                        <p className="text-xs text-muted-foreground">
                            Paste a JSON Object <code>{"{...}"}</code> to fill the form, or a JSON Array <code>[{"{...}"}, {"{...}"}]</code> to bulk create.
                        </p>
                        <Textarea
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            placeholder='[{"title": "Article 1", ...}, {"title": "Article 2", ...}]'
                            className="font-mono text-xs h-32"
                        />
                        {importError && (
                            <p className="text-xs text-destructive font-medium">{importError}</p>
                        )}

                        {/* Bulk Import Confirmation */}
                        {bulkData && (
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm font-bold text-primary">
                                    <Layers className="h-4 w-4" />
                                    {isBulkImporting
                                        ? `Importing ${bulkProgress.current}/${bulkData.length}`
                                        : `Found ${bulkData.length} articles`
                                    }
                                </div>
                                {isBulkImporting && (
                                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary  "
                                            style={{ width: `${(bulkProgress.current / bulkData.length) * 100}%` }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex justify-end gap-2">
                            {bulkData ? (
                                <>
                                    <Button size="sm" variant="ghost" onClick={() => setBulkData(null)}>
                                        Cancel
                                    </Button>
                                    <Button size="sm" onClick={executeBulkImport} disabled={isBulkImporting}>
                                        {isBulkImporting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                                        {isBulkImporting ? 'Importing...' : 'Confirm Bulk Import'}
                                    </Button>
                                </>
                            ) : (
                                <Button size="sm" onClick={handleParseJson} disabled={!jsonInput}>
                                    Parse JSON
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card variant="default" className="border-none shadow-xl bg-surface/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-border pb-6">
                        <CardTitle className="text-lg font-bold">Article Details</CardTitle>
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
                    <Button type="submit" disabled={createArticle.isPending} className="min-w-[150px]">
                        {createArticle.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Create Article
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
