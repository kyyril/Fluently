import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../lib/storage/mmkv';
import { saveToken, deleteToken } from '../lib/storage/secureStore';

interface User {
    id: string;
    email: string;
    displayName: string;
    avatarUrl?: string | null;
    nativeLanguage: string;
    targetLanguage: string;
    level: string | null;
    role: string;
    totalXp: number;
    currentStreak: number;
    longestStreak: number;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isOnboarded: boolean;
    isLoading: boolean;

    // Actions
    setAuth: (user: User, token: string) => Promise<void>;
    updateUser: (user: Partial<User>) => void;
    setOnboarded: (value: boolean) => void;
    logout: () => Promise<void>;
    setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isOnboarded: false,
            isLoading: false,

            setAuth: async (user, token) => {
                await saveToken(token);
                set({
                    user,
                    isAuthenticated: true,
                    isOnboarded: !!user.level
                });
            },

            updateUser: (updatedUser) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...updatedUser } : null,
                    isOnboarded: updatedUser.level ? true : state.isOnboarded
                }));
            },

            setOnboarded: (isOnboarded) => set({ isOnboarded }),

            logout: async () => {
                await deleteToken();
                set({
                    user: null,
                    isAuthenticated: false,
                    isOnboarded: false
                });
            },

            setLoading: (isLoading) => set({ isLoading }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => mmkvStorage),
            // Only persist non-sensitive fields
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                isOnboarded: state.isOnboarded
            }),
        }
    )
);
