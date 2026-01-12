'use client';

import { Modal, Button } from '@fluently/ui';
import { Loader2, Volume2, BookX, Search, ChevronRight, ExternalLink } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Types based on the API response provided
export interface DictionaryEntry {
    word: string;
    phonetic?: string;
    phonetics: {
        text?: string;
        audio?: string;
        sourceUrl?: string;
    }[];
    meanings: {
        partOfSpeech: string;
        definitions: {
            definition: string;
            synonyms: string[];
            antonyms: string[];
            example?: string;
        }[];
    }[];
    sourceUrls: string[];
}

interface DictionaryModalProps {
    word: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export function DictionaryModal({ word, isOpen, onClose }: DictionaryModalProps) {
    const [data, setData] = useState<DictionaryEntry[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (isOpen && word) {
            fetchDefinition(word);
        } else {
            setData(null);
            setError(null);
        }
    }, [isOpen, word]);

    const fetchDefinition = async (term: string) => {
        setIsLoading(true);
        setError(null);
        try {
            // Clean the word (remove punctuation and trim)
            const cleanWord = term.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim().toLowerCase();
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
            if (!response.ok) {
                throw new Error('Word not found');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (err) {
            setError(term);
        } finally {
            setIsLoading(false);
        }
    };

    const playAudio = (url?: string) => {
        if (!url) return;
        if (audioRef.current) {
            audioRef.current.pause();
        }
        audioRef.current = new Audio(url);
        audioRef.current.play().catch(e => console.error("Audio play error", e));
    };

    // Find the first audio available
    const mainAudio = data?.[0]?.phonetics.find(p => p.audio && p.audio.length > 0)?.audio;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title=""
            size="md"
        >
            <div className="min-h-[300px] flex flex-col pt-2">
                {isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-12 space-y-4 animate-fade-in">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center">
                                <Search className="h-8 w-8 text-primary/40" />
                            </div>
                            <div className="absolute inset-0 h-16 w-16 border-2 border-primary border-t-transparent rounded-2xl animate-spin" />
                        </div>
                        <div className="text-center">
                            <p className="font-black text-lg">Searching...</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Scanning dictionary database</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-in">
                        <div className="h-20 w-20 rounded-3xl bg-destructive/5 flex items-center justify-center mb-6">
                            <BookX className="h-10 w-10 text-destructive/40" />
                        </div>
                        <h3 className="text-xl font-black mb-2">Definition not found</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
                            We couldn't find a definition for <span className="text-foreground font-bold">"{error}"</span>.
                            Try selecting a simpler root form of the word.
                        </p>
                        <Button
                            variant="primary"
                            className="mt-8 px-8 font-black rounded-xl"
                            onClick={onClose}
                        >
                            Got it
                        </Button>
                    </div>
                ) : data && data.length > 0 ? (
                    <div className="space-y-8 animate-fade-in pb-4">
                        {/* Header: Word & Phonetic */}
                        <div className="flex items-center justify-between border-b border-border/50 pb-6">
                            <div className="space-y-1">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Dictionary lookup</div>
                                <h2 className="text-4xl font-black capitalize tracking-tight">{data[0].word}</h2>
                                {(data[0].phonetic || data[0].phonetics.find(p => p.text)?.text) && (
                                    <p className="text-lg text-primary/80 font-bold font-mono">
                                        {data[0].phonetic || data[0].phonetics.find(p => p.text)?.text}
                                    </p>
                                )}
                            </div>
                            {mainAudio && (
                                <button
                                    className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-all group active:scale-95"
                                    onClick={() => playAudio(mainAudio)}
                                >
                                    <Volume2 className="h-7 w-7 transition-transform group-hover:scale-110" />
                                </button>
                            )}
                        </div>

                        {/* Meanings */}
                        <div className="space-y-8 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {data[0].meanings.map((meaning, idx) => (
                                <div key={idx} className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black uppercase tracking-[0.15em] bg-surface/80 px-2.5 py-1 rounded-md border border-border/50">
                                            {meaning.partOfSpeech}
                                        </span>
                                        <div className="h-px bg-gradient-to-r from-border/50 to-transparent flex-1" />
                                    </div>
                                    <div className="grid gap-4">
                                        {meaning.definitions.slice(0, 3).map((def, i) => (
                                            <div key={i} className="flex gap-4 group">
                                                <div className="text-[10px] font-black text-primary/40 mt-1.5 min-w-[12px]">0{i + 1}</div>
                                                <div className="space-y-2 flex-1">
                                                    <p className="text-sm font-bold leading-relaxed text-foreground/90">
                                                        {def.definition}
                                                    </p>
                                                    {def.example && (
                                                        <div className="pl-4 border-l-2 border-primary/20">
                                                            <p className="text-xs text-muted-foreground italic leading-relaxed">
                                                                "{def.example}"
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Info */}
                        <div className="pt-4 flex justify-between items-center bg-muted/30 -mx-6 -mb-4 px-6 py-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">English Dictionary</span>
                            {data[0].sourceUrls?.[0] && (
                                <a
                                    href={data[0].sourceUrls[0]}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                                >
                                    Source Code <ExternalLink className="h-3 w-3" />
                                </a>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        </Modal>
    );
}
