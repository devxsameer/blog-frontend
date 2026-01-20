import { authHttp } from '../http/auth-http';
import { unwrap } from '../unwrap';

export type AvatarUploadSignature = {
  uploadUrl: string;
  fields: {
    api_key: string;
    signature: string;
  } & Record<string, string>;
  publicId: string;
};

export const avatarApi = {
  async getUploadSignature() {
    const { status, body } = await authHttp('/api/users/me/avatar/upload');

    return unwrap<AvatarUploadSignature>(status, body);
  },

  async updateAvatar(publicId: string) {
    const { status, body } = await authHttp('/api/users/me/avatar', {
      method: 'PUT',
      body: JSON.stringify({ publicId }),
    });

    return unwrap(status, body);
  },
};
