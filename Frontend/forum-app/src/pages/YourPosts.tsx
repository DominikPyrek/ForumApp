import { Card } from "@/components/ui/card";

import CreatePostForm from "@/components/Posts/CreatePostForm";
import YourPostsList from "@/components/Posts/YourPosts";

function YourPosts() {
  return (
    <main className="grid grid-cols-1 xl:grid-cols-2 w-full h-[81vh] mt-6 md:mt-10 max-w-screen-3xl mx-auto px-4 md:px-6 py-8 md:py-12 gap-8 md:gap-12 place-items-center">
      <div className="text-center">
        <YourPostsList />
      </div>
      <div className="text-center w-full items-center">
        <h2 className="text-2xl pb-7">Create Post</h2>
        <Card className="p-10 max-w-2xl mx-auto">
          <CreatePostForm />
        </Card>
      </div>
    </main>
  );
}

export default YourPosts;
