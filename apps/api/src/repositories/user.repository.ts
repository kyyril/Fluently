import { prisma } from '../config/database';

type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
type UserRole = 'USER' | 'ADMIN';

export async function findByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email },
    });
}

export async function findById(id: string) {
    return prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            displayName: true,
            avatarUrl: true,
            nativeLanguage: true,
            targetLanguage: true,
            level: true,
            role: true,
            totalXp: true,
            currentStreak: true,
            longestStreak: true,
            createdAt: true,
            updatedAt: true,
            passwordHash: true,
        },
    });
}

export async function findAuthByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            passwordHash: true,
            displayName: true,
            role: true,
            level: true,
        }
    });
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            role: true,
        },
    });
}

// Public profile fetch with minimal fields
export async function findPublicById(id: string) {
    return prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            displayName: true,
            avatarUrl: true,
            nativeLanguage: true,
            targetLanguage: true,
            level: true,
            totalXp: true,
            currentStreak: true,
        },
    });
}

export async function create(data: {
    email: string;
    passwordHash: string;
    displayName: string;
    nativeLanguage?: string;
    targetLanguage?: string;
    level?: Level;
    role?: UserRole;
}) {
    return prisma.user.create({
        data: {
            email: data.email,
            passwordHash: data.passwordHash,
            displayName: data.displayName,
            nativeLanguage: data.nativeLanguage || '',
            targetLanguage: data.targetLanguage || '',
            level: data.level,
            role: data.role || 'USER',
        } as any,
    });
}

export async function updateProfile(
    userId: string,
    data: {
        displayName?: string;
        avatarUrl?: string;
        nativeLanguage?: string;
        targetLanguage?: string;
        country?: string;
        level?: Level;
        role?: UserRole;
    }
) {
    return prisma.user.update({
        where: { id: userId },
        data: data as any,
    });
}

export async function upsert(data: {
    id: string;
    email: string;
    displayName: string;
    nativeLanguage?: string;
    targetLanguage?: string;
    country?: string;
    level?: Level;
    role?: UserRole;
    passwordHash?: string;
}) {
    return prisma.user.upsert({
        where: { id: data.id },
        update: {
            email: data.email,
            displayName: data.displayName,
            nativeLanguage: data.nativeLanguage,
            targetLanguage: data.targetLanguage,
            country: data.country,
            level: data.level,
            role: data.role,
            ...(data.passwordHash ? { passwordHash: data.passwordHash } : {}),
        },
        create: {
            id: data.id,
            email: data.email,
            passwordHash: data.passwordHash || '',
            displayName: data.displayName,
            nativeLanguage: data.nativeLanguage || '',
            targetLanguage: data.targetLanguage || '',
            country: data.country,
            level: data.level,
            role: data.role || 'USER',
        } as any,
    });
}

export async function linkNeonAccount(oldId: string, newId: string) {
    // We use a transaction to ensure atomicity
    // In many DBs, we can't just update the ID if it's a PK via Prisma update.
    // Using raw SQL is the most reliable way to "swap" the ID for seeded accounts.
    return prisma.$executeRawUnsafe(
        'UPDATE "User" SET id = $1 WHERE id = $2',
        newId,
        oldId
    );
}

export async function addXp(userId: string, xp: number) {
    return prisma.user.update({
        where: { id: userId },
        data: {
            totalXp: { increment: xp },
        },
    });
}

export async function updateStreak(userId: string, streak: number) {
    const user = await findById(userId);
    if (!user) return null;

    return prisma.user.update({
        where: { id: userId },
        data: {
            currentStreak: streak,
            longestStreak: Math.max(user.longestStreak, streak),
        },
    });
}

export async function getStats(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            dailyLogs: {
                orderBy: { date: 'desc' },
                take: 30,
                include: {
                    tasks: true,
                },
            },
            titles: {
                include: {
                    title: true,
                },
            },
        },
    });

    if (!user) return null;

    // Filter out deprecated task types when calculating stats
    const DEPRECATED_TASKS = ['LEARN_VERBS'];

    const totalDays = user.dailyLogs.length;
    const completedDays = user.dailyLogs.filter(
        (log: { tasks: { completed: boolean; taskType: string }[] }) => {
            const activeTasks = log.tasks.filter(
                (t: { taskType: string }) => !DEPRECATED_TASKS.includes(t.taskType)
            );
            return activeTasks.length > 0 && activeTasks.every((t: { completed: boolean }) => t.completed);
        }
    ).length;

    return {
        totalXp: user.totalXp,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        totalDays,
        completedDays,
        completionRate: totalDays > 0 ? (completedDays / totalDays) * 100 : 0,
        titles: user.titles.map((ut: { title: unknown }) => ut.title),
    };
}
