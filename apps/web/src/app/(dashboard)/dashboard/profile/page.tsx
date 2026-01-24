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
    ArrowLeft,
    Sprout,
    Leaf,
    TreeDeciduous,
    Gem,
    Moon,
    Sun,
    Globe,
    CheckCircle2,
    History,
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

    const levelConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
        BEGINNER: { icon: <Sprout className="w-6 h-6" />, color: 'text-green-500', bg: 'bg-green-500/10' },
        INTERMEDIATE: { icon: <Leaf className="w-6 h-6" />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        ADVANCED: { icon: <TreeDeciduous className="w-6 h-6" />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    };

    const currentLevel = levelConfig[user?.level || 'BEGINNER'];

    const getTitleIcon = (iconName: string) => {
        switch (iconName) {
            case 'sprout': return <Sprout className="h-5 w-5 text-green-500" />;
            case 'flame': return <Flame className="h-5 w-5 text-orange-500" />;
            case 'trophy': return <Trophy className="h-5 w-5 text-yellow-500" />;
            case 'gem': return <Gem className="h-5 w-5 text-blue-500" />;
            case 'globe': return <Globe className="h-5 w-5 text-sky-500" />;
            case 'moon': return <Moon className="h-5 w-5 text-indigo-400" />;
            case 'sun': return <Sun className="h-5 w-5 text-amber-500" />;
            case 'check-circle': return <CheckCircle2 className="h-5 w-5 text-green-400" />;
            default: return <Award className="h-5 w-5 text-primary" />;
        }
    };

    return (
        <div className="container py-8 px-4 max-w-4xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                        <User className="h-3 w-3" />
                        Learning Profile
                    </div>
                    <div className="flex items-center gap-4">
                        {isPublic && (
                            <Link href="/dashboard/leaderboard">
                                <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                                    <ArrowLeft className="w-5 h-5" />
                                </Button>
                            </Link>
                        )}
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Profile</h1>
                    </div>
                </div>

                {isMe && !userLoading && (
                    <div className="flex items-center gap-2">
                        <Link href="/dashboard/profile/edit">
                            <Button variant="ghost" size="sm" className="rounded-xl bg-surface/50 hover:bg-surface font-black uppercase tracking-widest text-[10px] text-muted-foreground px-4">
                                <Edit className="w-3 h-3 mr-2" />
                                Edit Account
                            </Button>
                        </Link>
                        <Button onClick={logout} variant="ghost" size="sm" className="rounded-xl bg-red-500/5 hover:bg-red-500/10 text-red-500 font-black uppercase tracking-widest text-[10px] px-4">
                            <LogOut className="w-3 h-3 mr-2" />
                            Log Out
                        </Button>
                    </div>
                )}
            </div>

            {/* Profile Hero Section */}
            <div className="p-6 sm:p-8 bg-surface/50 rounded-2xl flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
                <div className="relative shrink-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-background rounded-2xl overflow-hidden flex items-center justify-center shadow-inner">
                        {user?.avatarUrl ? (
                            <Image src={user.avatarUrl} alt={user.displayName} fill className="object-cover" />
                        ) : (
                            <User className="w-10 h-10 text-muted-foreground/20" />
                        )}
                    </div>
                    <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${currentLevel.bg} ${currentLevel.color} rounded-lg flex items-center justify-center shadow-lg border-2 border-surface`}>
                        {currentLevel.icon}
                    </div>
                </div>

                <div className="flex-1 text-center sm:text-left space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{user?.displayName}</h2>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${currentLevel.bg} ${currentLevel.color}`}>
                            {user?.level}
                        </span>
                        <span className="px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary flex items-center gap-1.5">
                            <BookOpen className="w-3 h-3" />
                            English Track
                        </span>
                    </div>
                    {isMe && <p className="text-xs text-muted-foreground font-medium opacity-60">{user?.email}</p>}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={<Star className="h-5 w-5" />}
                    value={stats?.totalXp || 0}
                    label="Total Points"
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
                    isLoading={statsLoading}
                />
                <StatCard
                    icon={<Trophy className="h-5 w-5" />}
                    value={stats?.longestStreak || 0}
                    label="Best Streak"
                    color="text-primary"
                    bgColor="bg-primary/10"
                    isLoading={statsLoading}
                />
                <StatCard
                    icon={<Target className="h-5 w-5" />}
                    value={Math.round(stats?.completionRate || 0)}
                    label="Completion"
                    color="text-green-500"
                    bgColor="bg-green-500/10"
                    isLoading={statsLoading}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {/* Achievements */}
                <div className="p-6 bg-surface/50 rounded-2xl space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[3px] text-muted-foreground opacity-40">Achievements</h3>
                    {stats?.titles && stats.titles.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                            {stats.titles.map((title: { name: string; icon: string }) => (
                                <div key={title.name} className="flex items-center gap-3 p-3 bg-background/30 rounded-xl">
                                    <div className="shrink-0">{getTitleIcon(title.icon)}</div>
                                    <span className="text-xs font-bold truncate">{title.name}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center text-muted-foreground opacity-30 italic text-xs">No achievements yet</div>
                    )}
                </div>

                {/* Activity Summary */}
                <div className="p-6 bg-surface/50 rounded-2xl space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-[3px] text-muted-foreground opacity-40">Recent Activity</h3>
                        <Link href="/dashboard/history" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Full History</Link>
                    </div>
                    {history && history.length > 0 ? (
                        <div className="space-y-2">
                            {history.slice(0, 4).map((day) => (
                                <div key={day.id} className="flex items-center justify-between p-3 bg-background/30 rounded-xl">
                                    <span className="text-xs font-bold">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-muted-foreground">{day.tasksCompleted}/{day.totalTasks} Done</span>
                                        <span className="text-xs font-black text-primary">+{day.totalXp} XP</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center text-muted-foreground opacity-30 italic text-xs">No recent activity</div>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, value, label, color, bgColor, isLoading }: any) {
    return (
        <div className="p-5 bg-surface/50 rounded-2xl flex flex-col gap-3 group">
            <div className={`w-10 h-10 ${bgColor} ${color} rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6`}>
                {icon}
            </div>
            <div>
                {isLoading ? (
                    <div className="h-7 w-16 bg-muted animate-shimmer rounded mb-1" />
                ) : (
                    <div className="text-2xl font-black tracking-tight">{value.toString()}</div>
                )}
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</div>
            </div>
        </div>
    );
}
