'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, type ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { NeonAuthWrapper } from './NeonAuthWrapper';

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh longer
                        gcTime: 10 * 60 * 1000,   // 10 minutes - keep in cache
                        refetchOnWindowFocus: false,
                        refetchOnReconnect: false,
                        retry: 1,
                    },
                },
            })
    );

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <QueryClientProvider client={queryClient}>
                <NeonAuthWrapper>
                    {children}
                </NeonAuthWrapper>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ThemeProvider>
    );
}
