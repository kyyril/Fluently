import * as SecureStore from 'expo-secure-store';

const AUTH_TOKEN_KEY = 'fluently_auth_token';
const REFRESH_TOKEN_KEY = 'fluently_refresh_token';

/**
 * Securely save auth token
 */
export async function saveToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
}

/**
 * Get auth token from secure storage
 */
export async function getToken(): Promise<string | null> {
    try {
        return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    } catch {
        return null;
    }
}

/**
 * Delete auth token from secure storage
 */
export async function deleteToken(): Promise<void> {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
}

/**
 * Save refresh token
 */
export async function saveRefreshToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
}

/**
 * Get refresh token
 */
export async function getRefreshToken(): Promise<string | null> {
    try {
        return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    } catch {
        return null;
    }
}

/**
 * Delete refresh token
 */
export async function deleteRefreshToken(): Promise<void> {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

/**
 * Clear all auth tokens
 */
export async function clearAllTokens(): Promise<void> {
    await Promise.all([deleteToken(), deleteRefreshToken()]);
}
