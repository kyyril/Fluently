import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Fluently - Master English Through Daily Habits',
    description: 'A structured daily routine English learning app with gamification. Build consistent habits and track your progress on the leaderboard.',
    keywords: ['english learning', 'daily habits', 'gamification', 'leaderboard', 'fluency', 'belajar bahasa inggris'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
            <head>
                <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'} />
                <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'} crossOrigin="anonymous" />
            </head>
            <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
