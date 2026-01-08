import { Router } from 'express';
import authRoutes from './auth.routes';
import routineRoutes from './routine.routes';
import leaderboardRoutes from './leaderboard.routes';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/routine', routineRoutes);
router.use('/leaderboard', leaderboardRoutes);

// API info
router.get('/', (req, res) => {
    res.json({
        name: 'Fluently API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            routine: '/api/routine',
            leaderboard: '/api/leaderboard',
        },
    });
});

export default router;
