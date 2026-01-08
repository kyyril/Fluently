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
} from 'lucide-react';
import { TaskDialog } from '@/features/routine/components/TaskDialog';

export default function DashboardPage() {
    const { data: user } = useUser();
    const { data: routine, isLoading } = useTodayRoutine();

    const [activeTask, setActiveTask] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenTask = (task: any) => {
        if (task.completed) return;
        setActiveTask({ ...task, dailyLogId: routine?.id });
        setIsDialogOpen(true);
    };

    if (isLoading) {
        return (
            <div className="container py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-32 bg-muted rounded-xl" />
                    <div className="h-64 bg-muted rounded-xl" />
                </div>
            </div>
        );
    }

    const completedCount = routine?.tasks.filter((t) => t.completed).length || 0;
    const totalTasks = routine?.tasks.length || 6;
    const progress = routine?.progress || 0;

    return (
        <div className="container py-8 px-4 max-w-4xl mx-auto">
            {/* Welcome & Stats */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {user?.displayName?.split(' ')[0]}! 👋
                </h1>
                <p className="text-muted-foreground">
                    {progress === 100
                        ? "Amazing! You've completed all tasks today! 🎉"
                        : `You're ${progress}% through today's routine. Keep going!`}
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard
                    icon={<Flame className="h-6 w-6 text-orange-500" />}
                    value={user?.currentStreak || 0}
                    label="Day Streak"
                />
                <StatCard
                    icon={<Star className="h-6 w-6 text-yellow-500" />}
                    value={user?.totalXp || 0}
                    label="Total XP"
                />
                <StatCard
                    icon={<Trophy className="h-6 w-6 text-primary" />}
                    value={user?.longestStreak || 0}
                    label="Best Streak"
                />
                <StatCard
                    icon={<Target className="h-6 w-6 text-green-500" />}
                    value={`${completedCount}/${totalTasks}`}
                    label="Tasks Today"
                />
            </div>

            {/* Today's Routine */}
            <Card>
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">Today's Routine</h2>
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
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{progress}%</div>
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
                        {routine?.tasks.map((task, index) => (
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
                                    variant={task.completed ? 'ghost' : 'primary'}
                                    size="sm"
                                    disabled={task.completed}
                                    onClick={() => handleOpenTask(task)}
                                >
                                    {task.completed ? (
                                        <>
                                            <Check className="h-4 w-4 mr-1" /> Done
                                        </>
                                    ) : (
                                        'Start'
                                    )}
                                </Button>
                            </div>
                        ))}
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
}: {
    icon: React.ReactNode;
    value: number | string;
    label: string;
}) {
    return (
        <Card className="p-4">
            <div className="flex items-center gap-3">
                {icon}
                <div>
                    <div className="text-xl font-bold">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                </div>
            </div>
        </Card>
    );
}
