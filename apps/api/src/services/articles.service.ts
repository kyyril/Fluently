import { prisma } from '../config/database';
import { redis } from '../config';
import { NotFoundError } from '../utils/errors';

const CACHE_TTL = 3600; // 1 hour for articles

export async function getArticles(search?: string, category?: string) {
    const cacheKey = `articles:list:${category || 'all'}`;

    // Only cache if no search is applied
    if (!search) {
        const cached = await redis.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
    }

    const where: any = { published: true };

    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { summary: { contains: search, mode: 'insensitive' } },
            { tags: { has: search } }
        ];
    }

    if (category && category !== 'All') {
        where.category = category;
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

    // Cache the result if no search
    if (!search && articles.length > 0) {
        await redis.set(cacheKey, JSON.stringify(articles), 'EX', CACHE_TTL);
    }

    return articles;
}

export async function getArticleBySlug(slug: string, isAdmin: boolean = false) {
    const cacheKey = `article:slug:${slug}`;

    if (!isAdmin) {
        const cached = await redis.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
    }

    const article = await (prisma as any).article.findUnique({
        where: { slug },
    });

    if (!article) {
        return null;
    }

    if (!article.published && !isAdmin) {
        return null;
    }

    // Cache valid published articles
    if (article.published) {
        await redis.set(cacheKey, JSON.stringify(article), 'EX', CACHE_TTL);
    }

    return article;
}

export async function invalidateArticleCache(category?: string, slug?: string) {
    const keys = ['articles:list:all'];
    if (category) {
        keys.push(`articles:list:${category}`);
    }
    if (slug) {
        keys.push(`article:slug:${slug}`);
    }

    await Promise.all(keys.map(key => redis.del(key)));
}
