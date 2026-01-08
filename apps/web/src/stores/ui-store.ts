import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface UIState {
    // Modal
    modalOpen: string | null;
    openModal: (id: string) => void;
    closeModal: () => void;

    // Theme
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            // Modal
            modalOpen: null,
            openModal: (id) => set({ modalOpen: id }),
            closeModal: () => set({ modalOpen: null }),

            // Theme
            theme: 'system',
            setTheme: (theme) => set({ theme }),
            toggleTheme: () => set((s) => ({
                theme: s.theme === 'dark' ? 'light' : 'dark'
            })),
        }),
        {
            name: 'fluently-ui',
            partialize: (state) => ({ theme: state.theme }),
        }
    )
);
