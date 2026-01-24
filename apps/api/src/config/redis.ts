import Redis from 'ioredis';
import { config } from './env';

// In Vercel, if REDIS_URL is not provided or is default/localhost, we might want to skip or be very careful
const isDefaultRedis = config.redisUrl.includes('localhost');
const shouldSkipRedis = process.env.VERCEL && isDefaultRedis;

if (shouldSkipRedis) {
    console.warn('[Redis] Default Redis URL detected on Vercel. Skipping Redis connection to prevent hang.');
}

const redis = shouldSkipRedis
    ? {
        get: async () => null,
        set: async () => null,
        del: async () => null,
        on: () => { },
        once: () => { },
        quit: async () => 'OK',
    } as any
    : new Redis(config.redisUrl, {
        maxRetriesPerRequest: 1, // Minimize retries in serverless
        connectTimeout: 2000,
        retryStrategy(times) {
            if (times > 2) {
                return null; // Stop retrying quickly
            }
            return 100;
        },
    });



redis.on('error', (err: any) => {
    // Suppress error logs in development if Redis is not running
    if (config.nodeEnv === 'development' && (err as any).code === 'ECONNREFUSED') {
        // console.warn('[Redis] Connection refused (is Redis running?)');
    } else {
        console.error('[Redis] Error:', err);
    }
});

redis.on('connect', () => {
    console.log('[Redis] Connected successfully');
});

export { redis };
