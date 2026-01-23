import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Globe, Target, ChevronRight, Check, ArrowRight, ChevronLeft } from 'lucide-react-native';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api/client';

const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
];

const LEVELS = [
    { value: 'beginner', label: 'Beginner', description: 'I know a few words and phrases' },
    { value: 'elementary', label: 'Elementary', description: 'I can have basic conversations' },
    { value: 'intermediate', label: 'Intermediate', description: 'I can discuss everyday topics' },
    { value: 'advanced', label: 'Advanced', description: 'I can express complex ideas' },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const { user, setOnboarded, updateUser } = useAuthStore();

    const [step, setStep] = useState(1);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [selectedLevel, setSelectedLevel] = useState('beginner');
    const [loading, setLoading] = useState(false);

    const handleComplete = async () => {
        setLoading(true);
        try {
            // Map level to uppercase to match API schema
            const levelMap: Record<string, string> = {
                'beginner': 'BEGINNER',
                'elementary': 'INTERMEDIATE',
                'intermediate': 'INTERMEDIATE',
                'advanced': 'ADVANCED',
            };

            await api.post('/auth/onboarding', {
                nativeLanguage: 'Indonesian',
                targetLanguage: selectedLanguage,
                level: levelMap[selectedLevel] || 'BEGINNER',
            });

            updateUser({ targetLanguage: selectedLanguage, level: levelMap[selectedLevel] || 'BEGINNER' });
            setOnboarded(true);
            router.replace('/(main)');
        } catch (error) {
            console.error('Onboarding error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
            {/* Ambient Background - Deeper & Subtler */}
            <View className="absolute -top-40 -left-20 w-80 h-80 bg-indigo-600/5 rounded-full" />
            <View className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-600/5 rounded-full" />

            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, paddingTop: 60 }} showsVerticalScrollIndicator={false}>
                {/* Header with Back Button */}
                <View className="flex-row items-center justify-between mb-8">
                    {step === 2 ? (
                        <Pressable
                            onPress={() => setStep(1)}
                            className="w-10 h-10 bg-zinc-900/80 rounded-xl items-center justify-center"
                        >
                            <ChevronLeft size={20} color="white" />
                        </Pressable>
                    ) : <View className="w-10 h-10" />}

                    {/* Progress Indicator */}
                    <View className="flex-row gap-x-2 flex-1 justify-center px-8">
                        <View className={`h-1.5 rounded-full flex-1 ${step >= 1 ? 'bg-indigo-600' : 'bg-zinc-800'}`} />
                        <View className={`h-1.5 rounded-full flex-1 ${step >= 2 ? 'bg-indigo-600' : 'bg-zinc-800'}`} />
                    </View>

                    <View className="w-10 h-10" />
                </View>

                {step === 1 ? (
                    <View className="flex-1">
                        {/* Step 1: Language Selection */}
                        <View className="mb-10">
                            <View className="flex-row items-center mb-3">
                                <View className="bg-indigo-500/20 px-3 py-1 rounded-full flex-row items-center border border-indigo-500/30">
                                    <Globe size={12} color="#818cf8" />
                                    <Text className="text-indigo-400 text-[10px] font-black uppercase tracking-widest ml-2">
                                        Language selection
                                    </Text>
                                </View>
                            </View>
                            <Text className="text-white text-4xl font-black tracking-tight mb-3">
                                Choose your target language
                            </Text>
                            <Text className="text-zinc-500 text-sm font-medium leading-5">
                                What would you like to master? We'll tailor your daily routine based on your choice.
                            </Text>
                        </View>

                        <View className="gap-y-3 mb-10">
                            {LANGUAGES.map((lang) => (
                                <Pressable
                                    key={lang.code}
                                    onPress={() => setSelectedLanguage(lang.code)}
                                    className={`flex-row items-center justify-between p-5 rounded-3xl border ${selectedLanguage === lang.code
                                        ? 'bg-indigo-600/10 border-indigo-600/50'
                                        : 'bg-zinc-900/40 border-zinc-800/50'
                                        }`}
                                >
                                    <View className="flex-row items-center">
                                        <View className="w-12 h-12 bg-zinc-800/50 rounded-2xl items-center justify-center mr-4">
                                            <Text className="text-2xl">{lang.flag}</Text>
                                        </View>
                                        <Text className={`text-lg font-bold ${selectedLanguage === lang.code ? 'text-white' : 'text-zinc-400'}`}>
                                            {lang.name}
                                        </Text>
                                    </View>
                                    {selectedLanguage === lang.code && (
                                        <View className="w-6 h-6 bg-indigo-600 rounded-full items-center justify-center">
                                            <Check size={14} color="white" />
                                        </View>
                                    )}
                                </Pressable>
                            ))}
                        </View>

                        <Button
                            title="Continue to Proficiency"
                            onPress={() => setStep(2)}
                            className="h-16 rounded-2xl"
                            textClassName="text-lg font-black"
                            icon={<ArrowRight size={20} color="white" />}
                        />
                    </View>
                ) : (
                    <View className="flex-1">
                        {/* Step 2: Level Selection */}
                        <View className="mb-10">
                            <View className="flex-row items-center mb-3">
                                <View className="bg-indigo-500/20 px-3 py-1 rounded-full flex-row items-center border border-indigo-500/30">
                                    <Target size={12} color="#818cf8" />
                                    <Text className="text-indigo-400 text-[10px] font-black uppercase tracking-widest ml-2">
                                        Skill assessment
                                    </Text>
                                </View>
                            </View>
                            <Text className="text-white text-4xl font-black tracking-tight mb-3">
                                What's your current level?
                            </Text>
                            <Text className="text-zinc-500 text-sm font-medium leading-5">
                                Don't worry, you can always adjust this later. This helps us suggest the right content.
                            </Text>
                        </View>

                        <View className="gap-y-3 mb-10">
                            {LEVELS.map((level) => (
                                <Pressable
                                    key={level.value}
                                    onPress={() => setSelectedLevel(level.value)}
                                    className={`p-5 rounded-3xl border ${selectedLevel === level.value
                                        ? 'bg-indigo-600/10 border-indigo-600/50'
                                        : 'bg-zinc-900/40 border-zinc-800/50'
                                        }`}
                                >
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-1 pr-4">
                                            <Text className={`font-bold text-lg ${selectedLevel === level.value ? 'text-white' : 'text-zinc-300'}`}>
                                                {level.label}
                                            </Text>
                                            <Text className="text-zinc-500 text-xs mt-1 font-medium">{level.description}</Text>
                                        </View>
                                        {selectedLevel === level.value && (
                                            <View className="w-6 h-6 bg-indigo-600 rounded-full items-center justify-center">
                                                <Check size={14} color="white" />
                                            </View>
                                        )}
                                    </View>
                                </Pressable>
                            ))}
                        </View>

                        <Button
                            title={loading ? 'Setting up...' : 'Start Learning Path'}
                            onPress={handleComplete}
                            loading={loading}
                            disabled={loading}
                            className="h-16 rounded-2xl"
                            textClassName="text-lg font-black"
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
