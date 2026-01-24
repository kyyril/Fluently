import { PrismaClient } from '../../prisma/generated-client';

// Prevent multiple instances during hot reload in development
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

const getPrismaClient = () => {
    try {
        const url = process.env.DATABASE_URL;
        if (!url || url.trim() === '') {
            console.warn('⚠️ DATABASE_URL is missing. Prisma will be initialized in a restricted state.');
        }
        return new PrismaClient({
            log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        });
    } catch (e) {
        console.error('❌ Failed to initialize PrismaClient:', e);
        // Return a proxy or a dummy if needed, but for now just returning the attempted client
        return new PrismaClient();
    }
};

export const prisma = globalThis.prisma ?? getPrismaClient();


if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}
