'use client';

import { useState } from 'react';
import { Card, CardContent, Button } from '@fluently/ui';
import {
    useDetailedHistory,
    getRelativeTime,
    TASK_LABELS,
    TASK_ICONS,
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
    PenTool,
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
    { value: 'CREATE_SENTENCES', label: 'Sentence Creation', icon: <PenTool className="w-4 h-4" /> },
    { value: 'DAY_RECAP', label: 'Day Recaps', icon: <BookOpen className="w-4 h-4" /> },
];

export default function LearningHistoryPage() {
    const [period, setPeriod] = useState<HistoryPeriod>('month');
    const [taskType, setTaskType] = useState<TaskTypeFilter>('all');
    const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
    const [showTaskDropdown, setShowTaskDropdown] = useState(false);

    const { data: history, isLoading } = useDetailedHistory({ period, taskType });

    const selectedPeriod = PERIOD_OPTIONS.find(p => p.value === period)!;
    const selectedTaskType = TASK_TYPE_OPTIONS.find(t => t.value === taskType)!;

    // Get task icon component
    const getTaskIcon = (type: string) => {
        switch (type) {
            case 'PODCAST_LISTENING': return <Headphones className="w-4 h-4" />;
            case 'CREATE_SENTENCES': return <PenTool className="w-4 h-4" />;
            case 'DAY_RECAP': return <BookOpen className="w-4 h-4" />;
            default: return <Sparkles className="w-4 h-4" />;
        }
    };

    return (
        <div className="container py-8 px-4 max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/profile">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Profile
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Learning History</h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Review your learning journey and revisit past sessions
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                {/* Period Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowPeriodDropdown(!showPeriodDropdown);
                            setShowTaskDropdown(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface/50 backdrop-blur-sm border border-white/5 hover:bg-muted/50 transition-all text-sm font-medium"
                    >
                        {selectedPeriod.icon}
                        {selectedPeriod.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${showPeriodDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showPeriodDropdown && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            {PERIOD_OPTIONS.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setPeriod(option.value);
                                        setShowPeriodDropdown(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm hover:bg-muted/50 transition-colors ${period === option.value ? 'bg-primary/10 text-primary' : ''
                                        }`}
                                >
                                    {option.icon}
                                    {option.label}
                                    {period === option.value && <Check className="w-4 h-4 ml-auto" />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Task Type Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowTaskDropdown(!showTaskDropdown);
                            setShowPeriodDropdown(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface/50 backdrop-blur-sm border border-white/5 hover:bg-muted/50 transition-all text-sm font-medium"
                    >
                        <Filter className="w-4 h-4" />
                        {selectedTaskType.label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${showTaskDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showTaskDropdown && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-surface border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            {TASK_TYPE_OPTIONS.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setTaskType(option.value);
                                        setShowTaskDropdown(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm hover:bg-muted/50 transition-colors ${taskType === option.value ? 'bg-primary/10 text-primary' : ''
                                        }`}
                                >
                                    {option.icon}
                                    {option.label}
                                    {taskType === option.value && <Check className="w-4 h-4 ml-auto" />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Summary Stats */}
            {history?.summary && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <SummaryCard
                        icon={<Clock className="w-5 h-5" />}
                        value={history.summary.totalSessions}
                        label="Total Sessions"
                        color="text-blue-500"
                        bg="bg-blue-500/10"
                        isLoading={isLoading}
                    />
                    <SummaryCard
                        icon={<Star className="w-5 h-5" />}
                        value={history.summary.totalXp}
                        label="XP Earned"
                        color="text-yellow-500"
                        bg="bg-yellow-500/10"
                        isLoading={isLoading}
                    />
                    <SummaryCard
                        icon={<Calendar className="w-5 h-5" />}
                        value={history.summary.totalDays}
                        label="Active Days"
                        color="text-green-500"
                        bg="bg-green-500/10"
                        isLoading={isLoading}
                    />
                    <SummaryCard
                        icon={<TrendingUp className="w-5 h-5" />}
                        value={history.summary.totalDays > 0
                            ? Math.round(history.summary.totalXp / history.summary.totalDays)
                            : 0}
                        label="Avg XP/Day"
                        color="text-purple-500"
                        bg="bg-purple-500/10"
                        isLoading={isLoading}
                    />
                </div>
            )}

            {/* Task Type Breakdown */}
            {history?.summary?.taskBreakdown && Object.keys(history.summary.taskBreakdown).length > 0 && (
                <Card className="bg-surface/50 backdrop-blur-sm border-none overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold">Activity Breakdown</h3>
                                <p className="text-xs text-muted-foreground">Your learning activities by type</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.entries(history.summary.taskBreakdown).map(([type, data]) => {
                                const colors = TASK_COLORS[type] || { text: 'text-primary', bg: 'bg-primary/10' };
                                return (
                                    <div key={type} className={`flex items-center gap-3 p-4 rounded-2xl ${colors.bg}`}>
                                        <div className={`${colors.text}`}>
                                            {getTaskIcon(type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-muted-foreground truncate">
                                                {TASK_LABELS[type] || type}
                                            </p>
                                            <p className={`text-lg font-black ${colors.text}`}>
                                                {data.count} <span className="text-xs font-medium text-muted-foreground">sessions</span>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* History Timeline */}
            <Card className="bg-surface/50 backdrop-blur-sm border-none overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <History className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-bold">Your Learning Timeline</h3>
                            <p className="text-xs text-muted-foreground">
                                {history?.pagination?.total || 0} days of learning history
                            </p>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-24 bg-muted/30 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : history?.entries && history.entries.length > 0 ? (
                        <div className="space-y-4">
                            {history.entries.map((entry, idx) => (
                                <HistoryDayCard key={entry.id} entry={entry} isFirst={idx === 0} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-muted-foreground">
                            <History className="h-16 w-16 mx-auto mb-4 opacity-20" />
                            <p className="text-lg font-medium">No learning history yet</p>
                            <p className="text-sm mt-2">Complete some tasks to see your progress here!</p>
                            <Link href="/dashboard">
                                <Button variant="primary" size="sm" className="mt-6">
                                    Start Learning
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Load more */}
                    {history?.pagination?.hasMore && (
                        <div className="mt-6 text-center">
                            <Button variant="secondary" size="sm">
                                Load More History
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

// Summary Card Component
function SummaryCard({
    icon,
    value,
    label,
    color,
    bg,
    isLoading,
}: {
    icon: React.ReactNode;
    value: number;
    label: string;
    color: string;
    bg: string;
    isLoading?: boolean;
}) {
    return (
        <Card padding="none" className="bg-surface/50 backdrop-blur-sm border-none overflow-hidden">
            <CardContent className="p-5">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center ${color} mb-3`}>
                    {icon}
                </div>
                {isLoading ? (
                    <div className="h-8 w-16 bg-muted rounded animate-pulse" />
                ) : (
                    <div className="text-2xl font-black tracking-tight">{value.toLocaleString()}</div>
                )}
                <div className="text-xs text-muted-foreground mt-1 font-medium">{label}</div>
            </CardContent>
        </Card>
    );
}

// History Day Card Component
function HistoryDayCard({
    entry,
    isFirst,
}: {
    entry: {
        id: string;
        date: string;
        totalXp: number;
        tasksCompleted: number;
        totalTasks: number;
        dayRecap: string | null;
        tasks: {
            id: string;
            taskType: string;
            completed: boolean;
            completedAt: string | null;
            xpEarned: number;
            metadata: Record<string, unknown> | null;
        }[];
    };
    isFirst: boolean;
}) {
    const [expanded, setExpanded] = useState(isFirst);
    const progress = Math.round((entry.tasksCompleted / entry.totalTasks) * 100);

    return (
        <div
            className="group bg-muted/20 hover:bg-muted/30 rounded-2xl transition-all duration-300 overflow-hidden border border-white/5"
        >
            {/* Header Row */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center gap-4 p-4 text-left"
            >
                {/* Date Badge */}
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-primary/10 rounded-xl shrink-0">
                    <span className="text-lg font-black text-primary">
                        {new Date(entry.date).getDate()}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">
                        {new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">
                            {new Date(entry.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                            })}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {getRelativeTime(entry.date)}
                        </span>
                    </div>

                    {/* Task Pills */}
                    <div className="flex flex-wrap gap-1.5">
                        {entry.tasks.map(task => {
                            const colors = TASK_COLORS[task.taskType] || { text: 'text-primary', bg: 'bg-primary/10' };
                            return (
                                <span
                                    key={task.id}
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${colors.bg} ${colors.text}`}
                                >
                                    {TASK_ICONS[task.taskType] || '✨'} {TASK_LABELS[task.taskType] || task.taskType}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* Progress + XP */}
                <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex flex-col items-end">
                        <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1">
                            {entry.tasksCompleted}/{entry.totalTasks} tasks
                        </span>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-black text-primary">+{entry.totalXp}</div>
                        <div className="text-[10px] text-muted-foreground">XP</div>
                    </div>
                    <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`}
                    />
                </div>
            </button>

            {/* Expanded Content */}
            {expanded && (
                <div className="px-4 pb-4 pt-0 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="pt-4 space-y-3">
                        {entry.tasks.map(task => {
                            const colors = TASK_COLORS[task.taskType] || { text: 'text-primary', bg: 'bg-primary/10' };
                            const metadata = task.metadata as Record<string, unknown> | null;

                            return (
                                <div
                                    key={task.id}
                                    className={`flex items-start gap-4 p-4 rounded-xl ${colors.bg}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center ${colors.text} shrink-0`}>
                                        {TASK_ICONS[task.taskType] || '✨'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`font-bold ${colors.text}`}>
                                                {TASK_LABELS[task.taskType] || task.taskType}
                                            </span>
                                            <span className="text-sm font-black">+{task.xpEarned} XP</span>
                                        </div>

                                        {/* Metadata display based on task type */}
                                        <div className="text-xs text-muted-foreground space-y-2">
                                            {task.completedAt && (
                                                <p className="flex items-center gap-1 opacity-60">
                                                    <Clock className="w-3 h-3" />
                                                    Completed at{' '}
                                                    {new Date(task.completedAt).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            )}

                                            {/* Podcast content */}
                                            {task.taskType === 'PODCAST_LISTENING' && !!metadata?.title && (
                                                <div className="mt-2 p-3 rounded-lg bg-background/50">
                                                    <p className="font-bold text-foreground font-medium">{metadata.title as string}</p>
                                                    {!!metadata.description && (
                                                        <p className="text-muted-foreground mt-1 text-[11px] leading-relaxed italic">{metadata.description as string}</p>
                                                    )}
                                                </div>
                                            )}

                                            {/* Day Recap content */}
                                            {task.taskType === 'DAY_RECAP' && !!metadata?.content && (
                                                <div className="mt-2 p-3 rounded-lg bg-background/50">
                                                    <p className="text-foreground whitespace-pre-wrap leading-relaxed italic">"{metadata.content as string}"</p>
                                                </div>
                                            )}

                                            {/* Sentences content */}
                                            {task.taskType === 'CREATE_SENTENCES' && !!metadata?.sentences && (
                                                <div className="mt-2 p-3 rounded-lg bg-background/50 space-y-2">
                                                    <div className="flex items-center gap-1.5 text-primary/80 mb-1">
                                                        <PenLine className="w-3 h-3" />
                                                        <span className="text-[10px] font-black uppercase tracking-wider">Practice Sentences</span>
                                                    </div>
                                                    {(metadata.sentences as string[]).map((s, i) => (
                                                        <p key={i} className="text-foreground flex gap-2 leading-relaxed">
                                                            <span className="text-primary/40 font-black tabular-nums">{i + 1}</span>
                                                            <span>{s}</span>
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Day Recap Content */}
                        {entry.dayRecap && (
                            <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <BookOpen className="w-4 h-4 text-green-500" />
                                    <span className="font-bold text-green-500 text-sm">Your Day Recap</span>
                                </div>
                                <p className="text-sm text-foreground/80 whitespace-pre-wrap">
                                    {entry.dayRecap}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
