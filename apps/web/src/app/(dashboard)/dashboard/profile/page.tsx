'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, Button } from '@fluently/ui';
import { useUser, useUserStats, useRoutineHistory, useAuth } from '@/hooks';
import {
    User,
    Flame,
    Star,
    Trophy,
    Target,
    Calendar,
    Award,
    BookOpen,
    LogOut,
    Edit,
    Zap,
    CheckCircle2,
    ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
    const params = useParams();
    const userId = params.id as string;
    const isPublic = !!userId;

    const { data: user, isLoading: userLoading } = useUser(userId);
    const { data: stats, isLoading: statsLoading } = useUserStats(userId);
    const { data: history, isLoading: historyLoading } = useRoutineHistory(7, userId);
    const { logout } = useAuth();
    const { data: currentUser } = useUser();

    // Determine if this is the current user's profile
    const isMe = !isPublic || userId === currentUser?.id;

    const levelConfig: Record<string, { emoji: string; color: string; bg: string }> = {
        BEGINNER: { emoji: '🌱', color: 'text-green-500', bg: 'bg-green-500/10' },
        INTERMEDIATE: { emoji: '🌿', color: 'text-blue-500', bg: 'bg-blue-500/10' },
        ADVANCED: { emoji: '🌳', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    };

    const currentLevel = levelConfig[user?.level || 'BEGINNER'];

    return (
        <div className="container py-8 px-4 max-w-4xl mx-auto space-y-8 ">
            {/* Back to Leaderboard if Public */}
            {isPublic && (
                <Link href="/dashboard/leaderboard">
                    <Button variant="ghost" size="sm" className="mb-2">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Leaderboard
                    </Button>
                </Link>
            )}

            {/* Hero Profile Card */}
            <Card padding="none" className="overflow-hidden bg-surface/50 backdrop-blur-sm border-none">
                {/* Gradient Banner */}
                <div className="h-32 sm:h-40 bg-gradient-to-br from-primary via-primary/80 to-secondary relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
                </div>

                <CardContent className="relative px-6 pb-6">
                    {/* Avatar & Info Container */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-20">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-28 h-28 sm:w-36 sm:h-36 bg-background rounded-3xl flex items-center justify-center overflow-hidden ring-4 ring-background">
                                {userLoading ? (
                                    <div className="w-full h-full bg-muted " />
                                ) : user?.avatarUrl ? (
                                    <Image
                                        src={user.avatarUrl}
                                        alt={user.displayName}
                                        fill
                                        sizes="(max-width: 768px) 112px, 144px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <User className="h-14 w-14 text-muted-foreground/50" />
                                )}
                            </div>
                            {/* Level Badge */}
                            {!userLoading && (
                                <div className={`absolute -bottom-2 -right-2 w-10 h-10 ${currentLevel.bg} rounded-xl flex items-center justify-center text-2xl`}>
                                    {currentLevel.emoji}
                                </div>
                            )}
                        </div>

                        {/* Text Info */}
                        <div className="flex-1 text-center sm:text-left space-y-3">
                            {userLoading ? (
                                <>
                                    <div className="h-10 w-48 bg-muted  rounded-lg mx-auto sm:mx-0" />
                                    <div className="h-4 w-32 bg-muted  rounded-md mx-auto sm:mx-0" />
                                </>
                            ) : (
                                <>
                                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{user?.displayName}</h1>
                                    {isMe && <p className="text-muted-foreground">{user?.email}</p>}
                                </>
                            )}

                            {/* Tags */}
                            <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
                                {userLoading ? (
                                    <>
                                        <div className="h-6 w-20 bg-muted  rounded-full" />
                                        <div className="h-6 w-32 bg-muted  rounded-full" />
                                    </>
                                ) : (
                                    <>
                                        <span className={`px-3 py-1 ${currentLevel.bg} ${currentLevel.color} rounded-full text-xs font-bold`}>
                                            {user?.level}
                                        </span>
                                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center gap-1">
                                            <BookOpen className="h-3 w-3" />
                                            Learning English
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Actions - Only shown for "me" */}
                        {isMe && !userLoading && (
                            <div className="flex gap-2 shrink-0">
                                <Link href="/dashboard/profile/edit">
                                    <Button variant="primary" size="sm">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-destructive">
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={<Star className="h-5 w-5" />}
                    value={stats?.totalXp || 0}
                    label="Total XP"
                    color="text-yellow-500"
                    bgColor="bg-yellow-500/10"
                    isLoading={statsLoading}
                />
                <StatCard
                    icon={<Flame className="h-5 w-5" />}
                    value={stats?.currentStreak || 0}
                    label="Day Streak"
                    color="text-orange-500"
                    bgColor="bg-orange-500/10"
                    suffix=" days"
                    isLoading={statsLoading}
                />
                <StatCard
                    icon={<Trophy className="h-5 w-5" />}
                    value={stats?.longestStreak || 0}
                    label="Best Streak"
                    color="text-primary"
                    bgColor="bg-primary/10"
                    suffix=" days"
                    isLoading={statsLoading}
                />
                <StatCard
                    icon={<Target className="h-5 w-5" />}
                    value={Math.round(stats?.completionRate || 0)}
                    label="Completion"
                    color="text-green-500"
                    bgColor="bg-green-500/10"
                    suffix="%"
                    isLoading={statsLoading}
                />
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Achievements */}
                <Card className="bg-surface/50 backdrop-blur-sm border-none">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                <Award className="h-5 w-5 text-amber-500" />
                            </div>
                            <div>
                                <h3 className="font-bold">Achievements</h3>
                                <p className="text-xs text-muted-foreground">
                                    {statsLoading ? (
                                        <span className="inline-block h-3 w-12 bg-muted  rounded" />
                                    ) : (
                                        `${stats?.titles?.length || 0} earned`
                                    )}
                                </p>
                            </div>
                        </div>

                        {statsLoading ? (
                            <div className="grid grid-cols-2 gap-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-12 bg-muted/30  rounded-xl" />
                                ))}
                            </div>
                        ) : stats?.titles && stats.titles.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3">
                                {stats.titles.map((title: { name: string; icon: string }) => (
                                    <div
                                        key={title.name}
                                        className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl hover:bg-muted/50 "
                                    >
                                        <span className="text-2xl">{title.icon}</span>
                                        <span className="text-sm font-medium truncate">{title.name}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <Award className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                <p className="text-sm">Complete tasks to earn achievements!</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Learning Progress */}
                <Card className="bg-surface/50 backdrop-blur-sm border-none">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Zap className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold">Learning Progress</h3>
                                <p className="text-xs text-muted-foreground">User journey so far</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-sm">Total Days</span>
                                </div>
                                {statsLoading ? (
                                    <div className="h-8 w-12 bg-muted  rounded" />
                                ) : (
                                    <span className="text-2xl font-black">{stats?.totalDays || 0}</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    <span className="text-sm">Days Completed</span>
                                </div>
                                {statsLoading ? (
                                    <div className="h-8 w-12 bg-muted  rounded" />
                                ) : (
                                    <span className="text-2xl font-black text-green-500">{stats?.completedDays || 0}</span>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-surface/50 backdrop-blur-sm border-none">
                <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-bold">Recent Activity</h3>
                            <p className="text-xs text-muted-foreground">Last 7 days</p>
                        </div>
                    </div>

                    {historyLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-20 bg-muted/30  rounded-xl" />
                            ))}
                        </div>
                    ) : history && history.length > 0 ? (
                        <div className="space-y-3">
                            {history.map((day) => {
                                const percentage = Math.round((day.tasksCompleted / (day.totalTasks || 1)) * 100);
                                return (
                                    <div
                                        key={day.id}
                                        className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 "
                                    >
                                        <div className="flex-1">
                                            <div className="font-medium">
                                                {new Date(day.date).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {day.tasksCompleted}/{day.totalTasks} tasks
                                            </div>
                                        </div>

                                        {/* Mini progress bar */}
                                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary  "
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>

                                        <div className="text-right min-w-[60px]">
                                            <div className="font-black text-primary">+{day.totalXp}</div>
                                            <div className="text-[10px] text-muted-foreground">XP</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-20" />
                            <p className="text-sm">No activity yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function StatCard({
    icon,
    value,
    label,
    color,
    bgColor,
    suffix = '',
    isLoading,
}: {
    icon: React.ReactNode;
    value: number | string;
    label: string;
    color: string;
    bgColor: string;
    suffix?: string;
    isLoading?: boolean;
}) {
    return (
        <Card padding="none" className="bg-surface/50 backdrop-blur-sm border-none overflow-hidden group">
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 ${bgColor} rounded-xl flex items-center justify-center ${color}`}>
                        {icon}
                    </div>
                </div>
                <div className="mt-4">
                    {isLoading ? (
                        <div className="h-8 w-20 bg-muted  rounded" />
                    ) : (
                        <div className="text-3xl font-black tracking-tight">
                            {typeof value === 'number' ? value.toLocaleString() : value}
                            <span className="text-lg font-bold text-muted-foreground">{suffix}</span>
                        </div>
                    )}
                    <div className="text-xs text-muted-foreground mt-1 font-medium">{label}</div>
                </div>
            </CardContent>
        </Card>
    );
}
