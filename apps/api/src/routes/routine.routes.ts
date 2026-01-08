import { Router } from 'express';
import { routineController } from '../controllers';
import { authenticate } from '../middleware';

const router = Router();

// All routine routes require authentication
router.use(authenticate);

// Routes
router.get('/today', routineController.getToday);
router.post('/today', routineController.getToday); // Creates if not exists
router.get('/history', routineController.getHistory);

export default router;
