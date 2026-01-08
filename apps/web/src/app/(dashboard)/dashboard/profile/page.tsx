'use client';

import { Card, CardContent, CardHeader, CardTitle, Button } from '@fluently/ui';
import { useUser, useUserStats, useRoutineHistory, useAuth } from '@/hooks';
import {
    User,
    Flame,
    Star,
    Trophy,
    Target,
    Calendar,
    Award,
    TrendingUp,
    BookOpen,
    LogOut,
} from 'lucide-react';

export default function ProfilePage() {
    const { data: user, isLoading: userLoading } = useUser();
    const { data: stats, isLoading: statsLoading } = useUserStats();
    const { data: history } = useRoutineHistory(7);
    const { logout } = useAuth();

    if (userLoading || statsLoading) {
        return (
            <div className="container py-8 px-4 max-w-3xl mx-auto">
                <div className="animate-pulse space-y-4">
                    <div className="h-48 bg-muted rounded-xl" />
                    <div className="h-64 bg-muted rounded-xl" />
                </div>
            </div>
        );
    }

    const levelEmoji: Record<string, string> = {
        BEGINNER: '🌱',
        INTERMEDIATE: '🌿',
        ADVANCED: '🌳',
    };

    return (
        <div className="container py-8 px-4 max-w-3xl mx-auto">
            {/* Profile Header */}
            <Card className="overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-primary to-secondary" />
                <CardContent className="relative pt-0">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12">
                        {/* Avatar */}
                        <div className="w-24 h-24 bg-surface border-4 border-background rounded-full flex items-center justify-center">
                            {user?.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt={user.displayName}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <User className="h-12 w-12 text-muted-foreground" />
                            )}
                        </div>

                        <div className="text-center sm:text-left flex-1">
                            <h1 className="text-2xl font-bold">{user?.displayName}</h1>
                            <p className="text-muted-foreground">{user?.email}</p>
                        </div>

                        <Button variant="outline" onClick={logout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>

                    {/* Language & Level */}
                    <div className="flex flex-wrap gap-3 mt-6">
                        <div className="px-3 py-1.5 bg-primary/10 rounded-full text-sm">
                            <BookOpen className="h-4 w-4 inline mr-1" />
                            Learning {user?.targetLanguage?.toUpperCase()}
                        </div>
                        <div className="px-3 py-1.5 bg-muted rounded-full text-sm">
                            {levelEmoji[user?.level || 'BEGINNER']} {user?.level}
                        </div>
                        <div className="px-3 py-1.5 bg-muted rounded-full text-sm">
                            Native: {user?.nativeLanguage?.toUpperCase()}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <StatCard
                    icon={<Star className="h-6 w-6 text-yellow-500" />}
                    value={stats?.totalXp || 0}
                    label="Total XP"
                />
                <StatCard
                    icon={<Flame className="h-6 w-6 text-orange-500" />}
                    value={stats?.currentStreak || 0}
                    label="Current Streak"
                />
                <StatCard
                    icon={<Trophy className="h-6 w-6 text-primary" />}
                    value={stats?.longestStreak || 0}
                    label="Best Streak"
                />
                <StatCard
                    icon={<Target className="h-6 w-6 text-green-500" />}
                    value={`${Math.round(stats?.completionRate || 0)}%`}
                    label="Completion"
                />
            </div>

            {/* Achievements */}
            {stats?.titles && stats.titles.length > 0 && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Achievements
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            {stats.titles.map((title: { name: string; icon: string }) => (
                                <div
                                    key={title.name}
                                    className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full"
                                >
                                    <span className="text-xl">{title.icon}</span>
                                    <span className="font-medium">{title.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Recent Activity */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {history && history.length > 0 ? (
                        <div className="space-y-3">
                            {history.map((day) => (
                                <div
                                    key={day.id}
                                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                >
                                    <div>
                                        <div className="font-medium">
                                            {new Date(day.date).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {day.tasksCompleted}/{day.totalTasks} tasks completed
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-primary">+{day.totalXp} XP</div>
                                        <div className="text-xs text-muted-foreground">
                                            {Math.round((day.tasksCompleted / day.totalTasks) * 100)}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center py-8">
                            No activity yet. Start learning today!
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Account Info */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Account Stats
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm text-muted-foreground">Total Days</div>
                            <div className="text-xl font-bold">{stats?.totalDays || 0}</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Days Completed</div>
                            <div className="text-xl font-bold">{stats?.completedDays || 0}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
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
            <div className="flex flex-col items-center text-center gap-2">
                {icon}
                <div className="text-2xl font-bold">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </div>
                <div className="text-xs text-muted-foreground">{label}</div>
            </div>
        </Card>
    );
}
