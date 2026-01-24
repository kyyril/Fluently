import { Router } from 'express';
import { z } from 'zod';
import { tasksController } from '../controllers';
import { validate, authenticate } from '../middleware';

const router = Router();

// All task routes require authentication
router.use(authenticate);

// Validation schemas
const CompleteTaskSchema = z.object({
    body: z.object({
        metadata: z.record(z.string(), z.unknown()).optional(),
    }),
});

// Routes
router.post('/:taskId/complete', validate(CompleteTaskSchema), tasksController.completeTask);

export default router;
