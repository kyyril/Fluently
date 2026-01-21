'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SpeakingSession } from '@/features/speaking/SpeakingSession';

function SpeakingSessionWrapper() {
    const searchParams = useSearchParams();
    const taskId = searchParams.get('taskId') || undefined;
    return <SpeakingSession taskId={taskId} />;
}

export default function SpeakingPage() {
    return (
        <div className="h-full flex flex-col p-4 md:p-8 max-w-6xl mx-auto w-full">
            <div className="flex-1 bg-surface rounded-3xl border border-border/50 overflow-hidden shadow-2xl relative">
                <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
                    <SpeakingSessionWrapper />
                </Suspense>
            </div>
        </div>
    );
}
