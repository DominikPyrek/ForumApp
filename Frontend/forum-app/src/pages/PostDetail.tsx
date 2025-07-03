import { useParams } from "react-router";
import { usePostDetails } from "@/hooks/usePostDetails";
import { useComments } from "@/hooks/useComments";
import { PostContent } from "@/components/Posts/PostContent";
import { PostComments } from "@/components/Posts/PostComments";

export default function PostDetail() {
  const { pk } = useParams<{ pk: string }>();
  const { post, loading: loadingPost } = usePostDetails(pk);
  const { comments, loading: loadingComments, addComment } = useComments(pk);

  if (loadingPost || loadingComments) return <div>Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="p-10">
      <PostContent post={post} pk={pk!} onCommentSubmit={addComment} />
      <PostComments comments={comments} pk={pk!} />
    </div>
  );
}
