'use client';

import { Card, CardContent, CardHeader, CardTitle, Button } from '@fluently/ui';
import {
    Settings as SettingsIcon,
    Bell,
    Shield,
    Database,
    Globe,
    Lock
} from 'lucide-react';

export default function AdminSettingsPage() {
    return (
        <div className="p-8 space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
                <p className="text-muted-foreground font-medium">Configure platform defaults and security protocols.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-none shadow-lg">
                    <CardHeader className="border-b border-border">
                        <CardTitle className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-primary" />
                            Security & Access
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                            <div>
                                <p className="font-bold text-sm">Two-Factor Authentication</p>
                                <p className="text-xs text-muted-foreground">Enforce 2FA for all admin accounts</p>
                            </div>
                            <Button variant="outline" size="sm">Configure</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                            <div>
                                <p className="font-bold text-sm">Session Timeout</p>
                                <p className="text-xs text-muted-foreground">Automatic logout after 30 minutes of inactivity</p>
                            </div>
                            <Button variant="outline" size="sm">Manage</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                    <CardHeader className="border-b border-border">
                        <CardTitle className="flex items-center gap-3">
                            <Bell className="h-5 w-5 text-orange-500" />
                            Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                            <div>
                                <p className="font-bold text-sm">System Alerts</p>
                                <p className="text-xs text-muted-foreground">Receive emails for critical system events</p>
                            </div>
                            <Button variant="outline" size="sm">Enable</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                            <div>
                                <p className="font-bold text-sm">New User reports</p>
                                <p className="text-xs text-muted-foreground">Weekly digest of platform growth</p>
                            </div>
                            <Button variant="outline" size="sm">Setup</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                    <CardHeader className="border-b border-border">
                        <CardTitle className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-blue-500" />
                            Language Engine
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                            <div>
                                <p className="font-bold text-sm">Supported Languages</p>
                                <p className="text-xs text-muted-foreground">Manage the list of available languages</p>
                            </div>
                            <Button variant="outline" size="sm">Edit List</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                    <CardHeader className="border-b border-border">
                        <CardTitle className="flex items-center gap-3">
                            <Database className="h-5 w-5 text-destructive" />
                            Data Management
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                            <div>
                                <p className="font-bold text-sm text-destructive">Maintenance Mode</p>
                                <p className="text-xs text-muted-foreground">Temporarily disable platform access</p>
                            </div>
                            <Button variant="destructive" size="sm">Activate</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
