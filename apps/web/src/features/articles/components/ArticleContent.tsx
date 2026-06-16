'use client';

import dynamic from 'next/dynamic';
import type { Article } from '@/hooks/useArticles';
import { Quote } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter').then((mod) => mod.Prism), {
    ssr: false,
});

interface InteractiveTextProps {
    children: React.ReactNode;
    onWordClick: (word: string) => void;
}

function InteractiveText({ children, onWordClick }: InteractiveTextProps) {
    const wrapText = (node: React.ReactNode): React.ReactNode => {
        if (typeof node === 'string') {
            return node.split(/(\s+)/).map((part, index) => {
                if (/^\s+$/.test(part) || part === '') return part;

                return (
                    <span
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            onWordClick(part);
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

        return node;
    };

    return <>{wrapText(children)}</>;
}

export function ArticleContent({
    article,
    onWordClick,
}: {
    article: Article;
    onWordClick: (word: string) => void;
}) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                p: ({ children }) => <p className="mb-4 text-lg leading-relaxed"><InteractiveText onWordClick={onWordClick}>{children}</InteractiveText></p>,
                ul: ({ children }) => <ul className="list-disc pl-8 mb-6 space-y-2 text-lg">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-8 mb-6 space-y-2 text-lg">{children}</ol>,
                li: ({ children }) => <li className="pl-2"><InteractiveText onWordClick={onWordClick}>{children}</InteractiveText></li>,
                blockquote: ({ children }) => (
                    <blockquote className="relative my-10 pl-10 pr-6 py-6 border-l-4 border-primary bg-primary/5 rounded-r-2xl overflow-hidden group">
                        <Quote className="absolute -top-2 -left-2 h-16 w-16 text-primary/5 -rotate-12 transition-transform group-hover:rotate-0 duration-500" />
                        <div className="relative z-10 italic text-xl text-foreground font-medium leading-relaxed">
                            <InteractiveText onWordClick={onWordClick}>{children}</InteractiveText>
                        </div>
                    </blockquote>
                ),
                h1: ({ children }) => <h1 className="text-3xl sm:text-4xl mt-12 mb-6"><InteractiveText onWordClick={onWordClick}>{children}</InteractiveText></h1>,
                h2: ({ children }) => <h2 className="text-2xl sm:text-3xl mt-10 mb-5 pb-2"><InteractiveText onWordClick={onWordClick}>{children}</InteractiveText></h2>,
                h3: ({ children }) => <h3 className="text-xl sm:text-2xl mt-8 mb-4 font-bold"><InteractiveText onWordClick={onWordClick}>{children}</InteractiveText></h3>,
                code: ({ node, className, children, ...props }: any) => {
                    const match = /language-(\w+)/.exec(className || '');
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
                    );
                },
                table: ({ children }) => (
                    <div className="overflow-x-auto my-8 rounded-xl shadow-md bg-surface/30">
                        <table className="w-full text-sm text-left">{children}</table>
                    </div>
                ),
                thead: ({ children }) => <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">{children}</thead>,
                th: ({ children }) => <th className="px-6 py-4 font-bold">{children}</th>,
                td: ({ children }) => <td className="px-6 py-4"><InteractiveText onWordClick={onWordClick}>{children}</InteractiveText></td>,
            }}
        >
            {article.content || ''}
        </ReactMarkdown>
    );
}
