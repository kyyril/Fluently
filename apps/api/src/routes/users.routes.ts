import { Router } from 'express';
import { z } from 'zod';
import { usersController } from '../controllers';
import { validate, authenticate } from '../middleware';

const router = Router();

// Validation schemas
const UpdateProfileSchema = z.object({
    body: z.object({
        displayName: z.string().min(2).max(50).optional(),
        avatarUrl: z.string().url().optional(),
        nativeLanguage: z.string().min(2).optional(),
        targetLanguage: z.string().min(2).optional(),
        level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
    }),
});

// Routes
router.get('/me', authenticate, usersController.getMe);
router.get('/me/stats', authenticate, usersController.getMyStats);
router.patch('/me', authenticate, validate(UpdateProfileSchema), usersController.updateMe);
router.get('/:id', usersController.getPublicProfile);
router.get('/:id/stats', usersController.getUserStats);
router.get('/:id/history', usersController.getUserHistory);

export default router;
