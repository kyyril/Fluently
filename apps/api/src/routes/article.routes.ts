import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/admin.middleware';
import {
    createArticle,
    updateArticle,
    deleteArticle,
    getAllArticlesAdmin,
    getArticles,
    getArticle,
    completeArticle,
    getDailyProgress,
} from '../controllers/article.controller';

const router = Router();

// ============================================
// PUBLIC/USER ROUTES
// ============================================
router.get('/', authenticate, getArticles);
router.get('/progress', authenticate, getDailyProgress);
router.get('/:slug', authenticate, getArticle);
router.post('/:articleId/complete', authenticate, completeArticle);

// ============================================
// ADMIN ROUTES
// ============================================
router.get('/admin/all', authenticate, requireAdmin, getAllArticlesAdmin);
router.post('/admin', authenticate, requireAdmin, createArticle);
router.put('/admin/:articleId', authenticate, requireAdmin, updateArticle);
router.delete('/admin/:articleId', authenticate, requireAdmin, deleteArticle);

export default router;
