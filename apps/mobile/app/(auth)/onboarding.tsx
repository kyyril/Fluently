import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Globe, Target, ChevronRight, Check } from 'lucide-react-native';
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
            await api.post('/users/onboarding', {
                targetLanguage: selectedLanguage,
                level: selectedLevel,
            });

            updateUser({ targetLanguage: selectedLanguage, level: selectedLevel });
            setOnboarded(true);
            router.replace('/(main)');
        } catch (error) {
            console.error('Onboarding error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-black">
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 30, paddingTop: 80 }}>
                {/* Progress Indicator */}
                <View className="flex-row mb-8">
                    <View className={`flex-1 h-1 rounded-full mr-2 ${step >= 1 ? 'bg-indigo-600' : 'bg-zinc-800'}`} />
                    <View className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-zinc-800'}`} />
                </View>

                {step === 1 ? (
                    <>
                        {/* Step 1: Language Selection */}
                        <View className="mb-8">
                            <View className="flex-row items-center mb-2">
                                <Globe size={14} color="#6366f1" />
                                <Text className="text-indigo-500 text-[10px] font-black uppercase tracking-widest ml-2">
                                    Step 1 of 2
                                </Text>
                            </View>
                            <Text className="text-white text-3xl font-black mb-2">
                                What language do you want to learn?
                            </Text>
                            <Text className="text-zinc-500 text-sm">
                                Select your target language to personalize your learning experience.
                            </Text>
                        </View>

                        <View className="gap-y-3 mb-8">
                            {LANGUAGES.map((lang) => (
                                <Pressable
                                    key={lang.code}
                                    onPress={() => setSelectedLanguage(lang.code)}
                                    className={`flex-row items-center justify-between p-4 rounded-2xl border ${selectedLanguage === lang.code
                                            ? 'bg-indigo-600/10 border-indigo-600'
                                            : 'bg-zinc-900 border-zinc-800'
                                        }`}
                                >
                                    <View className="flex-row items-center">
                                        <Text className="text-2xl mr-3">{lang.flag}</Text>
                                        <Text className={`font-bold ${selectedLanguage === lang.code ? 'text-white' : 'text-zinc-300'}`}>
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
                            title="Continue"
                            onPress={() => setStep(2)}
                            className="py-5 rounded-2xl"
                        />
                    </>
                ) : (
                    <>
                        {/* Step 2: Level Selection */}
                        <View className="mb-8">
                            <View className="flex-row items-center mb-2">
                                <Target size={14} color="#6366f1" />
                                <Text className="text-indigo-500 text-[10px] font-black uppercase tracking-widest ml-2">
                                    Step 2 of 2
                                </Text>
                            </View>
                            <Text className="text-white text-3xl font-black mb-2">
                                What's your current level?
                            </Text>
                            <Text className="text-zinc-500 text-sm">
                                We'll customize content based on your proficiency.
                            </Text>
                        </View>

                        <View className="gap-y-3 mb-8">
                            {LEVELS.map((level) => (
                                <Pressable
                                    key={level.value}
                                    onPress={() => setSelectedLevel(level.value)}
                                    className={`p-4 rounded-2xl border ${selectedLevel === level.value
                                            ? 'bg-indigo-600/10 border-indigo-600'
                                            : 'bg-zinc-900 border-zinc-800'
                                        }`}
                                >
                                    <View className="flex-row items-center justify-between">
                                        <View>
                                            <Text className={`font-bold text-base ${selectedLevel === level.value ? 'text-white' : 'text-zinc-300'}`}>
                                                {level.label}
                                            </Text>
                                            <Text className="text-zinc-500 text-xs mt-0.5">{level.description}</Text>
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

                        <View className="flex-row gap-3">
                            <Button
                                title="Back"
                                onPress={() => setStep(1)}
                                variant="secondary"
                                className="flex-1 py-5 rounded-2xl"
                            />
                            <Button
                                title="Get Started"
                                onPress={handleComplete}
                                loading={loading}
                                className="flex-1 py-5 rounded-2xl"
                            />
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
}
