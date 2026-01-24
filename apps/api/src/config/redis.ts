import Redis from 'ioredis';
import { config } from './env';

// Deteksi apakah sedang di Vercel dan apakah URL Redis tersedia
const hasRedisUrl = config.redisUrl && config.redisUrl.trim() !== '' && !config.redisUrl.includes('localhost');
const shouldSkipRedis = process.env.VERCEL && !hasRedisUrl;

let redis: any;

if (shouldSkipRedis) {
    console.warn('[Redis] No valid REDIS_URL found on Vercel. Using memory mock.');
    redis = {
        get: async () => null,
        set: async () => null,
        del: async () => null,
        on: () => { },
        once: () => { },
        quit: async () => 'OK',
    } as any;
} else {
    try {
        redis = new Redis(config.redisUrl, {
            maxRetriesPerRequest: 1,
            connectTimeout: 2000,
            lazyConnect: true, // PENTING: Jangan langsung konek saat booting
            retryStrategy: (times: number) => (times > 2 ? null : 100),
        });

        redis.on('error', (err: any) => {
            if (config.nodeEnv !== 'development' || (err as any).code !== 'ECONNREFUSED') {
                console.error('[Redis] Connection Error:', err.message);
            }
        });
    } catch (e: any) {
        console.error('[Redis] Failed to initialize:', e.message);
        // Fallback agar tidak crash total
        redis = { get: async () => null, set: async () => null, on: () => { } } as any;
    }
}

export { redis };
