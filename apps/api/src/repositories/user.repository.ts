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
            level: data.level || 'BEGINNER',
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

    const totalDays = user.dailyLogs.length;
    const completedDays = user.dailyLogs.filter(
        (log: { tasks: { completed: boolean }[] }) =>
            log.tasks.every((t: { completed: boolean }) => t.completed)
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
