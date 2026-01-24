'use client';

import { useState } from 'react';
import { Button } from '@fluently/ui';
import { useWeeklyLeaderboard, useAllTimeLeaderboard, useUser } from '@/hooks';
import { Trophy, TrendingUp, Crown, Medal, Award, User, Flame, Star, ChevronRight, Sprout, Leaf, TreeDeciduous } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const levelIcon: Record<string, React.ReactNode> = {
    BEGINNER: <Sprout className="h-3 w-3" />,
    INTERMEDIATE: <Leaf className="h-3 w-3" />,
    ADVANCED: <TreeDeciduous className="h-3 w-3" />,
};

export default function LeaderboardPage() {
    const [tab, setTab] = useState<'weekly' | 'all-time'>('weekly');
    const { data: currentUser } = useUser();
    const { data: weeklyData, isLoading: weeklyLoading } = useWeeklyLeaderboard();
    const { data: allTimeData, isLoading: allTimeLoading } = useAllTimeLeaderboard();

    const data = tab === 'weekly' ? weeklyData : allTimeData;
    const isLoading = tab === 'weekly' ? weeklyLoading : allTimeLoading;

    return (
        <div className="container py-8 px-4 max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                        <Trophy className="h-3 w-3" />
                        Leaderboard
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">Rankings</h1>
                </div>

                {/* Tab Switcher */}
                <div className="flex p-1 bg-surface/50 rounded-2xl w-full md:w-auto self-start md:self-auto">
                    <button
                        onClick={() => setTab('weekly')}
                        className={`
                            flex-1 md:px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                            ${tab === 'weekly' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}
                        `}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setTab('all-time')}
                        className={`
                            flex-1 md:px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                            ${tab === 'all-time' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}
                        `}
                    >
                        All Time
                    </button>
                </div>
            </div>

            {/* Top 3 Podium - Revamped for Mobile Efficiency */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-32 md:h-48 bg-surface/50 animate-shimmer rounded-3xl" />
                    ))
                ) : (
                    <>
                        {/* Desktop: Show Podium, Mobile: Show sleek cards */}
                        {[1, 0, 2].map((idx) => {
                            const entry = data?.entries[idx];
                            if (!entry) return null;
                            const isFirst = entry.rank === 1;
                            return (
                                <Link
                                    key={entry.user.id}
                                    href={`/dashboard/profile/${entry.user.id}`}
                                    className={`
                                        relative group flex md:flex-col items-center gap-4 md:gap-3 p-4 md:p-8 rounded-2xl md:rounded-3xl transition-all
                                        ${isFirst ? 'bg-primary/5 md:bg-primary/10 md:scale-105 z-10' : 'bg-surface/50'}
                                        hover:bg-surface border-none
                                    `}
                                >
                                    <div className="relative shrink-0">
                                        <div className={`
                                            w-14 h-14 md:w-24 md:h-24 bg-background rounded-2xl overflow-hidden flex items-center justify-center
                                            ${isFirst ? 'ring-2 ring-primary/20' : ''}
                                        `}>
                                            {entry.user.avatarUrl ? (
                                                <Image src={entry.user.avatarUrl} alt={entry.user.displayName} fill className="object-cover" />
                                            ) : (
                                                <User className="w-8 h-8 text-muted-foreground/20" />
                                            )}
                                        </div>
                                        <div className={`
                                            absolute -bottom-1.5 -right-1.5 w-7 h-7 md:w-10 md:h-10 rounded-lg flex items-center justify-center shadow-lg
                                            ${isFirst ? 'bg-yellow-500 text-black' : entry.rank === 2 ? 'bg-slate-400 text-white' : 'bg-amber-600 text-white'}
                                        `}>
                                            <span className="font-black text-xs md:text-base">{entry.rank}</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 md:text-center min-w-0">
                                        <h3 className="font-black text-sm md:text-xl truncate group-hover:text-primary transition-colors">
                                            {entry.user.displayName}
                                        </h3>
                                        <div className="flex items-center md:justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
                                            {levelIcon[entry.user.level]}
                                            {entry.user.level}
                                        </div>
                                        <div className="mt-1 md:mt-3">
                                            <span className="text-lg md:text-2xl font-black text-primary leading-none">
                                                {entry.xp.toLocaleString()}
                                            </span>
                                            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1.5">XP</span>
                                        </div>
                                    </div>

                                    <ChevronRight className="md:hidden w-4 h-4 text-muted-foreground opacity-20" />
                                </Link>
                            );
                        })}
                    </>
                )}
            </div>

            {/* Detailed Standings */}
            <div className="space-y-3">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-[10px] font-black uppercase tracking-[3px] text-muted-foreground opacity-40">Leaderboard Standings</h2>
                </div>

                <div className="grid gap-2">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-16 bg-surface/30 animate-shimmer rounded-2xl" />
                        ))
                    ) : (
                        data?.entries.slice(data.entries.length >= 3 ? 3 : 0).map((entry) => (
                            <Link
                                key={entry.user.id}
                                href={`/dashboard/profile/${entry.user.id}`}
                                className={`
                                    flex items-center justify-between p-3.5 px-4 rounded-2xl bg-surface/30 hover:bg-surface/60 transition-all border-none group
                                    ${entry.user.id === currentUser?.id ? 'bg-primary/5 ring-1 ring-primary/10' : ''}
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-6 text-center text-xs font-black text-muted-foreground opacity-40">
                                        {entry.rank}
                                    </div>

                                    <div className="w-10 h-10 bg-background rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                                        {entry.user.avatarUrl ? (
                                            <Image src={entry.user.avatarUrl} alt={entry.user.displayName} fill className="object-cover" />
                                        ) : (
                                            <User className="w-4 h-4 text-muted-foreground/20" />
                                        )}
                                    </div>

                                    <div>
                                        <div className="font-bold text-sm flex items-center gap-2 group-hover:text-primary transition-colors">
                                            {entry.user.displayName}
                                            {entry.user.id === currentUser?.id && (
                                                <span className="text-[8px] font-black bg-primary text-primary-foreground px-1.5 py-0.5 rounded-md uppercase">You</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground opacity-60">
                                            {entry.user.level}
                                            {(entry.user.currentStreak ?? 0) > 0 && (
                                                <span className="flex items-center gap-1 text-orange-500">
                                                    <Flame className="w-3 h-3 fill-orange-500/10" />
                                                    {entry.user.currentStreak}d
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-base font-black tracking-tight">{entry.xp.toLocaleString()}</div>
                                    <div className="text-[9px] font-black uppercase tracking-[1px] text-muted-foreground opacity-40">XP</div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            {/* Your Rank - Floating Footer on Mobile? For now just a subtle card */}
            {!isLoading && data?.userRank && (
                <div className="p-4 bg-primary text-primary-foreground rounded-2xl flex items-center justify-between shadow-xl shadow-primary/20">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black text-lg">
                            #{data.userRank}
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Current Rank</div>
                            <div className="font-black text-sm">Keep it up, {currentUser?.displayName}!</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-black">{currentUser?.totalXp.toLocaleString()}</div>
                        <div className="text-[9px] font-black uppercase tracking-widest opacity-60">Total XP</div>
                    </div>
                </div>
            )}
        </div>
    );
}
