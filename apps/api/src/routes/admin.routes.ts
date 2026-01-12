import { Router } from 'express';
import { adminController } from '../controllers';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate, authorizeAdmin);

router.get('/users', adminController.getAllUsers);
router.get('/users/:userId', adminController.getUserDetail);
router.patch('/users/:userId/role', adminController.updateUserRole);

export default router;
