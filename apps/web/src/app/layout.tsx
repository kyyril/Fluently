import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fluentlyy.vercel.app';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'Fluently - Master English Through Daily Habits',
        template: '%s | Fluently',
    },
    description: 'A structured daily routine English learning app with gamification. Build consistent habits, practice speaking with AI, and track your progress on the leaderboard.',
    keywords: [
        'english learning',
        'language learning',
        'daily habits',
        'gamification',
        'speaking practice',
        'AI tutor',
        'fluency',
        'belajar bahasa inggris',
        'IELTS',
        'TOEFL'
    ],
    authors: [{ name: 'Fluently Team' }],
    creator: 'Fluently',
    publisher: 'Fluently',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/brand.svg', type: 'image/svg+xml' },
        ],
        apple: [
            { url: '/apple-touch-icon.svg', type: 'image/svg+xml' },
        ],
    },
    manifest: '/manifest.json',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        siteName: 'Fluently',
        title: 'Fluently - Master English Through Daily Habits',
        description: 'Build consistent English learning habits with gamification. Practice speaking with AI, complete daily challenges, and compete on the leaderboard.',
        images: [
            {
                url: '/og-image.svg',
                width: 1200,
                height: 630,
                alt: 'Fluently - English Learning App',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Fluently - Master English Through Daily Habits',
        description: 'Build consistent English learning habits with gamification. Practice speaking with AI and compete on the leaderboard.',
        images: ['/og-image.svg'],
        creator: '@fluently_app',
    },
    alternates: {
        canonical: siteUrl,
    },
    category: 'education',
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0B1220' },
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
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
                <meta name="application-name" content="Fluently" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content="Fluently" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
            </head>
            <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
