import { GetPosts } from "@/services/api";
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "@/services/axios";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, ThumbsUp, Newspaper } from "lucide-react";

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

export default function YourPostsList() {
  const [apiResponse, setApiResponse] = useState<PostApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [nextPage, setNextPage] = useState<null | string>(null);
  const [lastPage, setlastPage] = useState<null | string>(null);

  const fetchData = async (url?: string) => {
    setLoading(true);
    try {
      const response = url ? await axiosInstance.get(url) : await GetPosts();
      const data = response.data;
      setApiResponse(data);
      setNextPage(data.next);
      setlastPage(data.previous);
    } catch (err: any) {
      setError({
        message: err.response?.data?.message || "Failed to fetch posts",
        status: err.response?.status,
        details: err.response?.data,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="loading-spinner">Loading posts...</div>;
  if (error) return <div className="error-message">Error: {error.message}</div>;
  if (!apiResponse?.results.length) return <div>No posts found</div>;

  const results = apiResponse.results;
  const fillerCount = results.length < 4 ? 4 - results.length : 0;

  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto px-4 md:px-6 items-center justify-center mt-10">
      <div className="posts-meta m-10">
        <div className="flex items-center gap-2 text-2xl">
          <Newspaper className="h-6 w-6 text-muted-foreground" />
          <span>Total Posts: {apiResponse.count}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full min-h-[55vh]">
        {results.map((post) => (
          <article
            key={post.id}
            className="h-full group rounded-lg border border-border bg-card p-5 transition-all hover:bg-accent hover:shadow-md"
            onClick={() => (window.location.href = "posts/" + post.id)}
          >
            <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary line-clamp-1 whitespace-pre-wrap break-words">
              {post.title}
            </h3>
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground group-hover:text-accent-foreground whitespace-pre-wrap break-words">
              <b>Preview:</b> {post.content}
            </p>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>Likes: {post.like_count}</span>
              </div>
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString()}{" "}
                {new Date(post.created_at).toLocaleTimeString()}
              </time>
            </div>
          </article>
        ))}

        {/* Filler blocks to keep layout consistent */}
        {Array.from({ length: fillerCount }).map((_, i) => (
          <div key={`filler-${i}`} className="invisible" />
        ))}
      </div>
      <div className="flex flex-row gap-10 mt-5">
        <Button
          onClick={() => fetchData(lastPage ?? undefined)}
          disabled={!lastPage}
          className="min-w-[120px] flex items-center justify-center gap-2"
        >
          <ArrowLeft />
          Last page
        </Button>
        <Button
          onClick={() => fetchData(nextPage ?? undefined)}
          disabled={!nextPage}
          className="min-w-[120px] flex items-center justify-center gap-2"
        >
          Next page
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
