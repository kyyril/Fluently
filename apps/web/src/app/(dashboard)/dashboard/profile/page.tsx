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
    MapPin,
} from 'lucide-react';
import countries from 'world-countries';

export default function ProfilePage() {
    const { data: user, isLoading: userLoading } = useUser();
    const { data: stats, isLoading: statsLoading } = useUserStats();
    const { data: history } = useRoutineHistory(7);
    const { logout } = useAuth();

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
                        <div className="w-24 h-24 bg-surface border-4 border-background rounded-full flex items-center justify-center relative overflow-hidden">
                            {userLoading ? (
                                <div className="absolute inset-0 animate-shimmer" />
                            ) : user?.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt={user.displayName}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <User className="h-12 w-12 text-muted-foreground" />
                            )}
                        </div>

                        {userLoading ? (
                            <div className="text-center sm:text-left flex-1 min-w-0 space-y-3 py-2">
                                <div className="h-8 w-56 animate-shimmer rounded-lg" />
                                <div className="h-5 w-72 animate-shimmer rounded-md" />
                            </div>
                        ) : (
                            <div className="text-center sm:text-left flex-1 min-w-0">
                                <h1 className="text-2xl font-bold truncate">{user?.displayName}</h1>
                                <p className="text-muted-foreground truncate">{user?.email}</p>
                            </div>
                        )}

                        <Button variant="outline" onClick={logout} className="shrink-0 mb-1">
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>

                    {/* Language & Level */}
                    <div className="flex flex-wrap gap-3 mt-6">
                        {userLoading ? (
                            <>
                                <div className="h-8 w-24 animate-shimmer rounded-full" />
                                <div className="h-8 w-32 animate-shimmer rounded-full" />
                                <div className="h-8 w-24 animate-shimmer rounded-full" />
                            </>
                        ) : (
                            <>
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
                                {user?.country && (
                                    <div className="px-3 py-1.5 bg-muted rounded-full text-sm">
                                        <MapPin className="h-4 w-4 inline mr-1" />
                                        {countries.find(c => c.name.common === user.country)?.flag} {user.country}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <ProfileStatCard
                    icon={<Star className="h-6 w-6 text-yellow-500" />}
                    value={stats?.totalXp || 0}
                    label="Total XP"
                    isLoading={statsLoading}
                />
                <ProfileStatCard
                    icon={<Flame className="h-6 w-6 text-orange-500" />}
                    value={stats?.currentStreak || 0}
                    label="Current Streak"
                    isLoading={statsLoading}
                />
                <ProfileStatCard
                    icon={<Trophy className="h-6 w-6 text-primary" />}
                    value={stats?.longestStreak || 0}
                    label="Best Streak"
                    isLoading={statsLoading}
                />
                <ProfileStatCard
                    icon={<Target className="h-6 w-6 text-green-500" />}
                    value={statsLoading ? '--' : `${Math.round(stats?.completionRate || 0)}%`}
                    label="Completion"
                    isLoading={statsLoading}
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
                                            {Math.round((day.tasksCompleted / (day.totalTasks || 1)) * 100)}%
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

function ProfileStatCard({
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
            <div className="flex flex-col items-center text-center gap-2">
                {icon}
                {isLoading ? (
                    <div className="h-9 w-20 animate-shimmer rounded my-0.5" />
                ) : (
                    <div className="text-2xl font-bold">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </div>
                )}
                <div className="text-xs text-muted-foreground">{label}</div>
            </div>
        </Card>
    );
}
