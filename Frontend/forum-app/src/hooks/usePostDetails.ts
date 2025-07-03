import { useEffect, useState } from "react";
import { GetPostDetails } from "@/services/api";
import type { Post } from "@/types";

export function usePostDetails(pk?: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pk) return;
    (async () => {
      try {
        const response = await GetPostDetails(pk);
        setPost(response.data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [pk]);

  return { post, loading };
}
