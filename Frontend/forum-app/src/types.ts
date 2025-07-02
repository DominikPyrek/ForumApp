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
  detail?: string;
  creator: Creator;
  content: string;
  post: number;
  created_at: string;
  liked_by?: Creator[];
};
