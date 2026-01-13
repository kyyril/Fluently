'use client';

import { NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { forwardRef } from 'react';
import '@neondatabase/auth/ui/css';

const NeonLink = forwardRef<HTMLAnchorElement, any>((props, ref) => (
    <Link {...props} ref={ref} />
));

export function NeonAuthWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <NeonAuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => router.refresh()}
            Link={NeonLink}
        >
            {children}
        </NeonAuthUIProvider>
    );
}
