import type { LoaderFunctionArgs } from 'react-router';
import { commentsApi } from '@blog/api-client';

export async function commentsLoader({ params }: LoaderFunctionArgs) {
  if (!params.postSlug) {
    throw new Response('Not Found', { status: 404 });
  }

  const comments = await commentsApi.listByPost(params.postSlug);
  return { comments };
}
