import { Request, Response } from 'express';

// Lazy loading handler to ensure we catch ANY import/init errors
const handler = async (req: Request, res: Response) => {
    try {
        console.log('Incoming request to Vercel Function...');

        // Lazy load the application
        // We use require() here so that if src/server throws on load, we catch it.
        const appModule = require('../src/server');
        const app = appModule.default || appModule;

        return app(req, res);
    } catch (error: any) {
        console.error('CRITICAL RUNTIME ERROR:', error);

        // Return a visible 500 JSON to the browser/client
        res.status(500).json({
            status: 'CRITICAL_ERROR',
            message: 'The Serverless Function crashed during startup.',
            reason: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            hint: 'This often means a module (like Prisma or Redis) failed to initialize at the top Level.'
        });
    }
};

module.exports = handler;
