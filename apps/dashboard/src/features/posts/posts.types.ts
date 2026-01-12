import type { PostContent } from '@blog/types';

export type PostFormProps = {
  initialValues?: PostContent;
  mode: 'create' | 'edit';
};

export type PostsSearch = {
  authorId?: string;
  sort?: 'createdAt' | 'updatedAt' | 'publishedAt';
  order?: 'asc' | 'desc';
  status?: 'draft' | 'published' | 'archived';
};
