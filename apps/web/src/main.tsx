// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from '@/app/providers';
import '@/styles/index.css';
import { configureApiClient } from '@blog/api-client';
import { env } from '@/app/env';

configureApiClient({
  baseUrl: env.API_URL,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>,
);
