export type ApiClientConfig = {
  baseUrl: string;
};

let config: ApiClientConfig | null = null;

export function configureApiClient(cfg: ApiClientConfig) {
  config = cfg;
}

export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!config) {
    throw new Error('API client not configured');
  }

  const res = await fetch(`${config.baseUrl}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}
