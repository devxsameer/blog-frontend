import { z } from 'zod';

export const ApiSuccess = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    message: z.string(),
    data: dataSchema.nullable(),
    meta: z.any().nullable(),
  });
