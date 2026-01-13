'use client';

import { useAdminUsers } from '../../hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@fluently/ui';
import {
    Users,
    TrendingUp,
    ArrowUpRight,
    Mail,
    Calendar,
    Award,
    Eye
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminOverviewPage() {
    const { data: users, isLoading: usersLoading } = useAdminUsers();
    const router = useRouter();

    if (usersLoading) {
        return (
            <div className="p-8 space-y-8 ">
                <div className="h-8 w-48 bg-muted rounded mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 bg-muted rounded-xl" />
                    ))}
                </div>
                <div className="h-96 bg-muted rounded-xl" />
            </div>
        );
    }

    const totalUsers = users?.length || 0;
    const totalXp = users?.reduce((acc, u) => acc + u.totalXp, 0) || 0;
    const avgXp = totalUsers > 0 ? Math.round(totalXp / totalUsers) : 0;

    return (
        <div className="p-8 space-y-8 ">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="default" className="border-none shadow-md">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                                <p className="text-3xl font-bold mt-1">{totalUsers}</p>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-xs text-green-500 font-bold">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>+12% vs last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card variant="default" className="border-none shadow-md">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Platform XP</p>
                                <p className="text-3xl font-bold mt-1">{totalXp.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-yellow-500/10 rounded-xl">
                                <Award className="h-6 w-6 text-yellow-500" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-xs text-green-500 font-bold">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            <span>4.2k awarded today</span>
                        </div>
                    </CardContent>
                </Card>

                <Card variant="default" className="border-none shadow-md">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Avg. User XP</p>
                                <p className="text-3xl font-bold mt-1">{avgXp.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded-xl">
                                <TrendingUp className="h-6 w-6 text-green-500" />
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-muted-foreground font-medium">
                            Engagement score: Optimal
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Users Table */}
            <Card variant="default" className="border-none shadow-xl bg-surface/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7 border-b border-border">
                    <div>
                        <CardTitle className="text-xl">User Management</CardTitle>
                        <p className="text-sm text-muted-foreground">View and manage all registered users across the platform.</p>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-muted/30 text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="px-6 py-5 font-bold">User Information</th>
                                    <th className="px-6 py-5 font-bold text-center">Role</th>
                                    <th className="px-6 py-5 font-bold text-center">Proficiency</th>
                                    <th className="px-6 py-5 font-bold text-center">Progress (XP)</th>
                                    <th className="px-6 py-5 font-bold text-center">Streak</th>
                                    <th className="px-6 py-5 font-bold text-center">Joined</th>
                                    <th className="px-6 py-5 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {users?.map((user) => (
                                    <tr key={user.id} className="group hover:bg-primary/5  ">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary group-hover:scale-110 ">
                                                    {user.displayName.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-base leading-tight">{user.displayName}</span>
                                                    <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5 font-medium">
                                                        <Mail className="h-3 w-3" />
                                                        {user.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${user.role === 'ADMIN'
                                                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                                                : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="px-2 py-1 rounded-md bg-muted/50 text-xs font-bold uppercase tracking-tight">
                                                {user.level}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-center font-black text-primary">
                                            {user.totalXp.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex items-center justify-center gap-1 font-black text-orange-500">
                                                {user.currentStreak}
                                                <span className="text-lg">🔥</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center text-muted-foreground text-xs font-bold whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button
                                                onClick={() => router.push(`/admin/users/${user.id}`)}
                                                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground hover:scale-110 active:scale-95  shadow-lg shadow-primary/20"
                                                title="View User Details"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
