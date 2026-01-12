import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { sendSuccess } from '../utils/api-response';

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await prisma.user.findMany({
            where: {
                role: 'USER' as any
            },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                email: true,
                displayName: true,
                role: true,
                level: true,
                totalXp: true,
                currentStreak: true,
                createdAt: true,
            }
        } as any);
        sendSuccess(res, users);
    } catch (error) {
        next(error);
    }
}

export async function updateUserRole(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        const user = await prisma.user.update({
            where: { id: userId },
            data: { role },
            select: {
                id: true,
                email: true,
                displayName: true,
                role: true,
            }
        } as any);

        sendSuccess(res, user);
    } catch (error) {
        next(error);
    }
}

export async function getUserDetail(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                dailyLogs: {
                    orderBy: { date: 'desc' },
                    take: 7,
                    include: {
                        tasks: true
                    }
                },
                titles: {
                    include: {
                        title: true
                    }
                }
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        sendSuccess(res, user);
    } catch (error) {
        next(error);
    }
}
