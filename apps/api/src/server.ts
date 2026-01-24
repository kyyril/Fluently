import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config';
import routes from './routes';
import { errorHandler, requestLogger } from './middleware';

const app = express();



// ============================================
// MIDDLEWARE
// ============================================

// Performance & Status Logging
app.use(requestLogger);

// Security headers
app.use(helmet());

// Gzip compression
app.use(compression());

// CORS
app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// ROUTES
// ============================================

// API routes
app.use('/api', routes);

// Health check
app.get('/', (req: Request, res: Response) => {
    res.send('Fluently API is running 🚀');
});

app.get('/health', (req: Request, res: Response) => {
    res.json({
        status: (config as any)._errors ? 'error' : 'ok',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv,
        configErrors: (config as any)._errors || null,
        vercel: !!process.env.VERCEL,
    });
});



// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: 'Not found',
        code: 'NOT_FOUND',
    });
});

// ============================================
// ERROR HANDLING
// ============================================

app.use(errorHandler);

// ============================================
// START SERVER
// ============================================

// Only start the server if not running in a serverless environment (Vercel)
if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
    const server = app.listen(config.port, () => {
        console.log(`
🚀 Fluently API Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Port:        ${config.port}
   Environment: ${config.nodeEnv}
   Health:      http://localhost:${config.port}/health
   API:         http://localhost:${config.port}/api
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('SIGTERM received. Shutting down gracefully...');
        server.close(() => {
            console.log('Server closed.');
            process.exit(0);
        });
    });
}


export default app;
