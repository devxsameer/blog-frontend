import { authHttp } from '../http/auth-http';
import { unwrap } from '../unwrap';

export const commentsApi = {
  async listByPost(slug: string) {
    const { status, body } = await authHttp(`/api/posts/${slug}/comments`);
    return unwrap<any[]>(status, body);
  },

  async create(slug: string, input: { content: string; parentId?: string }) {
    const { status, body } = await authHttp(`/api/posts/${slug}/comments`, {
      method: 'POST',
      body: JSON.stringify(input),
    });

    return unwrap(status, body);
  },
};
