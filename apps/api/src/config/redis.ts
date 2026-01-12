import Redis from 'ioredis';
import { config } from './env';

const redis = new Redis(config.redisUrl, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
        if (times > 3) {
            console.warn('[Redis] Max retries reached, Redis connection failed.');
            return null; // Stop retrying
        }
        return Math.min(times * 100, 3000);
    },
});

redis.on('error', (err) => {
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
