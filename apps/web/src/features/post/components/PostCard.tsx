import type { Post } from '@blog/types';
import { Link } from '@tanstack/react-router';

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group max-w-prose pb-4">
      <h2 className="text-xl leading-snug font-bold">
        <Link
          to="/posts/$postSlug"
          params={{ postSlug: post.slug }}
          className="underline-offset-2 hover:underline"
        >
          {post.title}
        </Link>
      </h2>

      {post.excerpt && (
        <p className="text-base-content my-3 leading-relaxed">{post.excerpt}</p>
      )}

      <Link
        to="/posts/$postSlug"
        params={{ postSlug: post.slug }}
        className="underline-offset- cursor-pointer py-2 text-sm font-bold hover:underline"
      >
        Read more →
      </Link>
    </article>
  );
}
