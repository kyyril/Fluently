import { Router } from 'express';
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import routineRoutes from './routine.routes';
import tasksRoutes from './tasks.routes';
import leaderboardRoutes from './leaderboard.routes';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/routine', routineRoutes);
router.use('/tasks', tasksRoutes);
router.use('/leaderboard', leaderboardRoutes);

// API info
router.get('/', (req, res) => {
    res.json({
        name: 'Fluently API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth (register, login, onboarding)',
            users: '/api/users (me, profile, stats)',
            routine: '/api/routine (today, history)',
            tasks: '/api/tasks (complete, review, generate)',
            leaderboard: '/api/leaderboard (weekly, all-time)',
        },
    });
});

export default router;
