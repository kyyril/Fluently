import { Router } from 'express';
import { getDetailedHistory } from '../controllers/history.controller';
import { authenticate } from '../middleware';

const router = Router();

// All history routes require authentication
router.use(authenticate);

// GET /api/history - Get detailed learning history with filters
// Query params: period (week|month|3months|all), taskType, limit, offset
router.get('/', getDetailedHistory);

export default router;
