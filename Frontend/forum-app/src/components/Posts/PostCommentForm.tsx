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
import { PostDetailSchema } from "@/schemas";
import { z } from "zod";

type Props = {
  pk: string;
  onCommentSubmit: (data: { content: string; post: string }) => Promise<void>;
};

export function PostCommentForm({ pk, onCommentSubmit }: Props) {
  const form = useForm<z.infer<typeof PostDetailSchema>>({
    resolver: zodResolver(PostDetailSchema),
    defaultValues: { content: "", post: pk },
  });

  async function onSubmit(data: z.infer<typeof PostDetailSchema>) {
    await onCommentSubmit(data);
    form.reset({ content: "", post: pk });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
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
          <Button variant="outline" className="w-28  text-lg whitespace-nowrap">
            Like
          </Button>
        </div>
      </form>
    </Form>
  );
}
