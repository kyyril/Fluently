const Redis = require('ioredis');
const dotenv = require('dotenv');
dotenv.config();

async function flush() {
    if (!process.env.REDIS_URL) {
        console.log('REDIS_URL not found');
        return;
    }
    const redis = new Redis(process.env.REDIS_URL);
    await redis.flushall();
    console.log('Redis flushed clean.');
    await redis.quit();
}

flush().catch(console.error);
