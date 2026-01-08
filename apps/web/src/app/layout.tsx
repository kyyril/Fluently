import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: 'Fluently - Master Languages Through Daily Habits',
    description: 'A structured daily routine language learning app with gamification. Build consistent habits and track your progress on the leaderboard.',
    keywords: ['language learning', 'daily habits', 'gamification', 'leaderboard', 'fluency'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
