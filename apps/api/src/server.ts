import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config';
import routes from './routes';
import { errorHandler } from './middleware';

const app = express();

// ============================================
// MIDDLEWARE
// ============================================

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
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv,
    });
});

// 404 handler
app.use((req, res) => {
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

export default app;
