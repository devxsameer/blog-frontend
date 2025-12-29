import PostCard from './PostCard';

export default function PostList({ posts }: { posts: any[] }) {
  return (
    <div className="mt-8 space-y-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
