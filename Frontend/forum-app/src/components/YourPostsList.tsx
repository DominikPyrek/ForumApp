import { MyPosts } from "@/services/api";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axiosInstance from "@/services/axios";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PostApiResponse = {
  count: number;
  next: null | string;
  previous: null | string;
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
      const response = url ? await axiosInstance.get(url) : await MyPosts();
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

  if (loading)
    return (
      <div className="flex flex-col w-full max-w-[1200px] mx-auto px-4 md:px-6 items-center justify-center min-h-[62vh] text-center">
        Loading posts...
      </div>
    );
  if (error) return <div className="error-message">Error: {error.message}</div>;
  if (!apiResponse?.results.length) return <div>No posts found</div>;

  const results = apiResponse.results;
  const fillerCount = results.length < 4 ? 4 - results.length : 0;

  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto px-4 md:px-6 items-center justify-center ">
      <div className="posts-meta m-10">
        <span className="text-2xl">Total Posts: {apiResponse.count}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full min-h-[45vh]">
        {results.map((post) => (
          <article
            key={post.id}
            className="h-full group rounded-lg border border-border bg-card p-5 transition-all hover:bg-accent hover:shadow-md"
          >
            <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary line-clamp-5 whitespace-pre-wrap break-words">
              {post.title}
            </h3>
            <p className="mb-4 line-clamp-3 text-sm text-muted-foreground group-hover:text-accent-foreground whitespace-pre-wrap break-words">
              Preview: {post.content}
            </p>
            <div className="text-xs text-muted-foreground">
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
        >
          <ArrowLeft />
          Last page
        </Button>
        <Button
          onClick={() => fetchData(nextPage ?? undefined)}
          disabled={!nextPage}
        >
          Next page
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
