import { Card } from "@/components/ui/card";
import type { Post } from "@/types";
import { Button } from "../ui/button";
type Props = {
  post: Post;
  pk: string;
  onCommentSubmit: (data: { content: string; post: string }) => Promise<void>;
};
import { useLike } from "@/hooks/useLike";
import { ThumbsUp } from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

export function PostContent({ post, pk }: Props) {
  const { user } = useContext(UserContext);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const { likes, onClick } = useLike(post.like_count);
  const [howToLike, setHowToLike] = useState<string>("");

  async function notLoggedInOnClick() {
    setHowToLike("To like the post you must be logged in");
    await sleep(10000);
    setHowToLike("");
  }

  return (
    <div className="flex justify-center px-4 w-full">
      <Card className="p-6 w-2/3">
        <h1 className="text-4xl font-extrabold leading-tight break-words">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span>
            By: <strong>{post.creator.username}</strong>
          </span>
          <time dateTime={post.created_at} className="italic">
            {new Date(post.created_at).toLocaleDateString()}
          </time>
        </div>

        <p className="text-md whitespace-pre-wrap leading-relaxed break-words">
          {post.content}
        </p>
        <div className="flex gap-3 items-center">
          <Button
            onClick={() => (user ? onClick(pk) : notLoggedInOnClick())}
            variant="outline"
            className="w-28 text-lg whitespace-nowrap"
          >
            <ThumbsUp />
            Likes: <strong>{likes}</strong>
          </Button>
          {howToLike}
        </div>
      </Card>
    </div>
  );
}
