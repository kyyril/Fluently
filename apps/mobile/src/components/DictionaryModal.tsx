import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, ActivityIndicator, Pressable, Platform } from 'react-native';
import { X, Volume2, Search, ChevronRight, Share } from 'lucide-react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { Button } from './ui/Button';

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
    const soundRef = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        if (isOpen && word) {
            fetchDefinition(word);
        } else {
            setData(null);
            setError(null);
        }

        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
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

    const playAudio = async (url?: string) => {
        if (!url) return;

        try {
            if (soundRef.current) {
                await soundRef.current.unloadAsync();
            }

            const { sound } = await Audio.Sound.createAsync(
                { uri: url },
                { shouldPlay: true }
            );
            soundRef.current = sound;

            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } catch (e) {
            console.error("Audio play error", e);
        }
    };

    // Find the first audio available
    const mainAudio = data?.[0]?.phonetics.find(p => p.audio && p.audio.length > 0)?.audio;

    return (
        <Modal
            visible={isOpen}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end bg-black/60">
                <Pressable className="flex-1" onPress={onClose} />
                <View className="bg-zinc-900 rounded-t-[40px] p-6 pb-12 border-t border-zinc-800 h-[70vh]">
                    {/* Handle */}
                    <View className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-6" />

                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Dictionary lookup</Text>
                        <TouchableOpacity
                            onPress={onClose}
                            className="bg-zinc-800 p-2 rounded-full"
                        >
                            <X size={20} color="#a1a1aa" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                        {isLoading ? (
                            <View className="py-20 items-center justify-center">
                                <ActivityIndicator size="large" color="#6366f1" />
                                <Text className="text-white font-black text-lg mt-4">Searching...</Text>
                                <Text className="text-zinc-500 text-xs mt-1 uppercase tracking-widest font-bold">Scanning database</Text>
                            </View>
                        ) : error ? (
                            <View className="py-12 items-center text-center px-4">
                                <View className="h-20 w-20 rounded-3xl bg-red-500/10 items-center justify-center mb-6">
                                    <Search size={40} color="#ef4444" />
                                </View>
                                <Text className="text-white text-xl font-black mb-2">Definition not found</Text>
                                <Text className="text-zinc-400 text-sm text-center leading-5 mb-8">
                                    We couldn't find a definition for <Text className="text-white font-bold">"{error}"</Text>.
                                    Try selecting a simpler root form of the word.
                                </Text>
                                <Button
                                    variant="primary"
                                    className="px-10 font-black rounded-2xl"
                                    onPress={onClose}
                                    title="Got it"
                                />
                            </View>
                        ) : data && data.length > 0 ? (
                            <View className="space-y-8">
                                {/* Header: Word & Phonetic */}
                                <View className="flex-row items-center justify-between border-b border-zinc-800 pb-6 mb-6">
                                    <View className="flex-1">
                                        <Text className="text-white text-4xl font-black capitalize tracking-tight">{data[0].word}</Text>
                                        {(data[0].phonetic || data[0].phonetics.find(p => p.text)?.text) && (
                                            <Text className="text-indigo-400 text-lg font-bold mt-1">
                                                {data[0].phonetic || data[0].phonetics.find(p => p.text)?.text}
                                            </Text>
                                        )}
                                    </View>
                                    {mainAudio && (
                                        <TouchableOpacity
                                            className="w-16 h-16 rounded-2xl bg-indigo-500/20 items-center justify-center"
                                            onPress={() => playAudio(mainAudio)}
                                        >
                                            <Volume2 size={32} color="#6366f1" />
                                        </TouchableOpacity>
                                    )}
                                </View>

                                {/* Meanings */}
                                <View className="space-y-8">
                                    {data[0].meanings.map((meaning, idx) => (
                                        <View key={idx} className="mb-8">
                                            <View className="flex-row items-center mb-4">
                                                <View className="bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700">
                                                    <Text className="text-zinc-300 text-[10px] font-black uppercase tracking-widest">
                                                        {meaning.partOfSpeech}
                                                    </Text>
                                                </View>
                                                <View className="h-[1px] bg-zinc-800 flex-1 ml-4" />
                                            </View>

                                            <View className="space-y-6">
                                                {meaning.definitions.slice(0, 3).map((def, i) => (
                                                    <View key={i} className="flex-row">
                                                        <Text className="text-indigo-500/40 font-black text-[10px] mt-1 mr-4">0{i + 1}</Text>
                                                        <View className="flex-1">
                                                            <Text className="text-zinc-200 text-base leading-6 font-medium">
                                                                {def.definition}
                                                            </Text>
                                                            {def.example && (
                                                                <View className="mt-2 pl-4 border-l-2 border-indigo-500/20">
                                                                    <Text className="text-zinc-500 text-sm italic leading-5">
                                                                        "{def.example}"
                                                                    </Text>
                                                                </View>
                                                            )}
                                                        </View>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </View>

                                {/* Footer */}
                                <View className="mt-8 pt-8 border-t border-zinc-800 flex-row justify-between items-center opacity-50">
                                    <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">English Dictionary</Text>
                                    <View className="flex-row items-center">
                                        <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mr-1">Source</Text>
                                        <Share size={10} color="#71717a" />
                                    </View>
                                </View>
                            </View>
                        ) : null}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
