export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  replies: Reply[];
}

export interface Reply {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}