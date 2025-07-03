import { useEffect, useState } from "react";
import { GetComments, CreateComment } from "@/services/api";
import type { Comment } from "@/types";

export function useComments(pk?: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchComments() {
    if (!pk) return;
    try {
      const response = await GetComments(pk);
      setComments(response.data.results);
    } catch (err) {
      console.error("Error fetching comments", err);
    } finally {
      setLoading(false);
    }
  }

  async function addComment(data: { content: string; post: string }) {
    try {
      await CreateComment(data);
      await fetchComments();
    } catch (err) {
      console.error("Error adding comment", err);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [pk]);

  return { comments, loading, addComment };
}
