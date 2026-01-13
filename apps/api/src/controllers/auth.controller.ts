import { Request, Response, NextFunction } from 'express';
import { authService } from '../services';
import { sendSuccess, sendCreated } from '../utils/api-response';

export async function register(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { email, password, displayName } = req.body;
        const result = await authService.register({ email, password, displayName });
        sendCreated(res, result);
    } catch (error) {
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        sendSuccess(res, result);
    } catch (error) {
        next(error);
    }
}

export async function completeOnboarding(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = (req as any).userId;
        const userEmail = (req as any).userEmail;
        const { nativeLanguage, targetLanguage, country, level } = req.body;

        if (!userEmail) {
            throw new Error('User email not found in token');
        }

        const result = await authService.completeOnboarding(
            userId,
            userEmail,
            '',
            {
                nativeLanguage,
                targetLanguage,
                country,
                level,
            }
        );
        sendSuccess(res, result);
    } catch (error) {
        next(error);
    }
}
