'use client';

import { useAdminArticles, useDeleteArticle, useUpdateArticle } from '@/hooks';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@fluently/ui';
import {
    Plus,
    FileText,
    Calendar,
    Eye,
    Edit,
    Trash2,
    BookOpen,
    MoreVertical,
    AppWindow
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminArticlesPage() {
    const { data: articles, isLoading } = useAdminArticles();
    const deleteArticle = useDeleteArticle();
    const updateArticle = useUpdateArticle();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredArticles = articles?.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleTogglePublish = (article: any, e: React.MouseEvent) => {
        e.stopPropagation();
        updateArticle.mutate({
            articleId: article.id,
            data: { published: !article.published }
        });
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this article?')) {
            deleteArticle.mutate(id);
        }
    };

    const handleRowClick = (articleSlug: string) => {
        // Open preview in new tab
        window.open(`/dashboard/articles/${articleSlug}`, '_blank');
    };

    const handleEdit = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/admin/articles/${id}`);
    };

    if (isLoading) {
        return (
            <div className="p-8 space-y-6 animate-pulse">
                <div className="flex justify-between">
                    <div className="h-10 w-48 bg-muted rounded-lg" />
                    <div className="h-10 w-32 bg-muted rounded-lg" />
                </div>
                <div className="h-[400px] bg-muted rounded-xl" />
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
                    <p className="text-muted-foreground font-medium">Create and manage reading materials for students.</p>
                </div>

                <Button onClick={() => router.push('/admin/articles/new')} className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Article
                </Button>
            </div>

            <Card variant="default" className="border-none shadow-xl bg-surface/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-6">
                    <CardTitle className="text-lg font-bold">Articles Library ({filteredArticles?.length || 0})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-muted/30 text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-5 font-bold">Title</th>
                                    <th className="px-6 py-5 font-bold text-center">Status</th>
                                    <th className="px-6 py-5 font-bold text-center">Reads</th>
                                    <th className="px-6 py-5 font-bold text-center">Read Time</th>
                                    <th className="px-6 py-5 font-bold text-center">Created</th>
                                    <th className="px-6 py-5 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-surface/30">
                                {filteredArticles?.map((article) => (
                                    <tr
                                        key={article.id}
                                        className="group hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                                        onClick={() => handleRowClick(article.slug)}
                                        title="Click to preview article"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm leading-tight line-clamp-1 max-w-[200px] group-hover:text-primary transition-colors">{article.title}</span>
                                                    <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1 max-w-[200px]">
                                                        {article.summary}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <button
                                                onClick={(e) => handleTogglePublish(article, e)}
                                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${article.published
                                                    ? 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20'
                                                    : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/20'
                                                    }`}
                                            >
                                                {article.published ? 'Published' : 'Draft'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-muted-foreground">
                                                <Eye className="h-3.5 w-3.5" />
                                                {(article as any)._count?.reads || 0}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center text-xs font-bold text-muted-foreground">
                                            {article.readTime} min
                                        </td>
                                        <td className="px-6 py-5 text-center text-muted-foreground text-xs font-medium">
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleRowClick(article.slug); }}
                                                    className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-600 transition-colors"
                                                    title="Preview"
                                                >
                                                    <AppWindow className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => handleEdit(article.id, e)}
                                                    className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(article.id, e)}
                                                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredArticles?.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                            <div className="flex flex-col items-center">
                                                <BookOpen className="h-12 w-12 opacity-20 mb-3" />
                                                <p className="font-medium">No articles found</p>
                                                <p className="text-xs">Get started by creating your first article</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
