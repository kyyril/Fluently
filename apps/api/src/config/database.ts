import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

// Inisialisasi Lazy: Hanya dibuat saat pertama kali dipanggil
let prismaInstance: PrismaClient;

export const getPrisma = () => {
    if (prismaInstance) return prismaInstance;

    if (process.env.NODE_ENV === 'production') {
        try {
            prismaInstance = new PrismaClient();
        } catch (e) {
            console.error('Failed to initialize PrismaClient (Production):', e);
            // Fallback object to prevent immediate crash, though DB calls will fail
            prismaInstance = { $connect: async () => { }, $disconnect: async () => { } } as any;
        }
    } else {
        if (!global.prisma) {
            try {
                global.prisma = new PrismaClient();
            } catch (e) {
                console.error('Failed to initialize PrismaClient (Dev):', e);
            }
        }
        prismaInstance = global.prisma;
    }
    return prismaInstance;
};

// Export shim untuk kompatibilitas dengan kode yang sudah ada
export const prisma = new Proxy({} as PrismaClient, {
    get: (target, prop) => {
        const p = getPrisma();
        return (p as any)[prop];
    }
});
