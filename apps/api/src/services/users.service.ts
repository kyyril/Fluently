import { userRepository } from '../repositories';
import { NotFoundError } from '../utils/errors';

type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export async function getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new NotFoundError('User');
    }

    return {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        nativeLanguage: user.nativeLanguage,
        targetLanguage: user.targetLanguage,
        level: user.level,
        role: (user as any).role,
        totalXp: user.totalXp,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    };
}

export async function updateProfile(
    userId: string,
    data: {
        displayName?: string;
        avatarUrl?: string;
        nativeLanguage?: string;
        targetLanguage?: string;
        level?: Level;
    }
) {
    const user = await userRepository.updateProfile(userId, data);
    return {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        nativeLanguage: user.nativeLanguage,
        targetLanguage: user.targetLanguage,
        level: user.level,
        role: (user as any).role,
        totalXp: user.totalXp,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    };
}

export async function getPublicProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new NotFoundError('User');
    }

    return {
        id: user.id,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        targetLanguage: user.targetLanguage,
        level: user.level,
        totalXp: user.totalXp,
        currentStreak: user.currentStreak,
    };
}

export async function getStats(userId: string) {
    const stats = await userRepository.getStats(userId);
    if (!stats) {
        throw new NotFoundError('User');
    }
    return stats;
}
