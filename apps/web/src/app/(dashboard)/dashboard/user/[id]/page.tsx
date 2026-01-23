'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { Card, CardContent, Button } from '@fluently/ui';
import { User, Flame, Star, Trophy, Target, ArrowLeft, BookOpen, Sprout, Leaf, TreeDeciduous } from 'lucide-react';
import Link from 'next/link';

interface PublicProfile {
    id: string;
    displayName: string;
    avatarUrl: string | null;
    targetLanguage: string;
    level: string;
    totalXp: number;
    currentStreak: number;
}

export default function UserProfilePage() {
    const params = useParams();
    const userId = params.id as string;

    const { data: profile, isLoading } = useQuery({
        queryKey: ['user', 'public', userId],
        queryFn: async () => {
            const response = await api.get<{ success: boolean; data: PublicProfile }>(
                `/users/${userId}`
            );
            return response.data.data;
        },
        enabled: !!userId,
    });

    const levelConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
        BEGINNER: { icon: <Sprout className="w-6 h-6" />, color: 'text-green-500', bg: 'bg-green-500/10' },
        INTERMEDIATE: { icon: <Leaf className="w-6 h-6" />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        ADVANCED: { icon: <TreeDeciduous className="w-6 h-6" />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    };
    const currentLevel = levelConfig[profile?.level || 'BEGINNER'];

    if (isLoading) {
        return (
            <div className="container py-8 px-4 max-w-3xl mx-auto space-y-8 ">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-xl animate-pulse" />
                    <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
                </div>
                <Card className="bg-surface/50 border-none">
                    <CardContent className="p-8">
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-32 h-32 bg-muted rounded-3xl animate-pulse" />
                            <div className="space-y-3 text-center">
                                <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mx-auto" />
                                <div className="h-5 w-32 bg-muted rounded-md animate-pulse mx-auto" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="container py-8 px-4 max-w-3xl mx-auto">
                <Card className="bg-surface/50 border-none">
                    <CardContent className="p-12 text-center">
                        <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
                        <h2 className="text-xl font-bold mb-2">User not found</h2>
                        <p className="text-muted-foreground mb-6">This profile doesn't exist or is private.</p>
                        <Link href="/dashboard/leaderboard">
                            <Button variant="primary">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Leaderboard
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container py-8 px-4 max-w-3xl mx-auto space-y-8 " >
            {/* Back Button */}
            < div className="flex items-center gap-4" >
                <Link href="/dashboard/leaderboard">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-black">Learner Profile</h1>
            </div >

            {/* Profile Card */}
            < Card padding="none" className="overflow-hidden bg-surface/50 backdrop-blur-sm border-none" >
                {/* Gradient Banner */}
                < div className="h-24 sm:h-32 bg-gradient-to-br from-primary via-primary/80 to-secondary relative overflow-hidden" >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
                </div >

                <CardContent className="relative px-6 pb-8">
                    {/* Avatar */}
                    <div className="flex flex-col items-center -mt-16">
                        <div className="relative">
                            <div className="w-28 h-28 bg-background rounded-3xl flex items-center justify-center overflow-hidden ring-4 ring-background">
                                {profile.avatarUrl ? (
                                    <img
                                        src={profile.avatarUrl}
                                        alt={profile.displayName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="h-14 w-14 text-muted-foreground/50" />
                                )}
                            </div>
                            {/* Level Badge */}
                            <div className={`absolute -bottom-2 -right-2 w-10 h-10 ${currentLevel.bg} ${currentLevel.color} rounded-xl flex items-center justify-center`}>
                                {currentLevel.icon}
                            </div>
                        </div>

                        <div className="text-center mt-6 space-y-2">
                            <h2 className="text-3xl font-black">{profile.displayName}</h2>

                            {/* Tags */}
                            <div className="flex flex-wrap justify-center gap-2 pt-2">
                                <span className={`px-3 py-1 ${currentLevel.bg} ${currentLevel.color} rounded-full text-xs font-bold`}>
                                    {profile.level}
                                </span>
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center gap-1">
                                    <BookOpen className="h-3 w-3" />
                                    Learning {profile.targetLanguage?.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card >

            {/* Stats Grid */}
            < div className="grid grid-cols-3 gap-4" >
                <StatCard
                    icon={<Star className="h-5 w-5" />}
                    value={profile.totalXp}
                    label="Total XP"
                    color="text-yellow-500"
                    bgColor="bg-yellow-500/10"
                />
                <StatCard
                    icon={<Flame className="h-5 w-5" />}
                    value={profile.currentStreak}
                    label="Day Streak"
                    color="text-orange-500"
                    bgColor="bg-orange-500/10"
                />
                <StatCard
                    icon={<Trophy className="h-5 w-5" />}
                    value={profile.level}
                    label="Level"
                    color="text-primary"
                    bgColor="bg-primary/10"
                    isString
                />
            </div >
        </div >
    );
}

function StatCard({
    icon,
    value,
    label,
    color,
    bgColor,
    isString = false,
}: {
    icon: React.ReactNode;
    value: number | string;
    label: string;
    color: string;
    bgColor: string;
    isString?: boolean;
}) {
    return (
        <Card padding="none" className="bg-surface/50 backdrop-blur-sm border-none overflow-hidden">
            <CardContent className="p-5 text-center">
                <div className={`w-10 h-10 ${bgColor} rounded-xl flex items-center justify-center ${color} mx-auto mb-3`}>
                    {icon}
                </div>
                <div className="text-2xl font-black">
                    {isString ? value : (typeof value === 'number' ? value.toLocaleString() : value)}
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">{label}</div>
            </CardContent>
        </Card>
    );
}
