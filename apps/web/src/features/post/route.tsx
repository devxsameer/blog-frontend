// web/src/features/post/route.tsx
import PostPage from '@/features/post/pages/Post';
import PostsPage from './pages/Posts';
import { postLoader, postsLoader } from './loaders';
import { commentsLoader } from './comment/loaders';
import { createCommentAction, deleteCommentAction } from './comment/actions';
import type { ShouldRevalidateFunctionArgs } from 'react-router';
import { likePostAction } from './actions';

export const postRoute = {
  path: 'posts',
  children: [
    { index: true, Component: PostsPage, loader: postsLoader },
    {
      id: 'post',
      path: ':postSlug',
      Component: PostPage,
      loader: postLoader,
      children: [
        { path: 'like', action: likePostAction },
        {
          path: 'comments',
          loader: commentsLoader,
          action: createCommentAction,
          shouldRevalidate: ({
            actionResult,
          }: ShouldRevalidateFunctionArgs) => {
            return actionResult !== null;
          },
        },
        {
          path: 'comments/:commentId/delete',
          action: deleteCommentAction,
          shouldRevalidate: ({ actionResult }: ShouldRevalidateFunctionArgs) =>
            actionResult !== undefined,
        },
      ],
    },
  ],
};
