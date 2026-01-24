'use client';

import { useState } from 'react';
import { Card, CardContent, Button } from '@fluently/ui';
import {
    useDetailedHistory,
    getRelativeTime,
    TASK_LABELS,
    TASK_COLORS,
    type HistoryPeriod,
    type TaskTypeFilter,
} from '@/hooks';
import {
    Calendar,
    Clock,
    Filter,
    Star,
    Headphones,
    BookOpen,
    ChevronDown,
    Check,
    TrendingUp,
    Sparkles,
    ArrowLeft,
    History,
    PenLine,
} from 'lucide-react';
import Link from 'next/link';

// Period options for filtering
const PERIOD_OPTIONS: { value: HistoryPeriod; label: string; icon: React.ReactNode }[] = [
    { value: 'week', label: 'This Week', icon: <Calendar className="w-4 h-4" /> },
    { value: 'month', label: 'This Month', icon: <Calendar className="w-4 h-4" /> },
    { value: '3months', label: 'Last 3 Months', icon: <Calendar className="w-4 h-4" /> },
    { value: 'all', label: 'All Time', icon: <History className="w-4 h-4" /> },
];


// Task type filter options (excluding SPEAKING_SESSION - no content to review)
const TASK_TYPE_OPTIONS: { value: TaskTypeFilter; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All Activities', icon: <Sparkles className="w-4 h-4" /> },
    { value: 'PODCAST_LISTENING', label: 'Podcast Listening', icon: <Headphones className="w-4 h-4" /> },
    { value: 'CREATE_SENTENCES', label: 'Sentence Creation', icon: <PenLine className="w-4 h-4" /> },
    { value: 'DAY_RECAP', label: 'Day Recaps', icon: <BookOpen className="w-4 h-4" /> },
];

// Get task icon component
const getTaskIcon = (type: string, className = "w-4 h-4") => {
    switch (type) {
        case 'PODCAST_LISTENING': return <Headphones className={className} />;
        case 'CREATE_SENTENCES': return <PenLine className={className} />;
        case 'DAY_RECAP': return <BookOpen className={className} />;
        default: return <Sparkles className={className} />;
    }
};

export default function LearningHistoryPage() {
    const [period, setPeriod] = useState<HistoryPeriod>('month');
    const [taskType, setTaskType] = useState<TaskTypeFilter>('all');
    const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
    const [showTaskDropdown, setShowTaskDropdown] = useState(false);

    const { data: history, isLoading } = useDetailedHistory({ period, taskType });

    const selectedPeriod = PERIOD_OPTIONS.find(p => p.value === period)!;
    const selectedTaskType = TASK_TYPE_OPTIONS.find(t => t.value === taskType)!;

    return (
        <div className="container py-8 px-4 max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                        <History className="h-3 w-3" />
                        Learning Journey
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/profile">
                            <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">History</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Period Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowPeriodDropdown(!showPeriodDropdown);
                                setShowTaskDropdown(false);
                            }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface/50 hover:bg-surface transition-all text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                        >
                            {selectedPeriod.label}
                            <ChevronDown className={`w-3 h-3 transition-transform ${showPeriodDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showPeriodDropdown && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-surface border-none rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                {PERIOD_OPTIONS.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => { setPeriod(option.value); setShowPeriodDropdown(false); }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left text-xs font-bold hover:bg-muted/50 transition-colors ${period === option.value ? 'text-primary' : 'text-muted-foreground'}`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Filter Button */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowTaskDropdown(!showTaskDropdown);
                                setShowPeriodDropdown(false);
                            }}
                            className="p-2 rounded-xl bg-surface/50 hover:bg-surface transition-all text-muted-foreground"
                        >
                            <Filter className="w-4 h-4" />
                        </button>
                        {showTaskDropdown && (
                            <div className="absolute top-full right-0 mt-2 w-56 bg-surface border-none rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                {TASK_TYPE_OPTIONS.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => { setTaskType(option.value); setShowTaskDropdown(false); }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left text-xs font-bold hover:bg-muted/50 transition-colors ${taskType === option.value ? 'text-primary' : 'text-muted-foreground'}`}
                                    >
                                        {option.icon}
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={<Clock className="h-5 w-5" />}
                    value={history?.summary.totalSessions || 0}
                    label="Sessions"
                    color="text-blue-500"
                    bgColor="bg-blue-500/10"
                    isLoading={isLoading}
                />
                <StatCard
                    icon={<Star className="h-5 w-5" />}
                    value={history?.summary.totalXp || 0}
                    label="Total XP"
                    color="text-yellow-500"
                    bgColor="bg-yellow-500/10"
                    isLoading={isLoading}
                />
                <StatCard
                    icon={<Calendar className="h-5 w-5" />}
                    value={history?.summary.totalDays || 0}
                    label="Active Days"
                    color="text-green-500"
                    bgColor="bg-green-500/10"
                    isLoading={isLoading}
                />
                <StatCard
                    icon={<TrendingUp className="h-5 w-5" />}
                    value={history?.summary.totalDays ? Math.round(history.summary.totalXp / history.summary.totalDays) : 0}
                    label="Avg XP/Day"
                    color="text-purple-500"
                    bgColor="bg-purple-500/10"
                    isLoading={isLoading}
                />
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="font-black uppercase tracking-wider text-xs text-muted-foreground flex items-center gap-2">
                        <History className="h-3 w-3" />
                        Timeline
                    </h2>
                </div>

                <div className="grid gap-3">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-24 bg-muted/20 animate-shimmer rounded-2xl " />
                        ))
                    ) : history?.entries && history.entries.length > 0 ? (
                        history.entries.map((entry, idx) => (
                            <HistoryDayCard key={entry.id} entry={entry} isFirst={idx === 0} />
                        ))
                    ) : (
                        <div className="p-12 text-center bg-surface/30 rounded-3xl">
                            <History className="w-12 h-12 mx-auto mb-4 opacity-10" />
                            <p className="text-sm font-bold text-muted-foreground">No sessions recorded yet.</p>
                        </div>
                    )}
                </div>

                {history?.pagination?.hasMore && (
                    <div className="pt-4 text-center">
                        <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary">
                            Load More
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ icon, value, label, color, bgColor, isLoading }: any) {
    return (
        <div className="p-5 bg-surface/50 rounded-2xl flex flex-col gap-3">
            <div className={`w-10 h-10 ${bgColor} ${color} rounded-xl flex items-center justify-center`}>
                {icon}
            </div>
            <div>
                {isLoading ? (
                    <div className="h-7 w-16 bg-muted animate-shimmer rounded mb-1" />
                ) : (
                    <div className="text-2xl font-black tracking-tight">{value.toLocaleString()}</div>
                )}
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</div>
            </div>
        </div>
    );
}

function HistoryDayCard({ entry, isFirst }: any) {
    const [expanded, setExpanded] = useState(isFirst);

    return (
        <div className={`rounded-2xl overflow-hidden transition-all ${expanded ? 'bg-surface/50 shadow-sm' : 'bg-surface/30 hover:bg-surface/40'}`}>
            <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-4 p-4 text-left">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex flex-col items-center justify-center shrink-0">
                    <span className="text-sm font-black text-primary leading-none">{new Date(entry.date).getDate()}</span>
                    <span className="text-[8px] font-black uppercase text-muted-foreground mt-0.5">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm truncate">{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' })}</span>
                        <span className="text-[10px] text-muted-foreground opacity-40">•</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">{getRelativeTime(entry.date)}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {entry.tasks.map((task: any) => (
                            <div key={task.id} className={`w-6 h-6 rounded-lg ${TASK_COLORS[task.taskType] || 'bg-muted'} flex items-center justify-center transition-transform hover:scale-110`}>
                                {getTaskIcon(task.taskType, "w-3 h-3")}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                        <div className="text-lg font-black text-primary">+{entry.totalXp}</div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-40 leading-none">XP</div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${expanded ? 'rotate-180 text-primary' : ''}`} />
                </div>
            </button>

            {expanded && (entry.tasks.length > 0) && (
                <div className="px-4 pb-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                    {entry.tasks.map((task: any) => {
                        const metadata = task.metadata || {};
                        return (
                            <div key={task.id} className="p-4 rounded-xl bg-background/40 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg ${TASK_COLORS[task.taskType]} flex items-center justify-center`}>
                                            {getTaskIcon(task.taskType, "w-4 h-4")}
                                        </div>
                                        <span className="font-bold text-sm">{TASK_LABELS[task.taskType]}</span>
                                    </div>
                                    <span className="text-xs font-black">+{task.xpEarned} XP</span>
                                </div>

                                {task.taskType === 'PODCAST_LISTENING' && metadata.title && (
                                    <div className="pl-11 space-y-1">
                                        <div className="text-xs font-bold text-foreground">{metadata.title}</div>
                                        <div className="text-[11px] text-muted-foreground italic leading-relaxed">"{metadata.description}"</div>
                                    </div>
                                )}
                                {task.taskType === 'DAY_RECAP' && metadata.content && (
                                    <div className="pl-11 text-xs text-muted-foreground italic leading-relaxed">"{metadata.content}"</div>
                                )}
                                {task.taskType === 'CREATE_SENTENCES' && metadata.sentences && (
                                    <div className="pl-11 space-y-2">
                                        {metadata.sentences.map((s: string, i: number) => (
                                            <div key={i} className="flex gap-2 text-xs">
                                                <span className="text-primary font-black opacity-40">{i + 1}</span>
                                                <span className="text-muted-foreground">{s}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// Task colors moved to @/hooks/useHistory, which is imported above.

