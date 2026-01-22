import React from 'react';
import { render, fireEvent, waitFor } from '@/test/test-utils';
import ArticlesScreen from './articles';
import { useRouter } from 'expo-router';
import api from '@/lib/api/client';

// Mock expo-router
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

// Mock api
jest.mock('@/lib/api/client', () => ({
    get: jest.fn(),
}));

describe('ArticlesScreen Integration', () => {
    const mockRouter = {
        push: jest.fn(),
    };

    const mockArticles = [
        {
            id: '1',
            title: 'Learning Spanish Basics',
            summary: 'A guide for beginners',
            level: 'Beginner',
            readTime: 5,
            imageUrl: null,
        },
        {
            id: '2',
            title: 'Complex Conjugation',
            summary: 'Tricky verbs',
            level: 'Advanced',
            readTime: 12,
            imageUrl: null,
        },

    ];


    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (api.get as jest.Mock).mockResolvedValue({
            data: {
                success: true,
                data: mockArticles,
            },
        });
    });

    it('renders articles list correctly', async () => {
        const { getByText, queryByText } = render(<ArticlesScreen />);

        await waitFor(() => {
            expect(getByText('Learning Spanish Basics')).toBeTruthy();
            expect(getByText('Complex Conjugation')).toBeTruthy();
        });

    });

    it('filters articles by level', async () => {
        const { getByText, queryByText, getByTestId } = render(<ArticlesScreen />);

        await waitFor(() => {
            expect(getByText('Learning Spanish Basics')).toBeTruthy();
        });

        // Press "Advanced" filter
        fireEvent.press(getByTestId('filter-Advanced'));


        await waitFor(() => {
            expect(queryByText('Learning Spanish Basics')).toBeNull();
            expect(getByText('Complex Conjugation')).toBeTruthy();
        });

    });

    it('navigates to article detail on press', async () => {
        const { getByText } = render(<ArticlesScreen />);

        await waitFor(() => {
            const article = getByText('Learning Spanish Basics');
            fireEvent.press(article);
        });

        expect(mockRouter.push).toHaveBeenCalledWith('/article/1');
    });
});
