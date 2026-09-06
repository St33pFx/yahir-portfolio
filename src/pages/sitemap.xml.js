import { getAllProjects } from '../data/projects';

export const prerender = true;

const SITE = 'https://jozedzn.com';
const LAST_MODIFIED = '2026-09-06';

function escapeXml(value) {
  return String(value).replace(/[<>&'"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character]);
}

function urlEntry(path, englishPath, spanishPath, priority = '0.8') {
  const url = `${SITE}${path}`;
  const englishUrl = `${SITE}${englishPath}`;
  const spanishUrl = `${SITE}${spanishPath}`;

  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(englishUrl)}"/>
    <xhtml:link rel="alternate" hreflang="es-MX" href="${escapeXml(spanishUrl)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(englishUrl)}"/>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export function GET() {
  const entries = [
    urlEntry('/', '/', '/es/', '1.0'),
    urlEntry('/es/', '/', '/es/', '1.0'),
  ];

  getAllProjects().forEach((project) => {
    const englishPath = `/work/${project.slug}`;
    const spanishPath = `/es/work/${project.slug}`;
    entries.push(urlEntry(englishPath, englishPath, spanishPath));
    entries.push(urlEntry(spanishPath, englishPath, spanishPath));
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
