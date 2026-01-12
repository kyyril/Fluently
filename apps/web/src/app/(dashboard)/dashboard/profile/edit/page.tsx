'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@fluently/ui';
import { useUser, useUpdateProfile } from '@/hooks';
import { ArrowLeft, Loader2, Save, User, Camera } from 'lucide-react';

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

    if (userLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container py-8 px-4 max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Edit Profile</h1>
                    <p className="text-muted-foreground">Customize your learning experience.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Avatar Preview */}
                <Card className="overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="relative">
                                <div className="w-28 h-28 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                                    {avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt="Avatar preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <User className="h-12 w-12 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                                    <Camera className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-3 w-full">
                                <label className="text-sm font-bold">Avatar URL</label>
                                <Input
                                    placeholder="https://example.com/avatar.jpg"
                                    value={avatarUrl}
                                    onChange={(e) => setAvatarUrl(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Enter a URL to your profile picture
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Basic Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-bold">Display Name</label>
                            <Input
                                placeholder="Your name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                                minLength={2}
                                maxLength={50}
                                className="text-lg"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold">Email</label>
                            <Input
                                value={user?.email || ''}
                                disabled
                                className="bg-muted/50 text-muted-foreground"
                            />
                            <p className="text-xs text-muted-foreground">
                                Email cannot be changed
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Level Selection */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Your English Level</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {LEVELS.map((l) => (
                            <button
                                key={l.id}
                                type="button"
                                onClick={() => setLevel(l.id)}
                                className={`
                                    w-full p-4 rounded-2xl transition-all text-left flex items-center gap-4 group
                                    ${level === l.id
                                        ? 'bg-primary/10 shadow-lg shadow-primary/10 scale-[1.01]'
                                        : 'bg-muted/30 hover:bg-muted/50'}
                                `}
                            >
                                <span className={`text-3xl transition-transform duration-300 ${level === l.id ? 'scale-110' : 'group-hover:scale-105'}`}>
                                    {l.icon}
                                </span>
                                <div>
                                    <div className={`font-bold ${level === l.id ? 'text-primary' : ''}`}>
                                        {l.name}
                                    </div>
                                    <div className="text-muted-foreground text-sm">{l.desc}</div>
                                </div>
                            </button>
                        ))}
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4">
                    <Button type="button" variant="ghost" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={updateProfile.isPending} className="min-w-[140px]">
                        {updateProfile.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
