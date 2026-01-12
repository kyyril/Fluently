'use client';

import { useState } from 'react';
import { Card, CardContent, Button } from '@fluently/ui';
import { useWeeklyLeaderboard, useAllTimeLeaderboard, useUser } from '@/hooks';
import { Trophy, TrendingUp, Crown, Medal, Award, User, Flame, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';

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

    const getRankStyle = (rank: number) => {
        switch (rank) {
            case 1:
                return 'bg-yellow-500/5 border-yellow-500/10';
            case 2:
                return 'bg-slate-400/5 border-slate-400/10';
            case 3:
                return 'bg-amber-600/5 border-amber-600/10';
            default:
                return 'bg-surface/30 border-transparent hover:bg-surface/50';
        }
    };

    const levelEmoji: Record<string, string> = {
        BEGINNER: '🌱',
        INTERMEDIATE: '🌿',
        ADVANCED: '🌳',
    };

    return (
        <div className="container py-8 px-4 max-w-4xl mx-auto space-y-6 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                        <Trophy className="h-3 w-3" />
                        Rankings
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                        Leader<span className="text-primary">board</span>
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Compete with learners around the world
                    </p>
                </div>

                {/* Your Rank Card - Integrated */}
                {data?.userRank && (
                    <div className="bg-primary/5 rounded-2xl p-4 flex items-center gap-4 min-w-[200px]">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <span className="text-lg font-black text-primary">#{data.userRank}</span>
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Your Rank</div>
                            <div className="text-lg font-black flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                {user?.totalXp.toLocaleString()} XP
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Tab Switcher - Cleaner */}
            <div className="flex gap-2 p-1.5 bg-muted/30 rounded-2xl w-full sm:w-fit">
                <button
                    onClick={() => setTab('weekly')}
                    className={`
                        flex-1 sm:px-8 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2
                        ${tab === 'weekly'
                            ? 'bg-background text-primary shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'}
                    `}
                >
                    <TrendingUp className="h-4 w-4" />
                    This Week
                </button>
                <button
                    onClick={() => setTab('all-time')}
                    className={`
                        flex-1 sm:px-8 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2
                        ${tab === 'all-time'
                            ? 'bg-background text-primary shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'}
                    `}
                >
                    <Trophy className="h-4 w-4" />
                    All Time
                </button>
            </div>

            {/* Top 3 Podium - Improved layout and spacing */}
            {!isLoading && data?.entries && data.entries.length >= 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                    {[1, 0, 2].map((index) => {
                        const entry = data.entries[index];
                        if (!entry) return null;
                        const isFirst = index === 0;
                        return (
                            <Link
                                key={entry.user.id}
                                href={`/dashboard/profile/${entry.user.id}`}
                                className={`
                                    flex flex-col items-center p-6 rounded-3xl transition-all group
                                    ${isFirst ? 'bg-yellow-500/10 order-first sm:order-none sm:scale-110 sm:z-10' : 'bg-surface/40 order-last sm:order-none'}
                                    hover:bg-opacity-100 hover:scale-[1.03] duration-300
                                `}
                            >
                                <div className="relative mb-4">
                                    <div className={`
                                        w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden
                                        ${isFirst ? 'ring-4 ring-yellow-500/30' : 'ring-2 ring-muted'}
                                    `}>
                                        {entry.user.avatarUrl ? (
                                            <img
                                                src={entry.user.avatarUrl}
                                                alt={entry.user.displayName}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="h-10 w-10 text-muted-foreground/30" />
                                        )}
                                    </div>
                                    <div className={`
                                        absolute -bottom-2 -right-2 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg
                                        ${isFirst ? 'bg-yellow-500 text-black' : index === 1 ? 'bg-slate-400 text-white' : 'bg-amber-600 text-white'}
                                    `}>
                                        <span className="font-black text-base">{entry.rank}</span>
                                    </div>
                                </div>
                                <div className="text-center space-y-1">
                                    <div className="font-black text-lg truncate max-w-[140px] group-hover:text-primary transition-colors">
                                        {entry.user.displayName}
                                    </div>
                                    <div className="text-xs font-bold text-muted-foreground flex items-center justify-center gap-1">
                                        {levelEmoji[entry.user.level]} {entry.user.level}
                                    </div>
                                    <div className="pt-2">
                                        <span className="text-xl font-black text-primary tracking-tight">
                                            {entry.xp.toLocaleString()}
                                        </span>
                                        <span className="text-[10px] font-black text-muted-foreground ml-1 uppercase">XP</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* List Header */}
            <div className="flex items-center justify-between px-2 pt-4">
                <h2 className="font-black uppercase tracking-wider text-[10px] text-muted-foreground">Detailed Standings</h2>
                <span className="text-[10px] font-bold text-muted-foreground opacity-50">View all learners</span>
            </div>

            {/* Main Leaderboard List */}
            <div className="grid gap-2">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-20 bg-muted/10 rounded-2xl animate-pulse" />
                    ))
                ) : (
                    (data?.entries || []).slice((data?.entries?.length || 0) >= 3 ? 3 : 0).map((entry) => (
                        <Link
                            key={entry.user.id}
                            href={`/dashboard/profile/${entry.user.id}`}
                            className={`
                                flex items-center justify-between p-4 rounded-2xl border transition-all group
                                ${getRankStyle(entry.rank)}
                                ${entry.user.id === user?.id ? 'border-primary/20 ring-1 ring-primary/5' : ''}
                            `}
                        >
                            <div className="flex items-center gap-4">
                                {/* Rank */}
                                <div className="w-8 flex justify-center">
                                    {getRankIcon(entry.rank) || (
                                        <span className="text-muted-foreground font-black text-sm opacity-50">
                                            {entry.rank}
                                        </span>
                                    )}
                                </div>

                                {/* Avatar */}
                                <div className="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center overflow-hidden border border-white/5">
                                    {entry.user.avatarUrl ? (
                                        <img
                                            src={entry.user.avatarUrl}
                                            alt={entry.user.displayName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="h-6 w-6 text-muted-foreground/40" />
                                    )}
                                </div>

                                {/* Info */}
                                <div>
                                    <div className="font-bold flex items-center gap-2 group-hover:text-primary transition-colors">
                                        {entry.user.displayName}
                                        {entry.user.id === user?.id && (
                                            <span className="text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-md font-black">
                                                YOU
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 mt-0.5">
                                        <span>{levelEmoji[entry.user.level]} {entry.user.level}</span>
                                        {(entry.user.currentStreak ?? 0) > 0 && (
                                            <span className="flex items-center gap-0.5 text-orange-500">
                                                <Flame className="h-3 w-3 fill-orange-500/20" />
                                                {entry.user.currentStreak}d
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Score & Navigation */}
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <div className="font-black text-lg tracking-tight">{entry.xp.toLocaleString()}</div>
                                    <div className="text-[9px] text-muted-foreground font-black uppercase tracking-tighter">XP Points</div>
                                </div>
                                <div className="hidden sm:block">
                                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
