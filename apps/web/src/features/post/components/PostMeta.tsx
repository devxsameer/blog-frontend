export default function PostMeta({ post }: any) {
  return (
    <div className="text-sm text-gray-500">
      <span>{post.author.username}</span>
      {' · '}
      <time>{new Date(post.createdAt).toLocaleDateString()}</time>
    </div>
  );
}
