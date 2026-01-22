import { renderHook, act } from '@testing-library/react-native';
import { useAuthStore } from '../authStore';

// Mock MMKV
jest.mock('../../lib/storage/mmkv', () => ({
    mmkvStorage: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(),
        removeItem: jest.fn(),
    },
}));

// Mock SecureStore
jest.mock('../../lib/storage/secureStore', () => ({
    saveToken: jest.fn(),
    deleteToken: jest.fn(),
    getToken: jest.fn(() => null),
}));

describe('useAuthStore', () => {
    beforeEach(() => {
        // Reset store before each test
        useAuthStore.setState({
            user: null,
            isAuthenticated: false,
            isOnboarded: false,
            isLoading: false,
        });
    });

    describe('setAuth', () => {
        it('should set user correctly', async () => {
            const { result } = renderHook(() => useAuthStore());

            const mockUser = {
                id: '1',
                email: 'test@example.com',
                displayName: 'Test User',
                targetLanguage: 'English',
                level: 'Intermediate',
            };
            const mockToken = 'test-token-123';

            await act(async () => {
                await result.current.setAuth(mockUser as any, mockToken);
            });

            expect(result.current.user).toEqual(mockUser);
            expect(result.current.isAuthenticated).toBe(true);
        });
    });

    describe('logout', () => {
        it('should clear all auth state', async () => {
            const { result } = renderHook(() => useAuthStore());

            // First set some auth data
            await act(async () => {
                await result.current.setAuth({ id: '1' } as any, 'token');
            });

            expect(result.current.isAuthenticated).toBe(true);

            // Then logout
            await act(async () => {
                await result.current.logout();
            });

            expect(result.current.user).toBeNull();
            expect(result.current.isAuthenticated).toBe(false);
            expect(result.current.isOnboarded).toBe(false);
        });
    });

    describe('setOnboarded', () => {
        it('should update onboarded status', () => {
            const { result } = renderHook(() => useAuthStore());

            act(() => {
                result.current.setOnboarded(true);
            });

            expect(result.current.isOnboarded).toBe(true);
        });
    });

    describe('updateUser', () => {
        it('should merge user data correctly', async () => {
            const { result } = renderHook(() => useAuthStore());

            const initialUser = {
                id: '1',
                email: 'test@example.com',
                displayName: 'Test User',
            };

            await act(async () => {
                await result.current.setAuth(initialUser as any, 'token');
            });

            act(() => {
                result.current.updateUser({ displayName: 'Updated Name', totalXp: 100 });
            });

            expect(result.current.user?.displayName).toBe('Updated Name');
            expect(result.current.user?.totalXp).toBe(100);
            expect(result.current.user?.email).toBe('test@example.com');
        });
    });
});
