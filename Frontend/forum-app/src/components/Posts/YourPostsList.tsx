import { Button } from "@/components/ui/button";
import { Pencil, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import type { Post } from "@/types";

type YourPostListProps = {
  post: Post;
};

export function YourPostList({ post }: YourPostListProps) {
  const navigate = useNavigate();

  return (
    <article className="group rounded-lg min-h-[250px] border border-border bg-card p-5 transition-all hover:bg-accent hover:shadow-md flex flex-col">
      <div className="flex-grow">
        <h3 className="mb-2 text-lg font-semibold line-clamp-3 break-words">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 break-words">
          {post.preview_text}
        </p>
      </div>

      <div>
        <div className="text-xs text-muted-foreground mb-3">
          {new Date(post.created_at).toLocaleString()}
        </div>
        <div className="flex gap-3 justify-center">
          <Button size="sm" onClick={() => navigate("/posts/" + post.id)}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate("/posts_edit/" + post.id)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>
    </article>
  );
}
