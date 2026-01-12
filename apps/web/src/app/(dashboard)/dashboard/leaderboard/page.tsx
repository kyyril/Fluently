'use client';

import { useState } from 'react';
import { Card, CardContent, Button } from '@fluently/ui';
import { useWeeklyLeaderboard, useAllTimeLeaderboard, useUser } from '@/hooks';
import { Trophy, TrendingUp, Crown, Medal, Award, User } from 'lucide-react';

export default function LeaderboardPage() {
    const [tab, setTab] = useState<'weekly' | 'all-time'>('weekly');
    const { data: user } = useUser();
    const { data: weeklyData, isLoading: weeklyLoading } = useWeeklyLeaderboard();
    const { data: allTimeData, isLoading: allTimeLoading } = useAllTimeLeaderboard();

    const data = tab === 'weekly' ? weeklyData : allTimeData;
    const isLoading = tab === 'weekly' ? weeklyLoading : allTimeLoading;

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="h-5 w-5 text-yellow-500" />;
            case 2:
                return <Medal className="h-5 w-5 text-gray-400" />;
            case 3:
                return <Award className="h-5 w-5 text-amber-600" />;
            default:
                return null;
        }
    };

    const getRankBg = (rank: number) => {
        switch (rank) {
            case 1:
                return 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10 shadow-sm';
            case 2:
                return 'bg-gradient-to-r from-gray-300/10 to-gray-400/10 shadow-sm';
            case 3:
                return 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 shadow-sm';
            default:
                return '';
        }
    };

    return (
        <div className="container py-8 px-4 max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Leaderboard</h1>
                <p className="text-muted-foreground mt-2">
                    Compete with learners around the world
                </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg">
                <Button
                    variant={tab === 'weekly' ? 'primary' : 'ghost'}
                    className="flex-1"
                    onClick={() => setTab('weekly')}
                >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    This Week
                </Button>
                <Button
                    variant={tab === 'all-time' ? 'primary' : 'ghost'}
                    className="flex-1"
                    onClick={() => setTab('all-time')}
                >
                    <Trophy className="h-4 w-4 mr-2" />
                    All Time
                </Button>
            </div>

            {/* Your Rank */}
            {data?.userRank && (
                <Card className="mb-6 bg-primary/5">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <div className="font-medium">Your Ranking</div>
                                <div className="text-sm text-muted-foreground">
                                    Keep learning to climb higher!
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                                #{data.userRank}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {user?.totalXp.toLocaleString()} XP
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Leaderboard List */}
            <Card>
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="space-y-1 animate-shimmer">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-4 bg-muted rounded" />
                                        <div className="w-10 h-10 bg-muted rounded-full" />
                                        <div className="space-y-2">
                                            <div className="h-4 w-24 bg-muted rounded" />
                                            <div className="h-3 w-16 bg-muted rounded" />
                                        </div>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <div className="h-4 w-12 bg-muted rounded ml-auto" />
                                        <div className="h-3 w-8 bg-muted rounded ml-auto" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : data?.entries.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            No entries yet. Start learning to be first!
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {data?.entries.map((entry) => (
                                <div
                                    key={entry.user.id}
                                    className={`flex items-center justify-between p-4 transition-colors ${entry.user.id === user?.id ? 'bg-primary/5' : ''
                                        } ${getRankBg(entry.rank)}`}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Rank */}
                                        <div className="w-8 text-center">
                                            {getRankIcon(entry.rank) || (
                                                <span className="text-muted-foreground font-medium">
                                                    #{entry.rank}
                                                </span>
                                            )}
                                        </div>

                                        {/* Avatar */}
                                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                            {entry.user.avatarUrl ? (
                                                <img
                                                    src={entry.user.avatarUrl}
                                                    alt={entry.user.displayName}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <User className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>

                                        {/* Name */}
                                        <div>
                                            <div className="font-medium flex items-center gap-2">
                                                {entry.user.displayName}
                                                {entry.user.id === user?.id && (
                                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                                        You
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {entry.user.targetLanguage.toUpperCase()} • {entry.user.level}
                                            </div>
                                        </div>
                                    </div>

                                    {/* XP */}
                                    <div className="text-right">
                                        <div className="font-bold">{entry.xp.toLocaleString()}</div>
                                        <div className="text-xs text-muted-foreground">XP</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
