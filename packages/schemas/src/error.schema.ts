import { z } from 'zod';

export const ValidationIssueSchema = z.object({
  path: z.string(),
  message: z.string(),
});

export const ApiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    issues: z.array(ValidationIssueSchema).optional(),
  }),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;
