import React, { useState } from 'react';
import { Post, Reply } from '../../types/forum';
import { formatDate } from '../../utils/formatters';

interface PostDetailProps {
  post: Post;
  onAddReply: (postId: string, content: string) => void;
  onClose: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onAddReply, onClose }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReply(post.id, replyContent);
    setReplyContent('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{post.title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          关闭
        </button>
      </div>
      
      <div className="mb-8">
        <p className="text-gray-700 mb-4">{post.content}</p>
        <div className="text-sm text-gray-500">
          <span>作者: {post.author}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">回复 ({post.replies.length})</h3>
        <div className="space-y-4">
          {post.replies.map((reply: Reply) => (
            <div key={reply.id} className="border-b border-gray-200 pb-4">
              <p className="text-gray-700 mb-2">{reply.content}</p>
              <div className="text-sm text-gray-500">
                <span>{reply.author}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(reply.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="写下你的回复..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            发表回复
          </button>
        </div>
      </form>
    </div>
  );
};