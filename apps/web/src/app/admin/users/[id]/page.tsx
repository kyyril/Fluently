'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAdminUserDetail } from '../../../../hooks';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@fluently/ui';
import {
    ArrowLeft,
    Mail,
    Calendar,
    Award,
    Flame,
    Zap,
    MapPin,
    Target,
    Activity
} from 'lucide-react';

export default function AdminUserDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: user, isLoading, isError } = useAdminUserDetail(id as string);

    if (isLoading) {
        return (
            <div className="p-8 space-y-8 animate-pulse">
                <div className="h-8 w-32 bg-muted rounded mb-8" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="h-96 bg-muted rounded-xl" />
                    <div className="lg:col-span-2 space-y-6">
                        <div className="h-32 bg-muted rounded-xl" />
                        <div className="h-64 bg-muted rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">User detailed data not available</h2>
                <Button onClick={() => router.push('/admin')}>Return to Admin Dash</Button>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 animate-fade-in">
            {/* Nav Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push('/admin')}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Dossier</h1>
                    <p className="text-muted-foreground font-medium">Platform insights for {user.displayName}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Profile Card */}
                <Card className="lg:col-span-1 border-none shadow-xl bg-surface/50 backdrop-blur-sm">
                    <CardContent className="pt-10 flex flex-col items-center text-center">
                        <div className="w-28 h-28 rounded-3xl bg-primary/10 flex items-center justify-center font-bold text-5xl text-primary mb-6 border-4 border-background shadow-2xl skew-x-1 skew-y-1">
                            {user.displayName.charAt(0)}
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">{user.displayName}</h2>
                        <div className="flex items-center gap-1.5 text-muted-foreground mt-1 mb-6 font-medium">
                            <Mail className="h-4 w-4" />
                            <span className="text-sm">{user.email}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center mb-8">
                            <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${user.role === 'ADMIN'
                                ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
                                : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                                }`}>
                                {user.role}
                            </span>
                            <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-orange-500/10 text-orange-600 border border-orange-500/10">
                                {user.level} Proficiency
                            </span>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-6 pt-8 border-t border-border">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Registration</span>
                                <span className="font-bold text-sm">{new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Origin</span>
                                <span className="font-bold text-sm flex items-center justify-center gap-1">
                                    <MapPin className="h-3.5 w-3.5 text-destructive" />
                                    {user.country || 'Not Set'}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Analytics Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card variant="elevated" className="border-none shadow-lg bg-gradient-to-br from-blue-500/10 to-transparent">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="p-3 bg-blue-500/10 rounded-2xl">
                                        <Zap className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Cumulative XP</p>
                                        <p className="text-3xl font-black tracking-tight">{user.totalXp.toLocaleString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card variant="elevated" className="border-none shadow-lg bg-gradient-to-br from-orange-500/10 to-transparent">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="p-3 bg-orange-500/10 rounded-2xl">
                                        <Flame className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Active Streak</p>
                                        <p className="text-3xl font-black tracking-tight">{user.currentStreak} Days</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card variant="elevated" className="border-none shadow-lg bg-gradient-to-br from-green-500/10 to-transparent">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="p-3 bg-green-500/10 rounded-2xl">
                                        <Target className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Learning Target</p>
                                        <p className="text-3xl font-black tracking-tight text-primary">{user.targetLanguage}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Achievement Showcase */}
                    <Card variant="default" className="border-none shadow-md">
                        <CardHeader className="border-b border-border pb-4">
                            <CardTitle className="text-lg flex items-center gap-3 font-black uppercase tracking-tight">
                                <Award className="h-6 w-6 text-yellow-500" />
                                Achievement Showcase
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="flex flex-wrap gap-4">
                                {user.titles && user.titles.length > 0 ? (
                                    user.titles.map((ut: any) => (
                                        <div key={ut.title.id} className="flex flex-col items-center gap-2 p-4 bg-muted/30 rounded-2xl border border-border w-32 group hover:bg-primary/5 hover:border-primary/20 transition-all cursor-default">
                                            <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{ut.title.icon}</span>
                                            <div className="text-center">
                                                <p className="text-xs font-black leading-tight uppercase tracking-tighter">{ut.title.name}</p>
                                                <p className="text-[9px] text-muted-foreground mt-1">{new Date(ut.awardedAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-full py-8 text-center text-muted-foreground font-bold italic">
                                        No accolades unlocked by this user yet.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Activity Feed */}
                    <Card variant="default" className="border-none shadow-md">
                        <CardHeader className="border-b border-border pb-4">
                            <CardTitle className="text-lg flex items-center gap-3 font-black uppercase tracking-tight">
                                <Activity className="h-6 w-6 text-blue-500" />
                                Learning Activity Feed (Last 7 Days)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-border">
                                {user.dailyLogs && user.dailyLogs.length > 0 ? (
                                    user.dailyLogs.map((log: any) => (
                                        <div key={log.id} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-background rounded-lg border border-border">
                                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm tracking-tight">{new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                    <p className="text-xs text-muted-foreground font-medium mt-0.5">{log.tasks?.length || 0} tasks strictly completed</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="flex flex-col items-end">
                                                    <div className="flex items-center gap-1.5 text-xs text-yellow-600 font-black uppercase tracking-widest">
                                                        <Zap className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                                        {log.xpEarned} XP
                                                    </div>
                                                </div>
                                                <div className="h-8 w-[1px] bg-border mx-2"></div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                                                    Logged
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-12 text-center text-muted-foreground font-bold italic">
                                        No telemetry recorded in the recent cycle.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
