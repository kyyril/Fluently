'use client';

import { Modal, Button } from '@fluently/ui';
import { Loader2, Volume2, Book, ExternalLink } from 'lucide-react';
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
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);
            if (!response.ok) {
                throw new Error('Word not found');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (err) {
            setError('Could not find definition. Try selecting a simpler form of the word.');
        } finally {
            setIsLoading(false);
        }
    };

    const playAudio = (url?: string) => {
        if (!url) return;
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = new Audio(url);
            audioRef.current.play().catch(e => console.error("Audio play error", e));
        } else {
            audioRef.current = new Audio(url);
            audioRef.current.play().catch(e => console.error("Audio play error", e));
        }
    };

    // Find the first audio available
    const mainAudio = data?.[0]?.phonetics.find(p => p.audio && p.audio.length > 0)?.audio;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isLoading ? 'Looking up...' : (word ? `Definition: ${word}` : 'Dictionary')}
            size="md"
        >
            <div className="space-y-6">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground animate-pulse">Searching dictionary...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-8 px-4">
                        <div className="bg-destructive/10 text-destructive p-4 rounded-xl mb-4 inline-flex">
                            <Book className="h-6 w-6" />
                        </div>
                        <p className="font-medium">{error}</p>
                        <Button variant="ghost" className="mt-4" onClick={onClose}>Close</Button>
                    </div>
                )}

                {!isLoading && !error && data && data.length > 0 && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Header: Word & Phonetic */}
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <div>
                                <h2 className="text-3xl font-black capitalize">{data[0].word}</h2>
                                <p className="text-lg text-primary font-medium font-mono mt-1">
                                    {data[0].phonetic || data[0].phonetics.find(p => p.text)?.text}
                                </p>
                            </div>
                            {mainAudio && (
                                <Button
                                    size="icon"
                                    className="rounded-full w-12 h-12"
                                    onClick={() => playAudio(mainAudio)}
                                >
                                    <Volume2 className="h-6 w-6" />
                                </Button>
                            )}
                        </div>

                        {/* Meanings */}
                        <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                            {data[0].meanings.map((meaning, idx) => (
                                <div key={idx} className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                            {meaning.partOfSpeech}
                                        </span>
                                        <div className="h-px bg-border flex-1" />
                                    </div>
                                    <ul className="space-y-4">
                                        {meaning.definitions.slice(0, 3).map((def, i) => ( // Limit to top 3 definitions per part of speech
                                            <li key={i} className="text-sm group">
                                                <div className="flex gap-2">
                                                    <span className="font-bold text-muted-foreground min-w-[1.5rem]">{i + 1}.</span>
                                                    <div className="space-y-1">
                                                        <p className="text-foreground leading-relaxed">
                                                            {def.definition}
                                                        </p>
                                                        {def.example && (
                                                            <p className="text-muted-foreground italic text-xs pl-3 border-l-2 border-primary/20">
                                                                "{def.example}"
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Footer Info */}
                        <div className="text-xs text-muted-foreground pt-4 border-t border-border flex justify-between items-center">
                            <span>Source: Dictionary API</span>
                            {data[0].sourceUrls?.[0] && (
                                <a
                                    href={data[0].sourceUrls[0]}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1 hover:text-primary transition-colors"
                                >
                                    Wiktionary <ExternalLink className="h-3 w-3" />
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}
