'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@fluently/ui';
import { useUser, useUpdateProfile } from '@/hooks';
import { ArrowLeft, Loader2, Save, User, Camera, ChevronRight, Globe } from 'lucide-react';

const LEVELS = [
    { id: 'BEGINNER', name: 'Beginner', desc: 'Just starting to learn', icon: '🌱' },
    { id: 'INTERMEDIATE', name: 'Intermediate', desc: 'Can hold basic conversations', icon: '🌿' },
    { id: 'ADVANCED', name: 'Advanced', desc: 'Near-fluent, refining skills', icon: '🌳' },
];

export default function EditProfilePage() {
    const router = useRouter();
    const { data: user, isLoading: userLoading } = useUser();
    const updateProfile = useUpdateProfile();

    const [displayName, setDisplayName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [level, setLevel] = useState('BEGINNER');

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setAvatarUrl(user.avatarUrl || '');
            setLevel(user.level || 'BEGINNER');
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateProfile.mutateAsync({
                displayName: displayName.trim(),
                avatarUrl: avatarUrl.trim() || undefined,
                level: level as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
            });
            router.push('/dashboard/profile');
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    return (
        <div className="container py-8 px-4 max-w-2xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-xl">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Edit <span className="text-primary">Profile</span></h1>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Personalize your journey</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar Preview Section */}
                <Card className="bg-surface/50 border-none overflow-hidden backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <div className="relative">
                                <div className="w-32 h-32 bg-background rounded-3xl flex items-center justify-center overflow-hidden ring-4 ring-muted/20">
                                    {userLoading ? (
                                        <div className="w-full h-full bg-muted animate-pulse" />
                                    ) : avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt="Avatar preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <User className="h-14 w-14 text-muted-foreground/30" />
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
                                    <Camera className="h-5 w-5" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-4 w-full">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Profile Picture URL</label>
                                    {userLoading ? (
                                        <div className="h-10 w-full bg-muted animate-pulse rounded-xl" />
                                    ) : (
                                        <Input
                                            placeholder="https://images.unsplash.com/..."
                                            value={avatarUrl}
                                            onChange={(e) => setAvatarUrl(e.target.value)}
                                            className="bg-background/50 border-none focus-visible:ring-primary/20 rounded-xl"
                                        />
                                    )}
                                    <p className="text-[10px] text-muted-foreground font-medium pl-1 italic">
                                        Use a high-quality image URL for the best look.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Identity Card */}
                <Card className="bg-surface/50 border-none backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                                <Globe className="h-4 w-4" />
                            </div>
                            <CardTitle className="text-sm font-black uppercase tracking-widest">Public Identity</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Display Name</label>
                            {userLoading ? (
                                <div className="h-12 w-full bg-muted animate-pulse rounded-xl" />
                            ) : (
                                <Input
                                    placeholder="e.g. John Doe"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    required
                                    minLength={2}
                                    maxLength={50}
                                    className="text-lg font-bold bg-background/50 border-none focus-visible:ring-primary/20 py-6 rounded-xl"
                                />
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Registered Email</label>
                            {userLoading ? (
                                <div className="h-10 w-full bg-muted animate-pulse rounded-xl" />
                            ) : (
                                <Input
                                    value={user?.email || ''}
                                    disabled
                                    className="bg-muted/10 border-none text-muted-foreground cursor-not-allowed rounded-xl"
                                />
                            )}
                            <p className="text-[10px] text-muted-foreground pl-1">
                                Securely linked to your account.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Level Grid */}
                <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground pl-2">Current Learning Level</label>
                    <div className="grid gap-3">
                        {userLoading ? (
                            [1, 2, 3].map(i => <div key={i} className="h-20 bg-muted/20 animate-pulse rounded-2xl" />)
                        ) : (
                            LEVELS.map((l) => (
                                <button
                                    key={l.id}
                                    type="button"
                                    onClick={() => setLevel(l.id)}
                                    className={`
                                        w-full p-4 rounded-2xl transition-all text-left flex items-center justify-between group border
                                        ${level === l.id
                                            ? 'bg-primary/5 border-primary/20'
                                            : 'bg-surface/30 border-transparent hover:bg-surface/50'}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 ${level === l.id ? 'scale-110' : 'group-hover:scale-105 opacity-50'}`}>
                                            {l.icon}
                                        </div>
                                        <div>
                                            <div className={`font-black tracking-tight ${level === l.id ? 'text-primary' : ''}`}>
                                                {l.name}
                                            </div>
                                            <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-tight opacity-70">{l.desc}</div>
                                        </div>
                                    </div>
                                    {level === l.id && (
                                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                            <CheckIcon className="h-3 w-3" />
                                        </div>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-end gap-3 pt-4 pb-12">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.back()}
                        className="font-bold text-muted-foreground hover:text-foreground rounded-xl"
                    >
                        Discard Changes
                    </Button>
                    <Button
                        type="submit"
                        disabled={updateProfile.isPending || userLoading}
                        className="min-w-[160px] font-black rounded-xl h-11"
                    >
                        {updateProfile.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Applying...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Profile
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
