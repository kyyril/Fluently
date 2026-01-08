import { Router } from 'express';
import { leaderboardController } from '../controllers';
import { optionalAuth } from '../middleware';

const router = Router();

// Leaderboard routes use optional auth to include user rank if logged in
router.get('/weekly', optionalAuth, leaderboardController.getWeekly);
router.get('/all-time', optionalAuth, leaderboardController.getAllTime);

export default router;
