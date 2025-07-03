import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { PostTitleInput } from "../Inputs/PostTitleInput";
import { PostTextareaInput } from "../Inputs/PostTextareaInput";
import { CreatePostSchema } from "@/schemas";

export default function PostForm() {
  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      preview_text: "",
      content: "",
    },
  });

  const onSubmit = (data: z.infer<typeof CreatePostSchema>) => {
    console.log("Submitted data:", data);
    // Tutaj możesz wywołać API lub inną logikę
  };

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
          placeholder="Your post content"
        />

        <Button type="submit" className="text-md">
          Submit
        </Button>
      </form>
    </Form>
  );
}
