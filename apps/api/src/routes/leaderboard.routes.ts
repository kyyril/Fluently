import { Router } from 'express';
import { sendSuccess } from '../utils/api-response';

const router = Router();

// Placeholder routes - to be implemented
router.get('/', (req, res) => {
    sendSuccess(res, {
        message: 'Leaderboard routes',
        endpoints: [
            'GET /leaderboard/weekly',
            'GET /leaderboard/all-time',
        ],
    });
});

// TODO: Implement leaderboard controller and service
// router.get('/weekly', optionalAuth, leaderboardController.getWeekly);
// router.get('/all-time', optionalAuth, leaderboardController.getAllTime);

export default router;
