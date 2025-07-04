export type Creator = {
  id: number;
  username: string;
  email?: string;
  avatar: string | null;
  bio?: string;
};

export type Post = {
  id: number;
  creator: Creator;
  title: string;
  preview_text?: string;
  content: string;
  created_at: string;
  liked_by?: Creator[];
  like_count: number;
};

export type Comment = {
  id: number;
  detail?: string;
  creator: Creator;
  content: string;
  post: number;
  post_name: string;
  created_at: string;
  liked_by?: Creator[];
};

export type CommentApiRespoonse = {
  count: number;
  next: null | string;
  previous: null | string;
  results: Comment[];
};

export type PostApiResponse = {
  count: number;
  next: null | string;
  previous: null | string;
  results: Post[];
};

export type RegisterData = {
  username: string;
  password: string;
  email: string;
  bio: string;
  avatar: File;
};

export type LoginData = {
  username: string;
  password: string;
};

export type PostData = {
  title: string;
  preview_text: string;
  content: string;
};
