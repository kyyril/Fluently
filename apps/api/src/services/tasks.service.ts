import { taskRepository, routineRepository, userRepository } from '../repositories';
import { NotFoundError, ForbiddenError } from '../utils/errors';
import * as routineService from './routine.service';

type TaskType =
    | 'PODCAST_LISTENING'
    | 'TRANSCRIBE_ARTICLE'
    | 'LEARN_VERBS'
    | 'SPEAKING_SESSION'
    | 'CREATE_SENTENCES'
    | 'DAY_RECAP';

// XP values for each task type
const XP_VALUES: Record<TaskType, number> = {
    PODCAST_LISTENING: 50,
    TRANSCRIBE_ARTICLE: 40,
    LEARN_VERBS: 60,
    SPEAKING_SESSION: 80,
    CREATE_SENTENCES: 30,
    DAY_RECAP: 40,
};

export async function completeTask(userId: string, taskId: string) {
    const task = await taskRepository.findById(taskId);
    if (!task) {
        throw new NotFoundError('Task');
    }

    // Verify ownership
    if (task.dailyLog.userId !== userId) {
        throw new ForbiddenError('Not your task');
    }

    // Already completed
    if (task.completed) {
        return {
            id: task.id,
            taskType: task.taskType,
            completed: true,
            completedAt: task.completedAt?.toISOString(),
            xpEarned: task.xpEarned,
            message: 'Task already completed',
        };
    }

    // Mark complete and award XP
    const xp = XP_VALUES[task.taskType as TaskType];
    const completed = await taskRepository.completeTask(taskId, xp);

    // Update daily log XP
    await routineRepository.addXpToLog(task.dailyLogId, xp);

    // Update user XP
    await userRepository.addXp(userId, xp);

    // Update streak
    await routineService.updateStreak(userId);

    return {
        id: completed.id,
        taskType: completed.taskType,
        completed: true,
        completedAt: completed.completedAt?.toISOString(),
        xpEarned: xp,
        message: `+${xp} XP earned!`,
    };
}

export async function updateTaskMetadata(
    userId: string,
    taskId: string,
    metadata: Record<string, unknown>
) {
    const task = await taskRepository.findById(taskId);
    if (!task) {
        throw new NotFoundError('Task');
    }

    if (task.dailyLog.userId !== userId) {
        throw new ForbiddenError('Not your task');
    }

    const updated = await taskRepository.updateTaskMetadata(taskId, metadata);

    return {
        id: updated.id,
        taskType: updated.taskType,
        completed: updated.completed,
        metadata: updated.metadata,
    };
}

export async function saveDayRecap(
    userId: string,
    dailyLogId: string,
    content: string,
    aiReview?: string
) {
    const log = await routineRepository.findDailyLogById(dailyLogId);
    if (!log) {
        throw new NotFoundError('Daily log');
    }

    if (log.userId !== userId) {
        throw new ForbiddenError('Not your daily log');
    }

    return routineRepository.updateDayRecap(dailyLogId, content, aiReview);
}

export function getXpForTaskType(taskType: TaskType): number {
    return XP_VALUES[taskType];
}
