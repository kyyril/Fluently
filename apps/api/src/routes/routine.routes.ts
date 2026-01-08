import { Router } from 'express';
import { sendSuccess } from '../utils/api-response';

const router = Router();

// Placeholder routes - to be implemented
router.get('/', (req, res) => {
    sendSuccess(res, {
        message: 'Routine routes',
        endpoints: [
            'GET /routine/today',
            'POST /routine/today',
            'GET /routine/history',
        ],
    });
});

// TODO: Implement routine controller and service
// router.get('/today', authenticate, routineController.getToday);
// router.post('/today', authenticate, routineController.createToday);
// router.get('/history', authenticate, routineController.getHistory);

export default router;
