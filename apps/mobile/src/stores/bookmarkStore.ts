import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '../lib/storage/mmkv';

export interface BookmarkedArticle {
    id: string;
    slug: string;
    title: string;
    summary: string;
    readTime: number;
    category: string;
    coverImage?: string;
    bookmarkedAt: number;
}

interface BookmarkState {
    bookmarks: BookmarkedArticle[];

    // Actions
    addBookmark: (article: BookmarkedArticle) => void;
    removeBookmark: (id: string) => void;
    isBookmarked: (id: string) => boolean;
    toggleBookmark: (article: BookmarkedArticle) => void;
    clearBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
    persist(
        (set, get) => ({
            bookmarks: [],

            addBookmark: (article) => set((state) => ({
                bookmarks: [article, ...state.bookmarks]
            })),

            removeBookmark: (id) => set((state) => ({
                bookmarks: state.bookmarks.filter((b) => b.id !== id)
            })),

            isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),

            toggleBookmark: (article) => {
                const isAlreadyBookmarked = get().isBookmarked(article.id);
                if (isAlreadyBookmarked) {
                    get().removeBookmark(article.id);
                } else {
                    get().addBookmark({
                        ...article,
                        bookmarkedAt: Date.now()
                    });
                }
            },

            clearBookmarks: () => set({ bookmarks: [] }),
        }),
        {
            name: 'bookmark-storage',
            storage: createJSONStorage(() => mmkvStorage),
        }
    )
);
