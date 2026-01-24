import express, { Request, Response } from 'express';

const app = express();

app.get('/api/test', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        message: 'Hello from Vercel isolated test',
        env: {
            node_env: process.env.NODE_ENV,
            has_db: !!process.env.DATABASE_URL
        }
    });
});

// Fallback jika aplikasi utama gagal diimpor
app.get('/api/health', (req: Request, res: Response) => {
    try {
        // Coba impor aplikasi asli
        const mainApp = require('../src/server').default;
        return mainApp(req, res);
    } catch (e: any) {
        res.json({
            status: 'degraded',
            error: e.message,
            hint: 'Aplikasi utama gagal dimuat secara dinamis'
        });
    }
});

// Route catch-all
app.all('*', (req: Request, res: Response) => {
    try {
        const mainApp = require('../src/server').default;
        return mainApp(req, res);
    } catch (e: any) {
        res.status(500).json({ error: 'Crashed', details: e.message });
    }
});

export default app;
