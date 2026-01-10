// dashboard/src/features/posts/pages/EditPost.tsx
import { postEditRoute } from '@/routes/dashboard/posts/post-edit.route';
import PostForm from '../components/PostForm';

export default function EditPostPage() {
  const post = postEditRoute.useLoaderData();

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Edit post</h1>
          <span className="badge badge-outline capitalize">{post.status}</span>
        </div>

        <p className="text-base-content/70">
          Update content, status, or manage this post.
        </p>
      </header>

      <PostForm mode="edit" initialValues={post} />
    </div>
  );
}
