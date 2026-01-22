import { create } from 'zustand';

interface Toast {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message?: string;
    duration?: number;
}

interface ToastState {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
    toasts: [],

    addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { ...toast, id };

        set((state) => ({
            toasts: [...state.toasts, newToast],
        }));

        // Auto-remove after duration
        const duration = toast.duration || 3000;
        setTimeout(() => {
            get().removeToast(id);
        }, duration);
    },

    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        }));
    },

    clearToasts: () => {
        set({ toasts: [] });
    },
}));

// Helper functions
export const toast = {
    success: (title: string, message?: string) => {
        useToastStore.getState().addToast({ type: 'success', title, message });
    },
    error: (title: string, message?: string) => {
        useToastStore.getState().addToast({ type: 'error', title, message });
    },
    info: (title: string, message?: string) => {
        useToastStore.getState().addToast({ type: 'info', title, message });
    },
    warning: (title: string, message?: string) => {
        useToastStore.getState().addToast({ type: 'warning', title, message });
    },
};
