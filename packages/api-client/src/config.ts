export type ApiClientConfig = {
  baseUrl: string;
};

let config: ApiClientConfig | null = null;

export function configureApiClient(cfg: ApiClientConfig) {
  config = cfg;
}

export function getApiConfig() {
  if (!config) {
    throw new Error('API client not configured');
  }
  return config;
}
