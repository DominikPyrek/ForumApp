import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GetPostDetails } from "@/services/api";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { GetComments } from "@/services/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateComment } from "@/services/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  content: z.string().min(10).max(1200),
  post: z.string(),
});

type Creator = {
  id: number;
  username: string;
  email: string;
  avatar: null;
  bio: string;
};

type Post = {
  id: number;
  creator: Creator;
  title: string;
  preview_text: string;
  content: string;
  created_at: string;
  liked_by: [];
  like_count: number;
};

type Comment = {
  detail?: string;
  creator: Creator;
  content: string;
  post: number;
  created_at: string;
  liked_by: Creator;
};

export default function PostDetail() {
  const { pk } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | null>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      post: pk,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    CreateComment(data);
    form.reset({
      content: "",
      post: pk,
    });
    fetchComments();
  }

  const fetchComments = async () => {
    if (!pk) return;
    const response = await GetComments(pk);
    if (response.data.count === 0) {
      setComments([]);
    } else {
      setComments(response.data.results);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!pk) return;
      const response = await GetPostDetails(pk);
      setPost(response.data);
    };
    fetchComments();
    fetchPost();
  }, [pk]);

  if (!post) return <div>Loading post...</div>;
  if (!comments) return <div>Loading post...</div>;

  return (
    <div className="p-10">
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment this post</FormLabel>
                  <FormControl>
                    <Input placeholder="Your comment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="text-md">
              Comment
            </Button>
          </form>
        </Form>
        <Button variant="outline" className="max-w-20 m-10">
          Like
        </Button>
      </Card>
      <Card className="m-10 p-4 space-y-4">
        <h2 className="text-xl font-semibold">Comments</h2>
        {comments.length === 0 ? (
          <p className="text-muted-foreground">No comments yet.</p>
        ) : (
          comments.map((comment, idx) => (
            <div key={idx} className="border-b pb-2">
              {comment.creator.avatar && (
                <img
                  src={comment.creator.avatar}
                  className="max-w-50"
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
    </div>
  );
}
