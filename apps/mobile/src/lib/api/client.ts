import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '../constants';
import { getToken, deleteToken } from '../storage/secureStore';

export const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await getToken();
        if (token) {
            if (__DEV__) {
                console.log(`[API Request] Token: ${token.substring(0, 10)}... (Length: ${token.length})`);
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Handle Unauthorized - Clear token and possibly redirect to login
            await deleteToken();
            // In a real app, you'd trigger a logout action in your store or redirect via navigation
        }

        // Log error in development
        if (typeof __DEV__ !== 'undefined' && __DEV__) {
            console.error('[API Error]:', error.response?.data || error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
