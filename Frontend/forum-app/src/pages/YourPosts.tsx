import { Card } from "@/components/ui/card";

import CreatePostForm from "@/components/CreatePostForm";
import YourPostsList from "@/components/YourPostsList";

function YourPosts() {
  return (
    <main className="flex flex-col md:flex-row w-full mx-auto px-4 md:px-6 py-8 md:py-12 mt-10 items-center justify-center">
      <div className="flex-1/2 text-center">
        <YourPostsList />
      </div>
      <div className="flex-1/2 text-center">
        <h2 className="text-2xl pb-7 max-md:mt-20">Create Post</h2>
        <Card className="p-10">
          <CreatePostForm />
        </Card>
      </div>
    </main>
  );
}

export default YourPosts;
