import { MyPosts } from "@/services/api";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axiosInstance from "@/services/axios";
import { ArrowLeft, ArrowRight, Pencil, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import type { PostApiResponse } from "@/types";

export default function YourPostsList() {
  const [apiResponse, setApiResponse] = useState<PostApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [nextPage, setNextPage] = useState<null | string>(null);
  const [lastPage, setlastPage] = useState<null | string>(null);
  const navigate = useNavigate();

  const fetchData = async (url?: string) => {
    setLoading(true);
    try {
      const response = url ? await axiosInstance.get(url) : await MyPosts();
      const data = response.data;
      setApiResponse(data);
      setNextPage(data.next);
      setlastPage(data.previous);
    } catch (err: any) {
      setError({
        message: err.response?.data?.message || "Failed to fetch posts",
        status: err.response?.status,
        details: err.response?.data,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <></>;
  if (error) return <div className="error-message">Error: {error.message}</div>;
  if (!apiResponse?.results.length) return <div>No posts found</div>;

  const results = apiResponse.results;

  return (
    <div className="w-full max-w-[1200px] mx-auto md:mt-10 px-4 md:px-6">
      <div className="p-4">
        <span className="text-2xl">Total Posts: {apiResponse.count}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-5">
        {results.map((post) => (
          <article
            key={post.id}
            className="aspect-[2/1.3] group rounded-lg border border-border bg-card p-5 transition-all hover:bg-accent hover:shadow-md flex flex-col"
          >
            <div className="flex-grow">
              <h3 className="mb-2 text-lg font-semibold line-clamp-3 break-words ">
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
                  onClick={() => navigate("/edit-post/" + post.id)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="flex flex-row gap-10 mt-4 justify-center">
        <Button
          onClick={() => fetchData(lastPage ?? undefined)}
          disabled={!lastPage}
        >
          <ArrowLeft />
          Last page
        </Button>
        <Button
          onClick={() => fetchData(nextPage ?? undefined)}
          disabled={!nextPage}
        >
          Next page
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
