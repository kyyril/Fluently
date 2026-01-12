import { userRepository } from '../repositories';
import { NotFoundError } from '../utils/errors';
import { redis } from '../config';

type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

const CACHE_TTL = 300; // 5 minutes

export async function getProfile(userId: string) {
    // Private profile - usually not cached or cached with short TTL auth-bound
    // Keeping it direct for now as it contains sensitive realtime sync data
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

    // Invalidate public profile cache
    await redis.del(`user:public:${userId}`);
    await redis.del(`user:stats:${userId}`);

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
    const cacheKey = `user:public:${userId}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
        return JSON.parse(cached);
    }

    const user = await userRepository.findPublicById(userId);
    if (!user) {
        throw new NotFoundError('User');
    }

    // Cache the result
    await redis.set(cacheKey, JSON.stringify(user), 'EX', CACHE_TTL);

    return user;
}

export async function getStats(userId: string) {
    const cacheKey = `user:stats:${userId}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
        return JSON.parse(cached);
    }

    const stats = await userRepository.getStats(userId);
    if (!stats) {
        throw new NotFoundError('User');
    }

    await redis.set(cacheKey, JSON.stringify(stats), 'EX', CACHE_TTL);

    return stats;
}
