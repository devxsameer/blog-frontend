import { z } from 'zod';
import { getApiConfig } from './config';
import { ApiErrorSchema } from '@blog/schemas';

export async function api<T>(
  path: string,
  options: RequestInit,
  responseSchema: z.ZodType<T>,
): Promise<T> {
  const { baseUrl } = getApiConfig();

  const res = await fetch(`${baseUrl}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const json = await res.json();

  // ❌ Network-level error (HTML, proxy, crash, etc.)
  if (!res.ok) {
    const parsedError = ApiErrorSchema.safeParse(json);
    if (parsedError.success) {
      throw parsedError.data.error;
    }
    throw {
      code: 'UNKNOWN_ERROR',
      message: 'Unexpected error response',
    };
  }

  // ✅ Success response validation
  const parsed = responseSchema.safeParse(json);
  if (!parsed.success) {
    throw {
      code: 'INVALID_RESPONSE',
      message: 'Response does not match contract',
      issues: parsed.error.issues,
    };
  }

  return parsed.data;
}
