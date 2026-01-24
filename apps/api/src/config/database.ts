import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

// Inisialisasi Lazy: Hanya dibuat saat pertama kali dipanggil
let prismaInstance: PrismaClient;

export const getPrisma = () => {
    if (prismaInstance) return prismaInstance;

    if (process.env.NODE_ENV === 'production') {
        prismaInstance = new PrismaClient();
    } else {
        if (!global.prisma) {
            global.prisma = new PrismaClient();
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
