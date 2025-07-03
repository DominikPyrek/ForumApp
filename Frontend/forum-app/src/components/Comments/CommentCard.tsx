import type { Post } from "@/types";

export function CommentCard({ post }: { post: Post }) {
  return (
    <article
      key={post.id}
      className="h-full group rounded-lg border border-border bg-card p-5 transition-all hover:bg-accent hover:shadow-md"
    >
      <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary line-clamp-5 whitespace-pre-wrap break-words">
        {post.title}
      </h3>
      <p className="mb-4 line-clamp-3 text-sm text-muted-foreground group-hover:text-accent-foreground whitespace-pre-wrap break-words">
        Preview: {post.content}
      </p>
      <div className="text-xs text-muted-foreground">
        <time dateTime={post.created_at}>
          {new Date(post.created_at).toLocaleDateString()}{" "}
          {new Date(post.created_at).toLocaleTimeString()}
        </time>
      </div>
    </article>
  );
}
