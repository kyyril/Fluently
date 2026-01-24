import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default('4000').transform(Number),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    CORS_ORIGIN: z.string().default('*'),
    JWT_SECRET: z.string().default('secret-key-placeholder'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    DATABASE_URL: z.string().optional().default(''),
    REDIS_URL: z.string().optional().default(''),
    NEON_AUTH_JWKS_URL: z.string().optional().default(''),
    ADMIN_EMAIL: z.string().email().optional(),
    INVITATION_CODE: z.string().optional(),
});


const parsedEnv = envSchema.safeParse(process.env);
const envErrors = !parsedEnv.success ? Object.keys(parsedEnv.error.flatten().fieldErrors) : null;

if (envErrors) {
    console.error('❌ Missing/Invalid Env Vars:', envErrors.join(', '));
}

// Fallback values for diagnostic mode
const data = parsedEnv.success ? parsedEnv.data : {
    PORT: 4000,
    NODE_ENV: 'production' as const,
    CORS_ORIGIN: '*',
    JWT_SECRET: 'temp',
    JWT_EXPIRES_IN: '7d',
    DATABASE_URL: '',
    REDIS_URL: '',
    NEON_AUTH_JWKS_URL: '',
};

export const config = {
    port: data.PORT,
    nodeEnv: data.NODE_ENV,
    corsOrigin: (data.CORS_ORIGIN || '').split(',').map(origin => origin.trim()),
    jwtSecret: data.JWT_SECRET,
    jwtExpiresIn: data.JWT_EXPIRES_IN,
    databaseUrl: data.DATABASE_URL,
    redisUrl: data.REDIS_URL,
    neonAuthJwksUrl: data.NEON_AUTH_JWKS_URL,
    adminEmail: (data as any).ADMIN_EMAIL,
    invitationCode: (data as any).INVITATION_CODE,
    _errors: envErrors,
} as const;

