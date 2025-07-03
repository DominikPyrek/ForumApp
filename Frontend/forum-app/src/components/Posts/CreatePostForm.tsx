import { CreatePost } from "@/services/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { CreatePostSchema } from "@/schemas";
import { PostTitleInput } from "../Inputs/PostTitleInput";
import { PostTextareaInput } from "../Inputs/PostTextareaInput";

export default function CreatePostForm() {
  const form = useForm({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      preview_text: "",
      content: "",
    },
  });

  function onSubmit(data: any) {
    CreatePost(data);
    form.reset({
      title: "",
      preview_text: "",
      content: "",
    });
  }

  return (
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
          Submit
        </Button>
      </form>
    </Form>
  );
}
