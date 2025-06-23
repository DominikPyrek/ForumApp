import { GetPosts } from "@/services/api";
import { useEffect } from "react";
import { useState } from "react";

type PostApiResponse = {
  count: number;
  next: null | number;
  previous: null | number;
  results: Post[];
};

type Post = {
  id: number;
  creator: Creator;
  title: string;
  preview_text: string;
  content: string;
  created_at: string;
  liked_by: [];
  like_count: number;
};

type Creator = {
  id: number;
  username: string;
  email: string;
  avatar: null;
  bio: string;
};

export default function PostsList() {
  const [apiResponse, setApiResponse] = useState<PostApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await GetPosts();
        setApiResponse(data);
      } catch (err: any) {
        setError({
          message: err.response?.data?.message || "Failed to fetch posts",
          status: err.response?.status,
          details: err.response?.data,
        });

        // Auto-redirect if unauthorized
        if (err.response?.status === 401) {
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="loading-spinner">Loading posts...</div>;
  if (error) return <div className="error-message">Error: {error.message}</div>;
  if (!apiResponse?.results.length) return <div>No posts found</div>;

  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12 mt-10 items-center justify-center ">
      <div className="posts-meta">
        <span>Total Posts: {apiResponse.count}</span>
      </div>

      {apiResponse.results.map((post) => (
        <article
          key={post.id}
          className="group rounded-lg border border-border bg-card p-5 m-4 transition-all hover:bg-accent hover:shadow-md max-w-1/2 min-w-1/2"
        >
          <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mb-4 line-clamp-5 text-sm text-muted-foreground group-hover:text-accent-foreground whitespace-pre-wrap break-words">
            Preview: {post.content}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              Posted by {post.creator.username}
            </span>
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString()}
            </time>
          </div>
        </article>
      ))}
    </div>
  );
}
