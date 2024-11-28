import React from 'react';
import { Post } from '../../types/forum';
import { formatDate } from '../../utils/formatters';

interface PostListProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, onPostClick }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onPostClick(post)}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
          <p className="text-gray-600 line-clamp-2 mb-4">{post.content}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>作者: {post.author}</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {post.replies.length} 条回复
          </div>
        </div>
      ))}
    </div>
  );
};