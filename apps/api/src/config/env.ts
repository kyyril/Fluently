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
    REDIS_URL: z.string().default('redis://localhost:6379'),
    NEON_AUTH_JWKS_URL: z.string().min(1, 'NEON_AUTH_JWKS_URL is required'),
    ADMIN_EMAIL: z.string().email().optional(),
    INVITATION_CODE: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    const errors = parsedEnv.error.flatten().fieldErrors;
    console.error('❌ Invalid environment variables:', JSON.stringify(errors, null, 2));

    // In Vercel, we want to see this in logs, but maybe not crash and die if it's just missing non-critical vars
    // However, for the ones marked required, we must throw.
    if (process.env.VERCEL) {
        console.warn('⚠️ Running on Vercel with invalid configuration. Check your environment variables.');
    }

    throw new Error(`Invalid environment variables: ${Object.keys(errors).join(', ')}`);
}

export const env = parsedEnv.data;

export const config = {
    port: env.PORT,
    nodeEnv: env.NODE_ENV,
    corsOrigin: env.CORS_ORIGIN.split(',').map(origin => origin.trim()),
    jwtSecret: env.JWT_SECRET,
    jwtExpiresIn: env.JWT_EXPIRES_IN,
    databaseUrl: env.DATABASE_URL,
    redisUrl: env.REDIS_URL,
    neonAuthJwksUrl: env.NEON_AUTH_JWKS_URL,
    adminEmail: env.ADMIN_EMAIL,
    invitationCode: env.INVITATION_CODE,
} as const;
