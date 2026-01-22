// API Configuration
export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api';
export const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

// App Configuration
export const APP_NAME = 'Fluently';
export const APP_VERSION = '1.0.0';

// Query Keys
export const QUERY_KEYS = {
    USER: ['user'],
    USER_ME: ['user', 'me'],
    USER_STATS: ['user', 'stats'],
    ROUTINE_TODAY: ['routine', 'today'],
    ROUTINE_HISTORY: ['routine', 'history'],
    LEADERBOARD: ['leaderboard'],
    ARTICLES: ['articles'],
    ARTICLE: (slug: string) => ['article', slug],
} as const;

// Task Configuration
export const TASK_NAMES: Record<string, string> = {
    PODCAST_LISTENING: 'Podcast Listening',
    SPEAKING_SESSION: 'Speaking Session',
    CREATE_SENTENCES: 'Create Sentences',
    DAY_RECAP: 'Day Recap',
};

export const TASK_XP: Record<string, number> = {
    PODCAST_LISTENING: 50,
    SPEAKING_SESSION: 80,
    CREATE_SENTENCES: 30,
    DAY_RECAP: 40,
};

export const TASK_COLORS: Record<string, { bg: string; text: string }> = {
    PODCAST_LISTENING: { bg: 'bg-task-podcast/20', text: 'text-task-podcast' },
    SPEAKING_SESSION: { bg: 'bg-task-speaking/20', text: 'text-task-speaking' },
    CREATE_SENTENCES: { bg: 'bg-task-sentences/20', text: 'text-task-sentences' },
    DAY_RECAP: { bg: 'bg-task-recap/20', text: 'text-task-recap' },
};

// Stale Times (in milliseconds)
export const STALE_TIMES = {
    USER: 5 * 60 * 1000,      // 5 minutes
    ROUTINE: 5 * 60 * 1000,   // 5 minutes
    LEADERBOARD: 2 * 60 * 1000, // 2 minutes
    ARTICLES: 10 * 60 * 1000, // 10 minutes
} as const;

// Cache Times (in milliseconds)
export const CACHE_TIMES = {
    USER: 10 * 60 * 1000,     // 10 minutes
    ROUTINE: 10 * 60 * 1000,  // 10 minutes
    LEADERBOARD: 5 * 60 * 1000, // 5 minutes
    ARTICLES: 30 * 60 * 1000, // 30 minutes
} as const;
