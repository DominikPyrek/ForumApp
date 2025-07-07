import { Card } from "@/components/ui/card";
import type { Comment } from "@/types";
import { PostCommentForm } from "./PostCommentForm";
import { useState, useContext } from "react";
import { Button } from "../ui/button";
import axiosInstance from "@/services/axios";
import type { CommentApiResponse } from "@/types";
import { UserContext } from "@/components/UserContext";
import { Edit, Save, X, Loader2 } from "lucide-react";

type Props = {
  comments: Comment[];
  pk: string;
  moreComments: string | null;
};

export function PostComments({ comments, pk, moreComments }: Props) {
  const [commentsU, setComments] = useState(comments);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [nextComments, setNextComments] = useState<string | null>(moreComments);
  const { user } = useContext(UserContext);

  const handleNewComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const handleEditStart = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  const handleEditSave = async (commentId: number) => {
    setIsEditing(true);
    try {
      await axiosInstance.patch(`comments/${commentId}/`, {
        content: editContent,
      });
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, content: editContent } : c
        )
      );
      setEditingCommentId(null);
    } catch (error) {
      console.error("Failed to update comment", error);
    } finally {
      setIsEditing(false);
    }
  };

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
              <div className="flex gap-4 pb-2 w-full">
                {comment.creator.avatar && (
                  <img
                    src={comment.creator.avatar}
                    className="h-18 w-18 rounded-full object-cover flex-shrink-0"
                    alt="Avatar"
                  />
                )}
                <div className="flex flex-col w-[90%]">
                  <p className="text-md whitespace-pre-wrap leading-relaxed">
                    {comment.creator.username} –{" "}
                    {new Date(comment.created_at).toLocaleString()}
                  </p>

                  {editingCommentId === comment.id ? (
                    <div className="mt-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2 border rounded text-md whitespace-pre-wrap leading-relaxed overflow-wrap-break-word break-words"
                      />
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant={"outline"}
                          onClick={() => handleEditSave(comment.id)}
                          disabled={isEditing}
                        >
                          {isEditing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                          Save
                        </Button>
                        <Button variant={"outline"} onClick={handleEditCancel}>
                          <X className="h-4 w-4" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-md whitespace-pre-wrap leading-relaxed overflow-wrap-break-word break-words">
                        {comment.content}
                      </p>
                      {user?.username === comment.creator.username && (
                        <Button
                          variant={"outline"}
                          onClick={() => handleEditStart(comment)}
                          className="mt-2 self-start"
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
        {nextComments ? (
          <Button variant={"outline"} onClick={onClick}>
            See more comments
          </Button>
        ) : null}
      </Card>
    </div>
  );
}
