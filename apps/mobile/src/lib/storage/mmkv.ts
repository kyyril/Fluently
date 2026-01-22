import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

// Fallback memory storage for Expo Go or environments where native modules aren't available
class MemoryStorage {
    private store = new Map<string, string | number | boolean>();

    getString(key: string) { return this.store.get(key) as string | undefined; }
    getNumber(key: string) { return this.store.get(key) as number | undefined; }
    getBoolean(key: string) { return this.store.get(key) as boolean | undefined; }
    set(key: string, value: string | number | boolean) { this.store.set(key, value); }
    delete(key: string) { this.store.delete(key); }
    contains(key: string) { return this.store.has(key); }
    clearAll() { this.store.clear(); }
}

// Create MMKV instance with safety catch
let storageInstance: any;
try {
    storageInstance = new MMKV({
        id: 'fluently-storage',
        encryptionKey: 'fluently-encryption-key',
    });
} catch (e) {
    console.warn('MMKV native module not found, falling back to in-memory storage');
    storageInstance = new MemoryStorage();
}

export const storage = storageInstance;

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
    getString: (key: string): string | undefined => storage.getString(key),
    setString: (key: string, value: string) => storage.set(key, value),
    getNumber: (key: string): number | undefined => storage.getNumber(key),
    setNumber: (key: string, value: number) => storage.set(key, value),
    getBoolean: (key: string): boolean | undefined => storage.getBoolean(key),
    setBoolean: (key: string, value: boolean) => storage.set(key, value),
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
    delete: (key: string) => storage.delete(key),
    contains: (key: string): boolean => storage.contains(key),
    clearAll: () => storage.clearAll(),
};

