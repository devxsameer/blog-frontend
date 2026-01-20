export const siteUrl = 'https://blog.devxsameer.me';

export const pageTitle = (title: string) => `${title} · Sameer Ali`;

export const canonical = (path: string) => ({
  rel: 'canonical',
  href: `${siteUrl}${path}`,
});
