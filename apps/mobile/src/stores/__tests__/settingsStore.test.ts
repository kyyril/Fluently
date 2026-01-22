import { renderHook, act } from '@testing-library/react-native';
import { useSettingsStore } from '../settingsStore';

// Mock MMKV
jest.mock('../../lib/storage/mmkv', () => ({
    mmkvStorage: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(),
        removeItem: jest.fn(),
    },
}));

describe('useSettingsStore', () => {
    beforeEach(() => {
        // Reset store before each test
        useSettingsStore.setState({
            theme: 'dark',
            hapticsEnabled: true,
            notificationsEnabled: true,
        });
    });

    describe('setTheme', () => {
        it('should update theme correctly', () => {
            const { result } = renderHook(() => useSettingsStore());

            act(() => {
                result.current.setTheme('light');
            });

            expect(result.current.theme).toBe('light');
        });

        it('should handle system theme', () => {
            const { result } = renderHook(() => useSettingsStore());

            act(() => {
                result.current.setTheme('system');
            });

            expect(result.current.theme).toBe('system');
        });
    });

    describe('setHaptics', () => {
        it('should enable haptics', () => {
            const { result } = renderHook(() => useSettingsStore());

            act(() => {
                result.current.setHaptics(false);
            });

            expect(result.current.hapticsEnabled).toBe(false);

            act(() => {
                result.current.setHaptics(true);
            });

            expect(result.current.hapticsEnabled).toBe(true);
        });
    });

    describe('toggleHaptics', () => {
        it('should toggle haptics state', () => {
            const { result } = renderHook(() => useSettingsStore());

            const initialValue = result.current.hapticsEnabled;

            act(() => {
                result.current.toggleHaptics();
            });

            expect(result.current.hapticsEnabled).toBe(!initialValue);
        });
    });

    describe('setNotifications', () => {
        it('should update notifications correctly', () => {
            const { result } = renderHook(() => useSettingsStore());

            act(() => {
                result.current.setNotifications(false);
            });

            expect(result.current.notificationsEnabled).toBe(false);
        });
    });

    describe('toggleNotifications', () => {
        it('should toggle notifications state', () => {
            const { result } = renderHook(() => useSettingsStore());

            const initialValue = result.current.notificationsEnabled;

            act(() => {
                result.current.toggleNotifications();
            });

            expect(result.current.notificationsEnabled).toBe(!initialValue);
        });
    });
});
