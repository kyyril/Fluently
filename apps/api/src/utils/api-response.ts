import { Response } from 'express';

/**
 * Standardized API response format
 */

export interface ApiResponseData<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    code?: string;
}

export function sendSuccess<T>(res: Response, data: T, statusCode = 200) {
    const response: ApiResponseData<T> = {
        success: true,
        data,
    };
    return res.status(statusCode).json(response);
}

export function sendError(
    res: Response,
    message: string,
    statusCode = 500,
    code?: string
) {
    const response: ApiResponseData = {
        success: false,
        error: message,
        code,
    };
    return res.status(statusCode).json(response);
}

export function sendCreated<T>(res: Response, data: T) {
    return sendSuccess(res, data, 201);
}

export function sendNoContent(res: Response) {
    return res.status(204).send();
}
