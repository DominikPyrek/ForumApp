import { useEffect, useState } from "react";
import axiosInstance from "@/services/axios";
import { MyComments } from "@/services/api";
import { CommentCard } from "@/components/Comments/CommentCard";
import { PaginationControls } from "@/components/Comments/PaginationControls";
import type { CommentApiResponse, Comment } from "@/types";

export default function YourComments() {
  const [apiResponse, setApiResponse] = useState<CommentApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchData = async (url?: string) => {
    setLoading(true);
    try {
      const response = url ? await axiosInstance.get(url) : await MyComments();
      const data = response.data;
      setApiResponse(data);
      setComments(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (err: any) {
      setError({
        message: err.response?.data?.message || "Failed to fetch comments",
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

  const handleCommentDeleted = (deletedCommentId: number) => {
    const newComments = comments.filter((c) => c.id !== deletedCommentId);
    setComments(newComments);

    if (apiResponse) {
      setApiResponse({
        ...apiResponse,
        count: apiResponse.count - 1,
      });
    }

    if (newComments.length === 0 && prevPage) {
      fetchData(prevPage);
    } else if (newComments.length === 0) {
      fetchData();
    }
  };

  if (loading)
    return <div className="loading-spinner">Loading comments...</div>;
  if (error) return <div className="error-message">Error: {error.message}</div>;
  if (!comments.length) return <div>No comments here</div>;

  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto px-4 mt-10 md:px-6 items-center justify-center">
      <div className="posts-meta m-10">
        <span className="text-2xl">
          Total Comments: {apiResponse?.count || 0}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onCommentDeleted={handleCommentDeleted}
          />
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
