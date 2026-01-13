import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { z, type ZodSchema } from 'zod';
import type { ApiResponse } from '@fluently/types';

// ============================================
// API CLIENT SETUP
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// ============================================
// REQUEST INTERCEPTOR (Auth)
// ============================================

import { authClient } from './auth-client';

api.interceptors.request.use(async (config) => {
    if (typeof window !== 'undefined') {
        const { data } = await authClient.getSession();
        if (data?.session?.token) {
            config.headers.Authorization = `Bearer ${data.session.token}`;
        }
    }
    return config;
});

// ============================================
// RESPONSE INTERCEPTOR (Error handling)
// ============================================

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiResponse<unknown>>) => {
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('fluently-token');
                // Redirection is handled by the application layouts (AdminLayout/DashboardLayout)
                // or specific route guards to prevent multiple hard refreshes/loops.
            }
        }
        return Promise.reject(error);
    }
);

// ============================================
// TYPED FETCH WITH ZOD VALIDATION
// ============================================

/**
 * Fetch data from API with Zod schema validation
 * 
 * @example
 * const user = await fetchWithSchema('/users/me', UserSchema);
 */
export async function fetchWithSchema<T>(
    url: string,
    schema: ZodSchema<T>,
    config?: AxiosRequestConfig
): Promise<T> {
    const response = await api.get<ApiResponse<T>>(url, config);

    if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Request failed');
    }

    // Validate response data with Zod
    return schema.parse(response.data.data);
}

/**
 * POST data to API with Zod schema validation for response
 */
export async function postWithSchema<T, B = unknown>(
    url: string,
    body: B,
    schema: ZodSchema<T>,
    config?: AxiosRequestConfig
): Promise<T> {
    const response = await api.post<ApiResponse<T>>(url, body, config);

    if (!response.data.success || !response.data.data) {
        throw new Error(response.data.error || 'Request failed');
    }

    return schema.parse(response.data.data);
}

// ============================================
// AUTH HELPERS
// ============================================

export function setAuthToken(token: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('fluently-token', token);
    }
}

export function clearAuthToken() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('fluently-token');
    }
}

export function getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('fluently-token');
    }
    return null;
}
