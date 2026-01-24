import { Request, Response } from 'express';
import { execSync } from 'child_process';

// Wrapper to catch startup errors and print them to the browser
export default async (req: Request, res: Response) => {
    try {
        console.log('Bootstrapping API...');

        // 1. Force Prisma Generate (Fail-safe for missing client)
        if (process.env.VERCEL) {
            try {
                console.log('Running prisma generate...');
                execSync('npx prisma generate', { stdio: 'inherit' });
                console.log('Prisma generated successfully.');
            } catch (e) {
                console.error('Prisma generate failed (ignoring, hoping it exists):', e);
            }
        }

        // 2. Dynamic import to catch errors during module loading
        const app = (await import('../src/server')).default;
        console.log('App loaded successfully');
        return app(req, res);
    } catch (error: any) {
        console.error('CRITICAL BOOTSTRAP ERROR:', error);
        res.status(500).json({
            error: 'Server failed to start',
            message: error.message,
            stack: error.stack,
            details: 'Check Vercel text logs for more info'
        });
    }
};
