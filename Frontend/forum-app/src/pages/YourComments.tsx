import { useEffect, useState } from "react";
import axiosInstance from "@/services/axios";
import { MyComments } from "@/services/api";
import { CommentCard } from "@/components/Comments/CommentCard";
import { PaginationControls } from "@/components/Comments/PaginationControls";
import type { CommentApiRespoonse } from "@/types";

export default function YourComments() {
  const [apiResponse, setApiResponse] = useState<CommentApiRespoonse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  const fetchData = async (url?: string) => {
    setLoading(true);
    try {
      const response = url ? await axiosInstance.get(url) : await MyComments();
      const data = response.data;
      setApiResponse(data);
      setNextPage(data.next);
      setPrevPage(data.previous);
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

  const comments = apiResponse.results;

  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto px-4 mt-10 md:px-6 items-center justify-center">
      <div className="posts-meta m-10">
        <span className="text-2xl">Total Comments: {apiResponse.count}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>

      <PaginationControls
        onNext={() => fetchData(nextPage ?? undefined)}
        onPrev={() => fetchData(prevPage ?? undefined)}
        hasNext={!!nextPage}
        hasPrev={!!prevPage}
      />
    </div>
  );
}
