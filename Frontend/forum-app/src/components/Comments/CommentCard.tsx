import type { Comment } from "@/types";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

export function CommentCard({ comment }: { comment: Comment }) {
  const navigate = useNavigate();
  return (
    <article
      key={comment.id}
      onClick={() => navigate("/posts/" + comment.post)}
      className=" group rounded-lg border border-border bg-card p-5 transition-all hover:bg-accent hover:shadow-md"
    >
      <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary line-clamp-2 whitespace-pre-wrap break-words">
        {comment.post_name}
      </h3>
      <p className="mb-2 line-clamp-2 text-sm group-hover:text-accent-foreground whitespace-pre-wrap break-words">
        Your Comment: {comment.content}
      </p>
      <div className="text-xs text-muted-foreground mb-2">
        <time dateTime={comment.created_at}>
          {new Date(comment.created_at).toLocaleDateString()}{" "}
          {new Date(comment.created_at).toLocaleTimeString()}
        </time>
      </div>
      <div className="flex justify-center mb-0">
        <Button onClick={() => {}}>Delete</Button>
      </div>
    </article>
  );
}
