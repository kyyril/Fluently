import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default('4000').transform(Number),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    CORS_ORIGIN: z.string().default('http://localhost:3000'),
    JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    GEMINI_API_KEY: z.string().min(1, 'GEMINI_API_KEY is required'),
    REDIS_URL: z.string().default('redis://localhost:6379'),
    NEON_AUTH_JWKS_URL: z.string().min(1, 'NEON_AUTH_JWKS_URL is required'),
    ADMIN_EMAIL: z.string().email().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error('❌ Invalid environment variables:', parsedEnv.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;

export const config = {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
    corsOrigin: env.CORS_ORIGIN.split(',').map(origin => origin.trim()),
    jwtSecret: env.JWT_SECRET,
    jwtExpiresIn: env.JWT_EXPIRES_IN,
    databaseUrl: env.DATABASE_URL,
    geminiApiKey: env.GEMINI_API_KEY,
    redisUrl: env.REDIS_URL,
    neonAuthJwksUrl: env.NEON_AUTH_JWKS_URL,
    adminEmail: env.ADMIN_EMAIL,
} as const;
