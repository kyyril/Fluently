import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { userRepository } from '../repositories';
import { ConflictError, UnauthorizedError, BadRequestError } from '../utils/errors';

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
    role: string;
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
    invitationCode?: string;
}) {
    // Validate invitation code if required
    const requiredCode = config.invitationCode;
    if (requiredCode) {
        if (!data.invitationCode || data.invitationCode !== requiredCode) {
            throw new BadRequestError('Invalid invitation code');
        }
    }

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
    const token = generateToken(user.id, user.email);

    return {
        user: sanitizeUser(user as unknown as UserData),
        token,
    };
}

export async function login(email: string, password: string) {
    const user = await userRepository.findAuthByEmail(email);
    if (!user) {
        throw new UnauthorizedError('Invalid email or password');
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
        throw new UnauthorizedError('Invalid email or password');
    }

    const token = generateToken(user.id, user.email);

    return {
        user: sanitizeUser(user as unknown as UserData),
        token,
    };
}

export async function completeOnboarding(
    userId: string,
    email: string,
    displayName: string,
    data: {
        nativeLanguage: string;
        targetLanguage: string;
        country?: string;
        level: Level;
    }
) {
    const user = await userRepository.upsert({
        id: userId,
        email,
        displayName: displayName || email.split('@')[0],
        nativeLanguage: data.nativeLanguage,
        targetLanguage: data.targetLanguage,
        country: data.country,
        level: data.level,
    } as any);

    return sanitizeUser(user as unknown as UserData);
}

function generateToken(userId: string, email: string): string {
    const expiresIn = config.jwtExpiresIn || '7d';
    return jwt.sign({ userId, email }, config.jwtSecret, { expiresIn } as jwt.SignOptions);
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
        role: user.role,
        totalXp: user.totalXp,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    };
}
