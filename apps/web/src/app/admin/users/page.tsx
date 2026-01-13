'use client';

import { useAdminUsers } from '../../../hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@fluently/ui';
import {
    Mail,
    Calendar,
    Eye,
    Search,
    Filter
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserManagementPage() {
    const { data: users, isLoading } = useAdminUsers();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users?.filter(user =>
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="p-8 space-y-6 ">
                <div className="h-10 w-64 bg-muted rounded-lg" />
                <div className="h-[600px] bg-muted rounded-xl" />
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 ">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground font-medium">Platform-wide directory of all registered users.</p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary  outline-none"
                    />
                </div>
            </div>

            <Card variant="default" className="border-none shadow-xl bg-surface/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-6">
                    <CardTitle className="text-lg font-bold">All Users ({filteredUsers?.length || 0})</CardTitle>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-muted hover:bg-muted/80 rounded-lg  capitalize">
                        <Filter className="h-3 w-3" />
                        Status: Active
                    </button>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-muted/30 text-muted-foreground border-b border-border">
                                <tr>
                                    <th className="px-6 py-5 font-bold">Account</th>
                                    <th className="px-6 py-5 font-bold text-center">Role</th>
                                    <th className="px-6 py-5 font-bold text-center">Proficiency</th>
                                    <th className="px-6 py-5 font-bold text-center">Stats</th>
                                    <th className="px-6 py-5 font-bold text-center">Registration</th>
                                    <th className="px-6 py-5 font-bold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredUsers?.map((user) => (
                                    <tr key={user.id} className="group hover:bg-primary/5  ">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                                    {user.displayName.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm leading-tight">{user.displayName}</span>
                                                    <span className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 font-medium">
                                                        <Mail className="h-3 w-3" />
                                                        {user.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${user.role === 'ADMIN'
                                                ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
                                                : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="px-2 py-0.5 rounded bg-muted/50 text-[10px] font-bold uppercase">
                                                {user.level}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-xs font-black text-primary">{user.totalXp.toLocaleString()} XP</span>
                                                <span className="text-[10px] text-orange-500 font-bold">{user.currentStreak} day streak</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center text-muted-foreground text-xs font-medium">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button
                                                onClick={() => router.push(`/admin/users/${user.id}`)}
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground hover:scale-110 active:scale-95  shadow-md shadow-primary/20"
                                                title="View Detail"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredUsers?.length === 0 && (
                            <div className="py-20 text-center text-muted-foreground">
                                <Search className="h-10 w-10 mx-auto mb-4 opacity-20" />
                                <p className="font-medium">No users found matching "{searchTerm}"</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
