import type { APIRoute } from 'astro';

const pages = [
  '/',
  '/openprinter/',
  '/openprinter/alternatives/',
  '/guides/no-subscription-printers/',
  '/guides/linux-compatible-printers/',
];

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>https://nolockinprinter.com${page}</loc>
    <lastmod>2026-07-08</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
