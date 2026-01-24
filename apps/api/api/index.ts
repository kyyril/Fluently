let app: any;
let error: any = null;

try {
    // Kita impor di dalam try-catch supaya jika ada crash saat loading (misal Prisma error),
    // aplikasinya tidak langsung mati total di Vercel.
    app = require('../src/server').default;
} catch (e: any) {
    console.error('CRITICAL STARTUP ERROR:', e);
    error = e;
}

export default function (req: any, res: any) {
    if (error) {
        return res.status(500).json({
            error: 'Failed to start application',
            message: error.message,
            stack: error.stack,
            hint: 'Check your environment variables like DATABASE_URL or NEON_AUTH_JWKS_URL'
        });
    }

    if (app) {
        return app(req, res);
    }

    return res.status(500).json({ error: 'Application not initialized' });
}
