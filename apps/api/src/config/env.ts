import dotenv from 'dotenv';

dotenv.config();

export const config = {
    // Server
    port: parseInt(process.env.PORT || '4000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',

    // CORS
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',

    // JWT
    jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

    // Database
    databaseUrl: process.env.DATABASE_URL,

    // Google Gemini
    geminiApiKey: process.env.GEMINI_API_KEY,
} as const;

// Validate required env vars in production
if (config.nodeEnv === 'production') {
    const required = ['DATABASE_URL', 'JWT_SECRET', 'GEMINI_API_KEY'];
    for (const key of required) {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    }
}
