import { Router } from 'express';
import { z } from 'zod';
import { authController } from '../controllers';
import { validate, authenticate } from '../middleware';

const router = Router();

// Validation schemas
const RegisterSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        displayName: z.string().min(2, 'Name must be at least 2 characters').max(50),
        invitationCode: z.string().optional(),
    }),
});

const LoginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email'),
        password: z.string().min(1, 'Password is required'),
    }),
});

const OnboardingSchema = z.object({
    body: z.object({
        nativeLanguage: z.string().min(2),
        targetLanguage: z.string().min(2),
        level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
    }),
});

// Routes
router.post('/register', validate(RegisterSchema), authController.register);
router.post('/login', validate(LoginSchema), authController.login);
router.post(
    '/onboarding',
    authenticate,
    validate(OnboardingSchema),
    authController.completeOnboarding
);
router.post('/sync', authController.sync); // Public endpoint - user data comes from body

export default router;
