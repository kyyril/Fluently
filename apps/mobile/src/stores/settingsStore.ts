import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../lib/storage/mmkv';

export type Theme = 'light' | 'dark' | 'system';

interface SettingsState {
    theme: Theme;
    hapticsEnabled: boolean;
    notificationsEnabled: boolean;
    geminiApiKey?: string;

    // Actions
    setTheme: (theme: Theme) => void;
    setHaptics: (enabled: boolean) => void;
    setNotifications: (enabled: boolean) => void;
    toggleHaptics: () => void;
    toggleNotifications: () => void;
    setGeminiApiKey: (key: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            theme: 'dark',
            hapticsEnabled: true,
            notificationsEnabled: true,

            setTheme: (theme) => set({ theme }),

            setHaptics: (enabled) => set({ hapticsEnabled: enabled }),

            setNotifications: (enabled) => set({ notificationsEnabled: enabled }),

            toggleHaptics: () => set((state) => ({
                hapticsEnabled: !state.hapticsEnabled
            })),

            toggleNotifications: () => set((state) => ({
                notificationsEnabled: !state.notificationsEnabled
            })),

            setGeminiApiKey: (key) => set({ geminiApiKey: key }),
        }),
        {
            name: 'settings-storage',
            storage: createJSONStorage(() => mmkvStorage),
        }
    )
);
