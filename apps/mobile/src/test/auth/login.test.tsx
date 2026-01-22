import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from './login';
import { useRouter } from 'expo-router';
import api from '@/lib/api/client';
import { useAuthStore } from '@/stores/authStore';

// Mock expo-router
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

// Mock api client
jest.mock('@/lib/api/client', () => ({
    post: jest.fn(),
}));

// Mock stores
jest.mock('@/stores/authStore', () => ({
    useAuthStore: jest.fn(),
}));

jest.mock('@/stores/settingsStore', () => ({
    useSettingsStore: () => ({
        hapticsEnabled: true,
    }),
}));

describe('LoginScreen Integration', () => {
    const mockRouter = {
        replace: jest.fn(),
        push: jest.fn(),
    };
    const mockSetAuth = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useAuthStore as unknown as jest.Mock).mockImplementation((selector) => {
            if (typeof selector === 'function') {
                return selector({ setAuth: mockSetAuth });
            }
            return { setAuth: mockSetAuth };
        });
    });

    it('renders login screen correctly', () => {
        const { getByText, getByPlaceholderText } = render(<LoginScreen />);

        expect(getByText('Welcome Back')).toBeTruthy();
        expect(getByPlaceholderText('you@example.com')).toBeTruthy();
        expect(getByPlaceholderText('••••••••')).toBeTruthy();
    });

    it('shows error when fields are empty', async () => {
        const { getByText } = render(<LoginScreen />);

        const signInButton = getByText('Sign In');
        fireEvent.press(signInButton);

        await waitFor(() => {
            expect(getByText('Please fill in all fields')).toBeTruthy();
        });
    });

    it('successful login redirects to dashboard if user is onboarded', async () => {
        const mockUser = { id: '1', level: 'intermediate', displayName: 'John' };
        (api.post as jest.Mock).mockResolvedValueOnce({
            data: {
                data: {
                    user: mockUser,
                    token: 'fake-token',
                },
            },
        });

        const { getByText, getByPlaceholderText } = render(<LoginScreen />);

        fireEvent.changeText(getByPlaceholderText('you@example.com'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('••••••••'), 'password123');

        fireEvent.press(getByText('Sign In'));

        await waitFor(() => {
            expect(mockSetAuth).toHaveBeenCalledWith(mockUser, 'fake-token');
            expect(mockRouter.replace).toHaveBeenCalledWith('/(main)');
        });
    });

    it('successful login redirects to onboarding if user is NOT onboarded', async () => {
        const mockUser = { id: '2', level: null, displayName: 'New User' };
        (api.post as jest.Mock).mockResolvedValueOnce({
            data: {
                data: {
                    user: mockUser,
                    token: 'fake-token',
                },
            },
        });

        const { getByText, getByPlaceholderText } = render(<LoginScreen />);

        fireEvent.changeText(getByPlaceholderText('you@example.com'), 'new@example.com');
        fireEvent.changeText(getByPlaceholderText('••••••••'), 'password123');

        fireEvent.press(getByText('Sign In'));

        await waitFor(() => {
            expect(mockSetAuth).toHaveBeenCalledWith(mockUser, 'fake-token');
            expect(mockRouter.replace).toHaveBeenCalledWith('/(auth)/onboarding');
        });
    });

    it('shows error on failed login', async () => {
        (api.post as jest.Mock).mockRejectedValueOnce({
            response: {
                data: {
                    error: 'Invalid credentials',
                },
            },
        });

        const { getByText, getByPlaceholderText } = render(<LoginScreen />);

        fireEvent.changeText(getByPlaceholderText('you@example.com'), 'wrong@example.com');
        fireEvent.changeText(getByPlaceholderText('••••••••'), 'wrongpass');

        fireEvent.press(getByText('Sign In'));

        await waitFor(() => {
            expect(getByText('Invalid credentials')).toBeTruthy();
        });
    });
});
