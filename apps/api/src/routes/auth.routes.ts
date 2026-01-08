import { Router } from 'express';
import { sendSuccess } from '../utils/api-response';

const router = Router();

// Placeholder routes - to be implemented
router.get('/', (req, res) => {
    sendSuccess(res, {
        message: 'Auth routes',
        endpoints: [
            'POST /auth/register',
            'POST /auth/login',
            'POST /auth/refresh',
            'POST /auth/logout',
        ],
    });
});

// TODO: Implement auth controller and service
// router.post('/register', validate(RegisterSchema), authController.register);
// router.post('/login', validate(LoginSchema), authController.login);
// router.post('/refresh', authController.refresh);
// router.post('/logout', authenticate, authController.logout);

export default router;
