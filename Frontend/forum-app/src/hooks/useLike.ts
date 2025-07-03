import { useState } from "react";
import { LikePost } from "@/services/api";

export function useLike(initialCount: number) {
  const [likes, setLikes] = useState(initialCount);

  const onClick = async (pk: string | undefined) => {
    if (!pk) return;
    try {
      const response = await LikePost(pk);
      setLikes(response.data.like_count);
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };

  return { likes, onClick };
}
