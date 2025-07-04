import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import type { Post } from "@/types";
import { CreatePostSchema } from "@/schemas";
import { UpdatePost } from "@/services/api";
import { Form } from "../ui/form";
import { PostTitleInput } from "../Inputs/PostTitleInput";
import { PostTextareaInput } from "../Inputs/PostTextareaInput";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { Save, Pencil } from "lucide-react";

type FormData = z.infer<typeof CreatePostSchema>;

export function EditPost2({
  post,
  pk,
}: {
  post: Post;
  pk: string | undefined;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: post.title,
      preview_text: post.preview_text,
      content: post.content,
    },
  });

  const navigate = useNavigate();
  function onSubmit(data: any) {
    UpdatePost(pk, data);
    navigate("/posts/" + pk);
  }

  return (
    <div className="flex flex-col items-center px-4 w-full">
      <h1 className="text-2xl m-10 text-center flex flex-col items-center gap-2">
        <span className="flex items-center gap-2">
          Edit Your Post <Pencil className="w-5 h-5 text-muted-foreground" />
        </span>
        <span className="font-semibold">{post.title}</span>
      </h1>
      <Card className="p-6 w-2/3 space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PostTitleInput control={form.control} name="title" />

            <PostTextareaInput
              control={form.control}
              name="preview_text"
              label="Preview"
              placeholder="Your preview text"
            />

            <PostTextareaInput
              control={form.control}
              name="content"
              label="Post"
              placeholder="Your post"
            />

            <Button type="submit" className="text-md">
              <Save />
              Save
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
