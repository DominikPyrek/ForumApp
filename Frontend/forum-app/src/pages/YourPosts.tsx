import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CreatePostForm from "@/components/CreatePostForm";

function YourPosts() {
  return (
    <main className="flex flex-row w-full mx-auto px-4 md:px-6 py-8 md:py-12 mt-10 items-center justify-center">
      <div className="flex-1/2 text-center">Your Posts</div>
      <div className="flex-1/2 text-center">
        <h1>Create Post</h1>
        <Card>
          <CreatePostForm></CreatePostForm>
        </Card>
      </div>
    </main>
  );
}

export default YourPosts;
