import { Router } from 'express';
import { z } from 'zod';
import { tasksController } from '../controllers';
import { validate, authenticate } from '../middleware';

const router = Router();

// All task routes require authentication
router.use(authenticate);

// Validation schemas
const UpdateTaskSchema = z.object({
    body: z.object({
        metadata: z.record(z.unknown()),
    }),
});

const DayRecapReviewSchema = z.object({
    body: z.object({
        content: z.string().min(10, 'Recap must be at least 10 characters'),
        dailyLogId: z.string().optional(),
    }),
});

const GenerateSentencesSchema = z.object({
    body: z.object({
        verbs: z.array(z.string()).min(1).max(10),
    }),
});

// Routes
router.post('/:taskId/complete', tasksController.completeTask);
router.patch('/:taskId', validate(UpdateTaskSchema), tasksController.updateTask);
router.post('/day-recap/review', validate(DayRecapReviewSchema), tasksController.reviewDayRecap);
router.post('/generate-sentences', validate(GenerateSentencesSchema), tasksController.generateSentences);

export default router;
