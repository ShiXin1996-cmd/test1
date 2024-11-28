import { Post } from '../types/forum';

const FORUM_STORAGE_KEY = 'forum_posts';

export const loadPosts = (): Post[] => {
  try {
    const data = localStorage.getItem(FORUM_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
};

export const savePosts = (posts: Post[]): void => {
  try {
    localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving posts:', error);
  }
};