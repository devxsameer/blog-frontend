import { Link } from 'react-router';

export default function PostCard({ post }: any) {
  return (
    <article className="border-b pb-6">
      <h2 className="text-xl font-semibold">
        <Link to={`/posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>

      {post.excerpt && <p className="mt-3 text-gray-700">{post.excerpt}</p>}
    </article>
  );
}
