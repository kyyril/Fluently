import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess, sendError } from '../utils/api-response';

const MAX_DAILY_READS = 3;
const XP_PER_ARTICLE = 20;
const BONUS_XP = 30;

// ============================================
// ADMIN: Create Article
// ============================================
export async function createArticle(req: Request, res: Response, next: NextFunction) {
    try {
        const { title, summary, content, coverImage, readTime, category, tags } = req.body;

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);

        const article = await (prisma as any).article.create({
            data: {
                title,
                slug,
                summary,
                content,
                coverImage,
                readTime: readTime || 5,
                category: category || 'General',
                tags: tags || [],
                published: false,
            },
        });

        sendSuccess(res, article, 201);
    } catch (error) {
        next(error);
    }
}

// ============================================
// ADMIN: Update Article
// ============================================
export async function updateArticle(req: Request, res: Response, next: NextFunction) {
    try {
        const { articleId } = req.params;
        const { title, summary, content, coverImage, readTime, published, category, tags } = req.body;

        const article = await (prisma as any).article.update({
            where: { id: articleId },
            data: {
                title,
                summary,
                content,
                coverImage,
                readTime,
                published,
                category,
                tags,
            },
        });

        sendSuccess(res, article);
    } catch (error) {
        next(error);
    }
}

// ============================================
// ADMIN: Delete Article
// ============================================
export async function deleteArticle(req: Request, res: Response, next: NextFunction) {
    try {
        const { articleId } = req.params;

        await (prisma as any).article.delete({
            where: { id: articleId },
        });

        sendSuccess(res, { message: 'Article deleted' });
    } catch (error) {
        next(error);
    }
}

// ============================================
// ADMIN: Get All Articles (including unpublished)
// ============================================
export async function getAllArticlesAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const articles = await (prisma as any).article.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { reads: true }
                }
            }
        });

        sendSuccess(res, articles);
    } catch (error) {
        next(error);
    }
}

// ============================================
// USER: Get Published Articles
// ============================================
export async function getArticles(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).userId;
        const { search, category } = req.query;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const where: any = { published: true };

        if (search) {
            where.OR = [
                { title: { contains: search as string, mode: 'insensitive' } },
                { summary: { contains: search as string, mode: 'insensitive' } },
                { tags: { has: search as string } }
            ];
        }

        if (category && category !== 'All') {
            where.category = category as string;
        }

        const articles = await (prisma as any).article.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                slug: true,
                summary: true,
                coverImage: true,
                readTime: true,
                category: true,
                tags: true,
                createdAt: true,
            }
        });

        // Get user's reads for today
        const todayReads = await (prisma as any).articleRead.findMany({
            where: {
                userId,
                date: today,
                completed: true,
            },
            select: {
                articleId: true,
            }
        });

        const readArticleIds = new Set(todayReads.map((r: any) => r.articleId));
        const dailyReadsCount = todayReads.length;

        const articlesWithStatus = articles.map((article: any) => ({
            ...article,
            isReadToday: readArticleIds.has(article.id),
        }));

        sendSuccess(res, {
            articles: articlesWithStatus,
            dailyProgress: {
                completed: dailyReadsCount,
                max: MAX_DAILY_READS,
                bonusEarned: dailyReadsCount >= MAX_DAILY_READS,
            }
        });
    } catch (error) {
        next(error);
    }
}

// ============================================
// USER: Get Single Article
// ============================================
export async function getArticle(req: Request, res: Response, next: NextFunction) {
    try {
        const { slug } = req.params;

        const article = await (prisma as any).article.findUnique({
            where: { slug },
        });

        if (!article) {
            return sendError(res, 'Article not found', 404);
        }

        const isAdmin = (req as any).role === 'ADMIN';
        if (!article.published && !isAdmin) {
            return sendError(res, 'Article not found', 404);
        }

        sendSuccess(res, article);
    } catch (error) {
        next(error);
    }
}

// ============================================
// USER: Complete Article (Earn XP)
// ============================================
export async function completeArticle(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).userId;
        const { articleId } = req.params;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if article exists and is published
        const article = await (prisma as any).article.findUnique({
            where: { id: articleId },
        });

        if (!article || !article.published) {
            return sendError(res, 'Article not found', 404);
        }

        // Check if already read today
        const existingRead = await (prisma as any).articleRead.findFirst({
            where: {
                userId,
                articleId,
                date: today,
                completed: true,
            }
        });

        if (existingRead) {
            return sendError(res, 'Article already completed today', 400);
        }

        // Check daily limit
        const todayReadsCount = await (prisma as any).articleRead.count({
            where: {
                userId,
                date: today,
                completed: true,
            }
        });

        if (todayReadsCount >= MAX_DAILY_READS) {
            return sendError(res, 'Daily reading limit reached', 400);
        }

        // Calculate XP
        let xpEarned = XP_PER_ARTICLE;
        const isLastRead = todayReadsCount === MAX_DAILY_READS - 1;
        if (isLastRead) {
            xpEarned += BONUS_XP; // Bonus for completing all 3
        }

        // Create or update read record
        await (prisma as any).articleRead.upsert({
            where: {
                userId_articleId_date: {
                    userId,
                    articleId,
                    date: today,
                }
            },
            create: {
                userId,
                articleId,
                date: today,
                completed: true,
                completedAt: new Date(),
                xpEarned,
            },
            update: {
                completed: true,
                completedAt: new Date(),
                xpEarned,
            }
        });

        // Update user's total XP
        await prisma.user.update({
            where: { id: userId },
            data: {
                totalXp: { increment: xpEarned }
            }
        });

        sendSuccess(res, {
            xpEarned,
            bonusEarned: isLastRead,
            dailyProgress: {
                completed: todayReadsCount + 1,
                max: MAX_DAILY_READS,
            }
        });
    } catch (error) {
        next(error);
    }
}

// ============================================
// USER: Get Daily Reading Progress
// ============================================
export async function getDailyProgress(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).userId;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayReads = await (prisma as any).articleRead.findMany({
            where: {
                userId,
                date: today,
                completed: true,
            },
            include: {
                article: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    }
                }
            }
        });

        const totalXpToday = todayReads.reduce((sum: number, r: any) => sum + r.xpEarned, 0);

        sendSuccess(res, {
            completed: todayReads.length,
            max: MAX_DAILY_READS,
            bonusEarned: todayReads.length >= MAX_DAILY_READS,
            totalXpToday,
            readArticles: todayReads.map((r: any) => r.article),
        });
    } catch (error) {
        next(error);
    }
}
