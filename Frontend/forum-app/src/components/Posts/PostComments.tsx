import { Card } from "@/components/ui/card";
import type { Comment } from "@/types";

type Props = {
  comments: Comment[];
};

export function PostComments({ comments }: Props) {
  return (
    <Card className="m-10 p-4 space-y-4">
      <h2 className="text-xl font-semibold">Comments</h2>
      {comments.length === 0 ? (
        <p className="text-muted-foreground">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="border-b pb-2">
            {comment.creator.avatar && (
              <img
                src={comment.creator.avatar}
                className="h-10 w-10 rounded-full object-cover"
                alt="Avatar"
              />
            )}
            <p className="text-sm text-muted-foreground">
              {comment.creator.username} –{" "}
              {new Date(comment.created_at).toLocaleString()}
            </p>
            <p>{comment.content}</p>
          </div>
        ))
      )}
    </Card>
  );
}
