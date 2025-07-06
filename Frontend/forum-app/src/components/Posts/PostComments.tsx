import { Card } from "@/components/ui/card";
import type { Comment } from "@/types";
import { PostCommentForm } from "./PostCommentForm";
import { useState } from "react";
import { Button } from "../ui/button";
import axiosInstance from "@/services/axios";
import type { CommentApiResponse } from "@/types";

type Props = {
  comments: Comment[];
  pk: string;
  moreComments: string | null;
};

export function PostComments({ comments, pk, moreComments }: Props) {
  const [commentsU, setComments] = useState(comments);
  const handleNewComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const [nextComments, setNextComments] = useState<string | null>(moreComments);

  async function onClick() {
    if (nextComments != null) {
      try {
        const response = await axiosInstance.get<CommentApiResponse>(
          nextComments
        );
        setNextComments(response.data.next);
        setComments((prevComments) => [
          ...prevComments,
          ...response.data.results,
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex justify-center px-4 w-full ">
      <Card className="m-10 p-4 w-2/3">
        <PostCommentForm pk={pk} onCommentSubmit={handleNewComment} />
        <h2 className="text-xl font-semibold">Comments</h2>
        {commentsU.length === 0 ? (
          <p className="text-muted-foreground">No comments yet.</p>
        ) : (
          commentsU.map((comment) => (
            <Card className="p-4" key={comment.id}>
              <div className="flex gap-4 pb-2">
                {comment.creator.avatar && (
                  <img
                    src={comment.creator.avatar}
                    className="h-18 w-18 rounded-full object-cover flex-shrink-0"
                    alt="Avatar"
                  />
                )}
                <div className="flex flex-col min-w-0">
                  <p className="text-md whitespace-pre-wrap leading-relaxed">
                    {comment.creator.username} –{" "}
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                  <p className="text-md whitespace-pre-wrap leading-relaxed overflow-wrap-break-word break-words">
                    {comment.content}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
        {nextComments ? (
          <Button variant={"outline"} onClick={onClick}>
            See more comments
          </Button>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
}
