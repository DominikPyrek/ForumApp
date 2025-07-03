import { Button } from "@/components/ui/button";
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
    <Card className="space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>By {post.creator.username}</span>
        <time dateTime={post.created_at}>
          {new Date(post.created_at).toLocaleDateString()}
        </time>
        <span>Likes: {post.like_count}</span>
      </div>
      <p className="text-lg whitespace-pre-wrap">{post.content}</p>

      <PostCommentForm pk={pk} onCommentSubmit={onCommentSubmit} />

      <Button variant="outline" className="max-w-20 m-10">
        Like
      </Button>
    </Card>
  );
}
