import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface UIState {
    // Sidebar
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;

    // Modal
    modalOpen: string | null;
    openModal: (id: string) => void;
    closeModal: () => void;

    // Theme
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            // Sidebar
            sidebarOpen: true,
            toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
            setSidebarOpen: (open) => set({ sidebarOpen: open }),

            // Modal
            modalOpen: null,
            openModal: (id) => set({ modalOpen: id }),
            closeModal: () => set({ modalOpen: null }),

            // Theme
            theme: 'system',
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'fluently-ui',
            partialize: (state) => ({ theme: state.theme }),
        }
    )
);
