'use client';

import { useState } from 'react';
import { Card, CardContent, Button } from '@fluently/ui';
import {
    useTodayRoutine,
    useUser,
    getTaskName,
    getTaskXp,
} from '@/hooks';
import {
    Check,
    Flame,
    Star,
    Trophy,
    Target,
    Languages,
    Headset,
    Mic2,
    PenLine,
    BookText,
    TrendingUp,
    ChevronRight,
} from 'lucide-react';
import { TaskDialog } from '@/features/routine/components/TaskDialog';

const TASK_ICONS: Record<string, React.ReactNode> = {
    PODCAST_LISTENING: <Headset className="h-5 w-5" />,
    SPEAKING_SESSION: <Mic2 className="h-5 w-5" />,
    CREATE_SENTENCES: <PenLine className="h-5 w-5" />,
    DAY_RECAP: <BookText className="h-5 w-5" />,
};

const TASK_COLORS: Record<string, string> = {
    PODCAST_LISTENING: 'text-blue-500 bg-blue-500/10',
    SPEAKING_SESSION: 'text-purple-500 bg-purple-500/10',
    CREATE_SENTENCES: 'text-orange-500 bg-orange-500/10',
    DAY_RECAP: 'text-green-500 bg-green-500/10',
};

export default function DashboardPage() {
    const { data: user } = useUser();
    const { data: routine, isLoading } = useTodayRoutine();

    const [activeTask, setActiveTask] = useState<any>(null);
    const [isDialogOpen] = useState(false);
    // Since we need to keep the dialog open state stable, let's use a proper state
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenTask = (task: any) => {
        setActiveTask({ ...task, dailyLogId: routine?.id });
        setDialogOpen(true);
    };

    const completedCount = routine?.tasks.filter((t) => t.completed).length || 0;
    const totalTasks = routine?.tasks.length || 0;
    const progress = routine?.progress || 0;

    return (
        <div className="container py-8 px-4 max-w-4xl mx-auto space-y-8 ">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                        <TrendingUp className="h-3 w-3" />
                        Daily Progress
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                        Hello, <span className="text-primary">{user?.displayName?.split(' ')[0] || 'Learner'}</span>
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {progress === 100
                            ? "You've crushed all your goals for today! 🚀"
                            : `You've completed ${completedCount} out of ${totalTasks} tasks today.`}
                    </p>
                </div>

                <div className="hidden md:block text-right">
                    <div className="text-4xl font-black text-primary">{progress}%</div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Overall Completion</div>
                </div>
            </div>

            {/* Quick Stats - Flat Design */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={<Flame className="h-5 w-5" />}
                    value={user?.currentStreak || 0}
                    label="Day Streak"
                    color="text-orange-500"
                    bgColor="bg-orange-500/10"
                    isLoading={isLoading}
                />
                <StatCard
                    icon={<Star className="h-5 w-5" />}
                    value={user?.totalXp || 0}
                    label="Points"
                    color="text-yellow-500"
                    bgColor="bg-yellow-500/10"
                    isLoading={isLoading}
                />
                <StatCard
                    icon={<Trophy className="h-5 w-5" />}
                    value={user?.longestStreak || 0}
                    label="Best"
                    color="text-primary"
                    bgColor="bg-primary/10"
                    isLoading={isLoading}
                />
                <StatCard
                    icon={<Target className="h-5 w-5" />}
                    value={isLoading ? '--' : `${completedCount}/${totalTasks}`}
                    label="Tasks"
                    color="text-green-500"
                    bgColor="bg-green-500/10"
                    isLoading={isLoading}
                />
            </div>

            {/* Main Routine Card */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="font-black uppercase tracking-wider text-xs text-muted-foreground flex items-center gap-2">
                        <CalendarIcon className="h-3 w-3" />
                        Today's Tasks
                    </h2>
                    {!isLoading && (
                        <span className="text-[10px] font-bold text-muted-foreground opacity-60">
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    )}
                </div>

                <div className="grid gap-3">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-20 bg-muted/20 rounded-2xl " />
                        ))
                    ) : (
                        routine?.tasks.map((task) => (
                            <div
                                key={task.id}
                                onClick={() => handleOpenTask(task)}
                                className={`
                                    group flex items-center justify-between p-4 rounded-2xl  cursor-pointer
                                    ${task.completed
                                        ? 'bg-muted/10 opacity-60'
                                        : 'bg-surface/50 border border-transparent hover:border-primary/20 hover:bg-surface'}
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`
                                        w-12 h-12 rounded-xl flex items-center justify-center  group-hover:scale-110
                                        ${task.completed ? 'bg-muted text-muted-foreground' : TASK_COLORS[task.taskType]}
                                    `}>
                                        {task.completed ? <Check className="h-5 w-5" /> : TASK_ICONS[task.taskType]}
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                            {getTaskName(task.taskType)}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-primary">+{getTaskXp(task.taskType)} XP</span>
                                            <span className="text-[10px] text-muted-foreground">•</span>
                                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Daily Goal</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {task.completed ? (
                                        <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-md uppercase tracking-widest">
                                            Done
                                        </span>
                                    ) : (
                                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 " />
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Bottom Info */}
            <div className="pt-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <p className="text-xs font-bold text-muted-foreground">
                        Earn up to <span className="text-primary font-black">200 XP</span> by completing everything
                    </p>
                </div>
            </div>

            {/* Task Dialog */}
            <TaskDialog
                task={activeTask}
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />
        </div>
    );
}

function StatCard({
    icon,
    value,
    label,
    color,
    bgColor,
    isLoading,
}: {
    icon: React.ReactNode;
    value: number | string;
    label: string;
    color: string;
    bgColor: string;
    isLoading?: boolean;
}) {
    return (
        <div className="p-5 bg-surface/50 rounded-2xl flex flex-col gap-3 group">
            <div className={`w-10 h-10 ${bgColor} ${color} rounded-xl flex items-center justify-center  group-hover:rotate-6`}>
                {icon}
            </div>
            <div>
                {isLoading ? (
                    <div className="h-7 w-16  bg-muted rounded mb-1" />
                ) : (
                    <div className="text-2xl font-black tracking-tight">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </div>
                )}
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</div>
            </div>
        </div>
    );
}

function CalendarIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}
