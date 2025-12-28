import { z } from 'zod';
import { ApiSuccess } from './api.schema';
import { ApiErrorSchema } from './error.schema';
import { UserSchema } from './user.schema';

export const LoginInputSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const LoginResponseSchema = z.union([
  ApiSuccess(UserSchema),
  ApiErrorSchema,
]);

export const MeResponseSchema = z.union([
  ApiSuccess(UserSchema),
  ApiErrorSchema,
]);
