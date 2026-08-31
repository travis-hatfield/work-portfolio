import PostEditor from "@/components/post-editor";

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">New Post</h1>
      <PostEditor />
    </div>
  );
}
