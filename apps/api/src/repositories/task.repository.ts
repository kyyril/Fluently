import { prisma } from '../config/database';

export async function findById(taskId: string) {
    return prisma.taskCompletion.findUnique({
        where: { id: taskId },
        include: {
            dailyLog: true,
        },
    });
}

export async function completeTask(taskId: string, xpEarned: number, metadata?: Record<string, unknown>) {
    return prisma.taskCompletion.update({
        where: { id: taskId },
        data: {
            completed: true,
            completedAt: new Date(),
            xpEarned,
            ...(metadata && { metadata: metadata as any }),
        },
    });
}

export async function updateTaskMetadata(
    taskId: string,
    metadata: Record<string, unknown>
) {
    return prisma.taskCompletion.update({
        where: { id: taskId },
        data: { metadata: metadata as any },
    });
}

export async function findByDailyLogAndType(
    dailyLogId: string,
    taskType: string
) {
    return prisma.taskCompletion.findFirst({
        where: {
            dailyLogId,
            taskType: taskType as any,
        },
    });
}

export async function getTasksForDailyLog(dailyLogId: string) {
    return prisma.taskCompletion.findMany({
        where: { dailyLogId },
        orderBy: { taskType: 'asc' },
    });
}
