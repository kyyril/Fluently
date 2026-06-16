import Redis from 'ioredis';
import { config } from './env';

type RedisValue = string | null;

type RedisClient = {
    get: (key: string) => Promise<RedisValue>;
    set: (key: string, value: string, ...args: any[]) => Promise<'OK' | string>;
    del: (...keys: string[]) => Promise<number>;
    expire: (key: string, seconds: number) => Promise<number>;
    on: (event: string, listener: (...args: any[]) => void) => void;
    once: (event: string, listener: (...args: any[]) => void) => void;
    quit: () => Promise<unknown>;
    disconnect: () => void;
};

const memoryCache = new Map<string, { value: string; expiresAt?: number }>();
let realRedis: any = null;
let redisFailed = false;

const getMemoryValue = (key: string): RedisValue => {
    const cached = memoryCache.get(key);
    if (!cached) return null;

    if (cached.expiresAt && cached.expiresAt <= Date.now()) {
        memoryCache.delete(key);
        return null;
    }

    return cached.value;
};

const getExpirySeconds = (args: any[]) => {
    const exIndex = args.indexOf('EX');
    if (exIndex === -1) return undefined;
    const value = Number(args[exIndex + 1]);
    return Number.isFinite(value) ? value : undefined;
};

const createMemoryRedis = (): RedisClient => ({
    async get(key: string) {
        return getMemoryValue(key);
    },

    async set(key: string, value: string, ...args: any[]) {
        const ttlSeconds = getExpirySeconds(args);
        memoryCache.set(key, {
            value,
            expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
        });
        return 'OK';
    },

    async del(...keys: string[]) {
        let deleted = 0;
        keys.forEach((key) => {
            if (memoryCache.delete(key)) deleted += 1;
        });
        return deleted;
    },

    async expire(key: string, seconds: number) {
        const cached = memoryCache.get(key);
        if (!cached) return 0;
        cached.expiresAt = Date.now() + seconds * 1000;
        return 1;
    },

    on: () => {},
    once: () => {},
    async quit() {
        memoryCache.clear();
        return 'OK';
    },
    disconnect: () => {},
});

const createRealRedis = () => {
    if (!config.redisUrl || config.redisUrl.trim() === '') return null;

    try {
        return new Redis(config.redisUrl, {
            maxRetriesPerRequest: 1,
            connectTimeout: 3000,
            retryStrategy: () => null,
            lazyConnect: true,
            enableOfflineQueue: false,
        });
    } catch (error: any) {
        console.warn('[Redis] Failed to create Redis client, using memory fallback:', error.message);
        return null;
    }
};

const safeGet = async (key: string): Promise<RedisValue> => {
    const memoryValue = getMemoryValue(key);

    if (!realRedis) {
        return memoryValue;
    }

    try {
        const value = await realRedis.get(key);
        if (value !== null) {
            memoryCache.set(key, { value });
            return value;
        }

        return memoryValue;
    } catch (error: any) {
        if (!redisFailed) {
            console.warn('[Redis] Get failed, using memory fallback:', error.message);
            redisFailed = true;
        }
        return memoryValue;
    }
};

const safeSet = async (key: string, value: string, ...args: any[]): Promise<'OK' | string> => {
    const ttlSeconds = getExpirySeconds(args);
    memoryCache.set(key, {
        value,
        expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
    });

    if (!realRedis) return 'OK';

    try {
        return await realRedis.set(key, value, ...args);
    } catch (error: any) {
        if (!redisFailed) {
            console.warn('[Redis] Set failed, using memory fallback:', error.message);
            redisFailed = true;
        }
        return 'OK';
    }
};

const safeDel = async (...keys: string[]): Promise<number> => {
    let deleted = 0;
    keys.forEach((key) => {
        if (memoryCache.delete(key)) deleted += 1;
    });

    if (!realRedis) return deleted;

    try {
        const redisDeleted = await realRedis.del(...keys);
        return Math.max(deleted, Number(redisDeleted) || 0);
    } catch (error: any) {
        if (!redisFailed) {
            console.warn('[Redis] Del failed, using memory fallback:', error.message);
            redisFailed = true;
        }
        return deleted;
    }
};

const safeExpire = async (key: string, seconds: number): Promise<number> => {
    const cached = memoryCache.get(key);
    if (cached) {
        cached.expiresAt = Date.now() + seconds * 1000;
    }

    if (!realRedis) return cached ? 1 : 0;

    try {
        return await realRedis.expire(key, seconds);
    } catch (error: any) {
        if (!redisFailed) {
            console.warn('[Redis] Expire failed, using memory fallback:', error.message);
            redisFailed = true;
        }
        return cached ? 1 : 0;
    }
};

realRedis = createRealRedis();

if (!realRedis) {
    console.log('[Redis] Using memory fallback. Redis is optional.');
} else {
    console.log('[Redis] Redis client created. Failures will fall back to memory.');
    realRedis.on('error', (error: any) => {
        if (!redisFailed) {
            console.warn('[Redis] Redis error, using memory fallback:', error.message);
            redisFailed = true;
        }
    });
}

export const redis: RedisClient = {
    get: safeGet,
    set: safeSet,
    del: safeDel,
    expire: safeExpire,
    on: (event, listener) => realRedis?.on?.(event, listener),
    once: (event, listener) => realRedis?.once?.(event, listener),
    async quit() {
        if (realRedis) {
            try {
                await realRedis.quit();
            } catch {
                realRedis.disconnect();
            }
        }
        memoryCache.clear();
        return 'OK';
    },
    disconnect() {
        realRedis?.disconnect?.();
        memoryCache.clear();
    },
};
