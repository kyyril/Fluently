import { act } from '@testing-library/react-native';
import { useToastStore, toast } from '../toastStore';

describe('useToastStore', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        useToastStore.setState({ toasts: [] });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('addToast', () => {
        it('should add a toast to the store', () => {
            act(() => {
                useToastStore.getState().addToast({
                    type: 'success',
                    title: 'Test Toast',
                    message: 'This is a test',
                });
            });

            const { toasts } = useToastStore.getState();
            expect(toasts).toHaveLength(1);
            expect(toasts[0].title).toBe('Test Toast');
            expect(toasts[0].type).toBe('success');
        });

        it('should auto-remove toast after duration', () => {
            act(() => {
                useToastStore.getState().addToast({
                    type: 'info',
                    title: 'Auto Remove',
                    duration: 2000,
                });
            });

            expect(useToastStore.getState().toasts).toHaveLength(1);

            act(() => {
                jest.advanceTimersByTime(2000);
            });

            expect(useToastStore.getState().toasts).toHaveLength(0);
        });
    });

    describe('removeToast', () => {
        it('should remove specific toast by id', () => {
            act(() => {
                useToastStore.getState().addToast({ type: 'success', title: 'Toast 1' });
                useToastStore.getState().addToast({ type: 'error', title: 'Toast 2' });
            });

            const toasts = useToastStore.getState().toasts;
            expect(toasts).toHaveLength(2);

            act(() => {
                useToastStore.getState().removeToast(toasts[0].id);
            });

            expect(useToastStore.getState().toasts).toHaveLength(1);
            expect(useToastStore.getState().toasts[0].title).toBe('Toast 2');
        });
    });

    describe('clearToasts', () => {
        it('should remove all toasts', () => {
            act(() => {
                useToastStore.getState().addToast({ type: 'success', title: 'Toast 1' });
                useToastStore.getState().addToast({ type: 'error', title: 'Toast 2' });
                useToastStore.getState().addToast({ type: 'info', title: 'Toast 3' });
            });

            expect(useToastStore.getState().toasts).toHaveLength(3);

            act(() => {
                useToastStore.getState().clearToasts();
            });

            expect(useToastStore.getState().toasts).toHaveLength(0);
        });
    });

    describe('toast helpers', () => {
        it('should create success toast', () => {
            act(() => {
                toast.success('Success!', 'Operation completed');
            });

            const toasts = useToastStore.getState().toasts;
            expect(toasts[0].type).toBe('success');
            expect(toasts[0].title).toBe('Success!');
        });

        it('should create error toast', () => {
            act(() => {
                toast.error('Error!', 'Something went wrong');
            });

            const toasts = useToastStore.getState().toasts;
            expect(toasts[0].type).toBe('error');
        });

        it('should create info toast', () => {
            act(() => {
                toast.info('Info');
            });

            expect(useToastStore.getState().toasts[0].type).toBe('info');
        });

        it('should create warning toast', () => {
            act(() => {
                toast.warning('Warning');
            });

            expect(useToastStore.getState().toasts[0].type).toBe('warning');
        });
    });
});
