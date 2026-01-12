import { z } from 'zod';

// ============================================
// ENUMS
// ============================================

export const LevelSchema = z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);
export type Level = z.infer<typeof LevelSchema>;

export const UserRoleSchema = z.enum(['USER', 'ADMIN']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const TaskTypeSchema = z.enum([
    'PODCAST_LISTENING',
    'LEARN_VERBS',
    'SPEAKING_SESSION',
    'CREATE_SENTENCES',
    'DAY_RECAP',
]);
export type TaskType = z.infer<typeof TaskTypeSchema>;

// ============================================
// USER SCHEMAS
// ============================================

export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    displayName: z.string().min(2).max(50),
    avatarUrl: z.string().url().nullable().optional(),
    nativeLanguage: z.string(),
    targetLanguage: z.string(),
    country: z.string().nullable().optional(),
    level: LevelSchema,
    role: UserRoleSchema,
    totalXp: z.number().int().nonnegative(),
    currentStreak: z.number().int().nonnegative(),
    longestStreak: z.number().int().nonnegative(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type User = z.infer<typeof UserSchema>;

export const UserPublicSchema = UserSchema.pick({
    id: true,
    displayName: true,
    avatarUrl: true,
    targetLanguage: true,
    level: true,
    totalXp: true,
    currentStreak: true,
});
export type UserPublic = z.infer<typeof UserPublicSchema>;

// ============================================
// AUTH SCHEMAS
// ============================================

export const RegisterSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        displayName: z.string().min(2, 'Name must be at least 2 characters').max(50),
    }),
});
export type RegisterInput = z.infer<typeof RegisterSchema>['body'];

export const LoginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(1, 'Password is required'),
    }),
});
export type LoginInput = z.infer<typeof LoginSchema>['body'];

export const AuthResponseSchema = z.object({
    user: UserSchema,
    token: z.string(),
    refreshToken: z.string().optional(),
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// ============================================
// ONBOARDING SCHEMAS
// ============================================

export const OnboardingSchema = z.object({
    body: z.object({
        nativeLanguage: z.string().min(2),
        targetLanguage: z.string().min(2),
        country: z.string().optional(),
        level: LevelSchema,
        dailyGoals: z.object({
            podcastListening: z.boolean().default(true),
            learnVerbs: z.number().int().min(5).max(100).default(25),
            speakingSession: z.boolean().default(true),
            createSentences: z.boolean().default(true),
            dayRecap: z.boolean().default(true),
        }),
    }),
});
export type OnboardingInput = z.infer<typeof OnboardingSchema>['body'];

// ============================================
// ROUTINE & TASK SCHEMAS
// ============================================

export const TaskCompletionSchema = z.object({
    id: z.string(),
    dailyLogId: z.string(),
    taskType: TaskTypeSchema,
    completed: z.boolean(),
    completedAt: z.string().datetime().nullable(),
    xpEarned: z.number().int().nonnegative(),
    metadata: z.record(z.string(), z.unknown()).nullable(),
});
export type TaskCompletion = z.infer<typeof TaskCompletionSchema>;

export const DailyLogSchema = z.object({
    id: z.string(),
    userId: z.string(),
    date: z.string(), // ISO date string
    tasks: z.array(TaskCompletionSchema),
    dayRecap: z.string().nullable(),
    aiReview: z.string().nullable(),
    totalXp: z.number().int().nonnegative(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type DailyLog = z.infer<typeof DailyLogSchema>;

export const CompleteTaskSchema = z.object({
    params: z.object({
        taskId: z.string(),
    }),
    body: z.object({
        metadata: z.record(z.string(), z.unknown()).optional(),
    }).optional(),
});
export type CompleteTaskInput = z.infer<typeof CompleteTaskSchema>;

export const DayRecapSchema = z.object({
    body: z.object({
        content: z.string().min(10, 'Recap must be at least 10 characters'),
        requestAiReview: z.boolean().default(true),
    }),
});
export type DayRecapInput = z.infer<typeof DayRecapSchema>['body'];

// ============================================
// LEADERBOARD SCHEMAS
// ============================================

export const LeaderboardEntrySchema = z.object({
    rank: z.number().int().positive(),
    user: UserPublicSchema,
    xp: z.number().int().nonnegative(),
});
export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>;

export const LeaderboardResponseSchema = z.object({
    entries: z.array(LeaderboardEntrySchema),
    userRank: z.number().int().positive().nullable(),
    period: z.enum(['weekly', 'all-time']),
});
export type LeaderboardResponse = z.infer<typeof LeaderboardResponseSchema>;

// ============================================
// AI SCHEMAS
// ============================================

export const GrammarReviewResponseSchema = z.object({
    feedback: z.string(),
    corrections: z.array(z.string()),
    corrected: z.string(),
});
export type GrammarReviewResponse = z.infer<typeof GrammarReviewResponseSchema>;

// ============================================
// API RESPONSE WRAPPER
// ============================================

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        success: z.boolean(),
        data: dataSchema.optional(),
        error: z.string().optional(),
        code: z.string().optional(),
    });

export type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
    code?: string;
};
