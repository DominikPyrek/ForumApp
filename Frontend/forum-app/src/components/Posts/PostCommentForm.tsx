import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCommentSchema } from "@/schemas";
import { z } from "zod";
import { CreateComment } from "@/services/api";
import type { Comment } from "@/types";

type Props = {
  pk: string;
  onCommentSubmit: (newComment: Comment) => void;
};

export function PostCommentForm({ pk, onCommentSubmit }: Props) {
  const form = useForm<z.infer<typeof CreateCommentSchema>>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: { content: "", post: pk },
  });

  async function onSubmit(data: z.infer<typeof CreateCommentSchema>) {
    const response = await CreateComment(data);
    form.reset({ content: "", post: pk });
    onCommentSubmit(response.data);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Comment this post</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your comment"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="text-lg"
            >
              Comment
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
