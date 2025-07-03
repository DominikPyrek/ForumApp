import { Card } from "@/components/ui/card";
import { PostCommentForm } from "./PostCommentForm";
import type { Post } from "@/types";

type Props = {
  post: Post;
  pk: string;
  onCommentSubmit: (data: { content: string; post: string }) => Promise<void>;
};

export function PostContent({ post, pk, onCommentSubmit }: Props) {
  return (
    <div className="flex justify-center px-4 w-full">
      <Card className="p-6 w-2/3">
        <h1 className="text-4xl font-extrabold leading-tight">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span>
            By <strong>{post.creator.username}</strong>
          </span>
          <time dateTime={post.created_at} className="italic">
            {new Date(post.created_at).toLocaleDateString()}
          </time>
          <span>
            Likes: <strong>{post.like_count}</strong>
          </span>
        </div>

        <p className="text-md whitespace-pre-wrap leading-relaxed break-words">
          {post.content}
        </p>
        <PostCommentForm pk={pk} onCommentSubmit={onCommentSubmit} />
      </Card>
    </div>
  );
}
