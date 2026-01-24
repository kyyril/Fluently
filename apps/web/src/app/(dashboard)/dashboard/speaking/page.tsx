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
        <div className="h-full flex flex-col p-2 md:p-4 max-w-7xl mx-auto w-full">
            <div className="flex-1 bg-background/50 rounded-3xl overflow-hidden relative">
                <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
                    <SpeakingSessionWrapper />
                </Suspense>
            </div>
        </div>
    );
}
