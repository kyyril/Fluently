import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { userRepository } from '../repositories';
import { ConflictError, UnauthorizedError } from '../utils/errors';

type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

const SALT_ROUNDS = 12;

interface UserData {
    id: string;
    email: string;
    displayName: string;
    avatarUrl: string | null;
    nativeLanguage: string;
    targetLanguage: string;
    country: string | null;
    level: string;
    totalXp: number;
    currentStreak: number;
    longestStreak: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function register(data: {
    email: string;
    password: string;
    displayName: string;
}) {
    // Check if user exists
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
        throw new ConflictError('Email already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

    // Create user
    const user = await userRepository.create({
        email: data.email,
        passwordHash,
        displayName: data.displayName,
    });

    // Generate token
    const token = generateToken(user.id);

    return {
        user: sanitizeUser(user as UserData),
        token,
    };
}

export async function login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new UnauthorizedError('Invalid email or password');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
        throw new UnauthorizedError('Invalid email or password');
    }

    const token = generateToken(user.id);

    return {
        user: sanitizeUser(user as UserData),
        token,
    };
}

export async function completeOnboarding(
    userId: string,
    data: {
        nativeLanguage: string;
        targetLanguage: string;
        country?: string;
        level: Level;
    }
) {
    const user = await userRepository.updateProfile(userId, {
        nativeLanguage: data.nativeLanguage,
        targetLanguage: data.targetLanguage,
        country: data.country,
        level: data.level,
    });

    return sanitizeUser(user as UserData);
}

function generateToken(userId: string): string {
    const expiresIn = config.jwtExpiresIn || '7d';
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn } as jwt.SignOptions);
}

function sanitizeUser(user: UserData) {
    return {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        nativeLanguage: user.nativeLanguage,
        targetLanguage: user.targetLanguage,
        country: user.country,
        level: user.level,
        totalXp: user.totalXp,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    };
}
