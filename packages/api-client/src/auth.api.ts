import { api } from './api';
import {
  LoginInputSchema,
  LoginResponseSchema,
  MeResponseSchema,
} from '@blog/schemas';

export async function login(input: unknown) {
  const payload = LoginInputSchema.parse(input);

  return api(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    LoginResponseSchema,
  );
}

export async function me() {
  return api('/auth/me', {}, MeResponseSchema);
}
