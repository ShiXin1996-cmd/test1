import React, { useState, useEffect } from 'react';
import { Post } from '../../types/forum';
import { PostList } from './PostList';
import { PostModal } from './PostModal';
import { PostDetail } from './PostDetail';
import { loadPosts, savePosts } from '../../utils/forum-storage';

export const Forum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  const handleCreatePost = (title: string, content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      author: '匿名用户',
      createdAt: new Date().toISOString(),
      replies: [],
    };
    setPosts([newPost, ...posts]);
  };

  const handleAddReply = (postId: string, content: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [...post.replies, {
            id: Date.now().toString(),
            content,
            author: '匿名用户',
            createdAt: new Date().toISOString(),
          }],
        };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">讨论区</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          发布新帖
        </button>
      </div>

      {selectedPost ? (
        <PostDetail
          post={selectedPost}
          onAddReply={handleAddReply}
          onClose={() => setSelectedPost(null)}
        />
      ) : (
        <PostList
          posts={posts}
          onPostClick={setSelectedPost}
        />
      )}

      <PostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
};