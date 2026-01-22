import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

// Create MMKV instance
export const storage = new MMKV({
    id: 'fluently-storage',
    encryptionKey: 'fluently-encryption-key', // In production, use a more secure key
});

// Zustand-compatible storage adapter
export const mmkvStorage: StateStorage = {
    getItem: (name: string) => {
        const value = storage.getString(name);
        return value ?? null;
    },
    setItem: (name: string, value: string) => {
        storage.set(name, value);
    },
    removeItem: (name: string) => {
        storage.delete(name);
    },
};

// Typed helpers
export const mmkvHelpers = {
    // String operations
    getString: (key: string): string | undefined => storage.getString(key),
    setString: (key: string, value: string) => storage.set(key, value),

    // Number operations
    getNumber: (key: string): number | undefined => storage.getNumber(key),
    setNumber: (key: string, value: number) => storage.set(key, value),

    // Boolean operations
    getBoolean: (key: string): boolean | undefined => storage.getBoolean(key),
    setBoolean: (key: string, value: boolean) => storage.set(key, value),

    // Object operations (JSON)
    getObject: <T>(key: string): T | undefined => {
        const value = storage.getString(key);
        if (!value) return undefined;
        try {
            return JSON.parse(value) as T;
        } catch {
            return undefined;
        }
    },
    setObject: <T>(key: string, value: T) => {
        storage.set(key, JSON.stringify(value));
    },

    // Delete
    delete: (key: string) => storage.delete(key),

    // Check existence
    contains: (key: string): boolean => storage.contains(key),

    // Clear all
    clearAll: () => storage.clearAll(),
};
