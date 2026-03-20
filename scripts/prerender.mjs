/**
 * scripts/prerender.mjs
 *
 * Generates static HTML files for each route, injecting SSR-rendered content
 * and correct Helmet metadata into the production dist/index.html template.
 *
 * Usage:
 *   npm run build        → client build only (dist/)
 *   npm run prerender    → prerender into existing dist/ (run after build)
 *   npm run build:seo    → build + prerender in one step (for deployment)
 *
 * Output: dist/about/index.html, dist/work/index.html, etc.
 * These are served as static files before SPA catch-all redirects.
 */

import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root      = path.resolve(__dirname, '..');

/** Routes to prerender. Case studies (/work/:slug) are excluded because
 *  they are lazy-loaded and CaseStudyPage uses gsap.registerPlugin(ScrollTrigger)
 *  at module level — which is safe to skip since case studies already have
 *  full per-page Helmet metadata injected client-side via react-helmet-async. */
const ROUTES = [
  '/',
  '/about',
  '/work',
  '/motion-graphics',
  '/3d',
  '/web-design',
  '/game-dev',
  '/contact',
];

async function run() {
  const dist = path.join(root, 'dist');

  if (!fs.existsSync(path.join(dist, 'index.html'))) {
    console.error('❌  dist/index.html not found — run "npm run build" first.');
    process.exit(1);
  }

  const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');

  console.log('🔧  Starting prerender...\n');

  // Vite dev server in SSR middleware mode — no HTTP port is bound.
  // This lets us use ssrLoadModule to transform JSX/ESM on the fly.
  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'warn',
  });

  let render;
  try {
    ({ render } = await vite.ssrLoadModule('/src/entry-server.jsx'));
  } catch (err) {
    console.error('❌  Failed to load entry-server.jsx:\n', err.message);
    await vite.close();
    process.exit(1);
  }

  for (const route of ROUTES) {
    let appHtml  = '';
    let headTags = '';

    try {
      const { html, helmet } = await render(route);
      appHtml = html;

      // Collect all Helmet-generated head tags (title, meta, link, script)
      headTags = [
        helmet?.title?.toString(),
        helmet?.meta?.toString(),
        helmet?.link?.toString(),
        helmet?.script?.toString(),
      ].filter(Boolean).join('\n    ');

    } catch (err) {
      // If SSR fails (e.g. a component accesses window during render),
      // fall back to the plain template — the page will still hydrate
      // correctly client-side with proper Helmet metadata.
      const msg = err.message?.split('\n')[0] ?? String(err);
      console.warn(`  ⚠  SSR fallback for ${route}: ${msg}`);
    }

    // Inject prerendered content into the production template
    let pageHtml = template;
    if (appHtml) {
      pageHtml = template
        // Remove the default title — helmet injects the correct one
        .replace(/<title>[\s\S]*?<\/title>/, '')
        // Inject Helmet tags before </head>
        .replace('</head>', `    ${headTags}\n  </head>`)
        // Inject rendered React tree into the root div
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    }

    // Write to dist/<route>/index.html  (dist/index.html for "/")
    const parts  = route.replace(/^\//, '').split('/').filter(Boolean);
    const outDir = parts.length ? path.join(dist, ...parts) : dist;
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), pageHtml, 'utf-8');

    console.log(`  ✓  ${route}`);
  }

  await vite.close();
  console.log('\n✅  Prerender complete — static HTML written to dist/');
  console.log('    Deploy the dist/ folder to any static host.\n');
}

run().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
