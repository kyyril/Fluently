import { routineRepository, userRepository } from '../repositories';
import { NotFoundError } from '../utils/errors';

export async function getTodayRoutine(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let dailyLog = await routineRepository.findDailyLog(userId, today);

    if (!dailyLog) {
        dailyLog = await routineRepository.createDailyLog(userId, today);
    }

    // Calculate progress
    const completedTasks = dailyLog.tasks.filter(
        (t: { completed: boolean }) => t.completed
    ).length;
    const totalTasks = dailyLog.tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return {
        id: dailyLog.id,
        date: dailyLog.date.toISOString().split('T')[0],
        tasks: dailyLog.tasks.map(
            (task: {
                id: string;
                taskType: string;
                completed: boolean;
                completedAt: Date | null;
                xpEarned: number;
                metadata: unknown;
            }) => ({
                id: task.id,
                taskType: task.taskType,
                completed: task.completed,
                completedAt: task.completedAt?.toISOString() || null,
                xpEarned: task.xpEarned,
                metadata: task.metadata,
            })
        ),
        dayRecap: dailyLog.dayRecap,
        aiReview: dailyLog.aiReview,
        totalXp: dailyLog.totalXp,
        progress: Math.round(progress),
    };
}

export async function getHistory(
    userId: string,
    limit: number = 30,
    offset: number = 0
) {
    const logs = await routineRepository.getDailyLogHistory(userId, limit, offset);

    return logs.map(
        (log: {
            id: string;
            date: Date;
            totalXp: number;
            tasks: { completed: boolean }[];
            dayRecap: string | null;
        }) => ({
            id: log.id,
            date: log.date.toISOString().split('T')[0],
            totalXp: log.totalXp,
            tasksCompleted: log.tasks.filter((t) => t.completed).length,
            totalTasks: log.tasks.length,
            dayRecap: log.dayRecap,
        })
    );
}

export async function updateStreak(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const user = await userRepository.findById(userId);
    if (!user) throw new NotFoundError('User');

    // Check if user completed at least one task today
    const todayLog = await routineRepository.findDailyLog(userId, today);
    const hasCompletedToday = todayLog?.tasks.some(
        (t: { completed: boolean }) => t.completed
    );

    if (!hasCompletedToday) {
        return user.currentStreak;
    }

    // Check yesterday's log
    const yesterdayLog = await routineRepository.findDailyLog(userId, yesterday);
    const hadCompletedYesterday = yesterdayLog?.tasks.some(
        (t: { completed: boolean }) => t.completed
    );

    let newStreak: number;
    if (hadCompletedYesterday) {
        // Continue streak
        newStreak = user.currentStreak + 1;
    } else {
        // Start new streak
        newStreak = 1;
    }

    await userRepository.updateStreak(userId, newStreak);
    return newStreak;
}
