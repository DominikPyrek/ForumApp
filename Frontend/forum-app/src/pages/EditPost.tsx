import { useParams } from "react-router";
import { usePostDetails } from "@/hooks/usePostDetails";
import { EditPost2 } from "@/components/Posts/EditPost";

export default function EditPost() {
  const { pk } = useParams<{ pk: string }>();
  const { post, loading: loadingPost } = usePostDetails(pk);

  if (loadingPost) return <div>Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="p-10 mt-13">
      <EditPost2 post={post} pk={pk} />
    </div>
  );
}
