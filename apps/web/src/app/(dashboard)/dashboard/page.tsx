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
    Loader2,
    Flame,
    Star,
    Trophy,
    Target,
    Languages,
} from 'lucide-react';
import { TaskDialog } from '@/features/routine/components/TaskDialog';

export default function DashboardPage() {
    const { data: user } = useUser();
    const { data: routine, isLoading } = useTodayRoutine();

    const [activeTask, setActiveTask] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenTask = (task: any) => {
        setActiveTask({ ...task, dailyLogId: routine?.id });
        setIsDialogOpen(true);
    };

    const completedCount = routine?.tasks.filter((t) => t.completed).length || 0;
    const totalTasks = routine?.tasks.length || 6;
    const progress = routine?.progress || 0;

    return (
        <div className="container py-8 px-4 max-w-4xl mx-auto">
            {/* Welcome & Stats */}
            <div className="mb-8">
                {isLoading ? (
                    <div className="space-y-4">
                        <div className="h-10 w-64 animate-shimmer rounded-xl" />
                        <div className="h-6 w-48 animate-shimmer rounded-lg" />
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-2 text-balance">
                            Welcome back, {user?.displayName?.split(' ')[0] || 'Learner'}! 👋
                        </h1>
                        <p className="text-muted-foreground">
                            {progress === 100
                                ? "Amazing! You've completed all tasks today! 🎉"
                                : `You're ${progress}% through today's routine. Keep going!`}
                        </p>
                    </>
                )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard
                    icon={<Flame className={`h-6 w-6 ${isLoading ? 'text-muted' : 'text-orange-500'}`} />}
                    value={user?.currentStreak || 0}
                    label="Day Streak"
                    isLoading={isLoading}
                />
                <StatCard
                    icon={<Star className={`h-6 w-6 ${isLoading ? 'text-muted' : 'text-yellow-500'}`} />}
                    value={user?.totalXp || 0}
                    label="Total XP"
                    isLoading={isLoading}
                />
                <StatCard
                    icon={<Trophy className={`h-6 w-6 ${isLoading ? 'text-muted' : 'text-primary'}`} />}
                    value={user?.longestStreak || 0}
                    label="Best Streak"
                    isLoading={isLoading}
                />
                <StatCard
                    icon={<Target className={`h-6 w-6 ${isLoading ? 'text-muted' : 'text-green-500'}`} />}
                    value={isLoading ? '--' : `${completedCount}/${totalTasks}`}
                    label="Tasks Today"
                    isLoading={isLoading}
                />
            </div>

            {/* Today's Routine */}
            <Card className={isLoading ? 'animate-shimmer' : ''}>
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h2 className="text-xl font-bold">Today's Routine</h2>
                            {isLoading ? (
                                <div className="h-4 w-32 bg-muted rounded mt-2" />
                            ) : (
                                <p className="text-muted-foreground text-sm mt-1">
                                    {routine?.date
                                        ? new Date(routine.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })
                                        : 'Today'}
                                </p>
                            )}
                        </div>
                        <div className="text-right">
                            <div className={`text-2xl font-bold ${isLoading ? 'text-muted' : 'text-primary'}`}>
                                {isLoading ? '--%' : `${progress}%`}
                            </div>
                            <div className="text-sm text-muted-foreground">Complete</div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 h-3 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <CardContent className="p-0">
                    <div className="divide-y divide-border">
                        {isLoading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full animate-shimmer" />
                                        <div className="space-y-2">
                                            <div className="h-4 w-40 animate-shimmer rounded" />
                                            <div className="h-3 w-20 animate-shimmer rounded" />
                                        </div>
                                    </div>
                                    <div className="w-20 h-9 animate-shimmer rounded-xl" />
                                </div>
                            ))
                        ) : (
                            routine?.tasks.map((task, index) => (
                                <div
                                    key={task.id}
                                    className={`flex items-center justify-between p-4 transition-colors ${task.completed ? 'bg-green-500/5' : 'hover:bg-muted/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${task.completed
                                                ? 'bg-green-500 text-white'
                                                : 'bg-muted text-muted-foreground'
                                                }`}
                                        >
                                            {task.completed ? <Check className="h-4 w-4" /> : index + 1}
                                        </div>
                                        <div>
                                            <h3
                                                className={`font-medium ${task.completed ? 'text-muted-foreground line-through' : ''
                                                    }`}
                                            >
                                                {getTaskName(task.taskType)}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                +{getTaskXp(task.taskType)} XP
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        variant={task.completed ? 'outline' : 'primary'}
                                        size="sm"
                                        onClick={() => handleOpenTask(task)}
                                    >
                                        {task.completed ? (
                                            <>
                                                <Languages className="h-4 w-4 mr-1" /> Review
                                            </>
                                        ) : (
                                            'Start'
                                        )}
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Total XP for today */}
            <div className="mt-6 text-center text-muted-foreground">
                <p>
                    Earn up to <span className="font-bold text-primary">300 XP</span> by
                    completing all tasks
                </p>
            </div>
            {/* Task Dialog */}
            <TaskDialog
                task={activeTask}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </div>
    );
}

function StatCard({
    icon,
    value,
    label,
    isLoading,
}: {
    icon: React.ReactNode;
    value: number | string;
    label: string;
    isLoading?: boolean;
}) {
    return (
        <Card className="p-4">
            <div className="flex items-center gap-3">
                {icon}
                <div>
                    {isLoading ? (
                        <div className="h-7 w-16 animate-shimmer rounded mb-1" />
                    ) : (
                        <div className="text-xl font-bold">
                            {typeof value === 'number' ? value.toLocaleString() : value}
                        </div>
                    )}
                    <div className="text-xs text-muted-foreground">{label}</div>
                </div>
            </div>
        </Card>
    );
}
