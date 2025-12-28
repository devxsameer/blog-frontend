import { z } from 'zod';

export const UserSchema = z.object({
  id: z.uuid(),
  username: z.string(),
  email: z.email(),
  role: z.enum(['admin', 'author', 'user']),
  createdAt: z.string(),
});

export type User = z.infer<typeof UserSchema>;
