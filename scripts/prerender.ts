import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_ROUTES, CONFIGURED_DOMAIN, injectRouteMetadataIntoHtml } from '../src/data/seoRoutes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

export function prerenderAllRoutes() {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.warn('[prerender] dist/index.html not found, skipping prerender.');
    return;
  }

  const rawHtml = fs.readFileSync(templatePath, 'utf-8');

  for (const [routePath, routeData] of Object.entries(SEO_ROUTES)) {
    const routeHtml = injectRouteMetadataIntoHtml(rawHtml, routeData);

    if (routePath === '/') {
      fs.writeFileSync(templatePath, routeHtml, 'utf-8');
      console.log(`[prerender] Generated static HTML for route: / -> dist/index.html`);
    } else {
      // e.g. /psychology/spotlight-effect -> dist/psychology/spotlight-effect/index.html
      const relativeDirPath = routePath.startsWith('/') ? routePath.slice(1) : routePath;
      const targetDir = path.join(distDir, relativeDirPath);
      fs.mkdirSync(targetDir, { recursive: true });
      const targetFile = path.join(targetDir, 'index.html');
      fs.writeFileSync(targetFile, routeHtml, 'utf-8');
      console.log(`[prerender] Generated static HTML for route: ${routePath} -> ${targetFile}`);
    }
  }

  // Generate synchronized sitemap.xml in dist/
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${CONFIGURED_DOMAIN}/</loc>
    <lastmod>2026-10-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${CONFIGURED_DOMAIN}/psychology/why-people-resist-changing-beliefs</loc>
    <lastmod>2026-10-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${CONFIGURED_DOMAIN}/psychology/spotlight-effect</loc>
    <lastmod>2026-10-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${CONFIGURED_DOMAIN}/psychology/mere-exposure-effect</loc>
    <lastmod>2026-10-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`[prerender] Generated sitemap.xml in dist/ matching ${CONFIGURED_DOMAIN}`);

  // Generate synchronized robots.txt in dist/
  const robotsTxt = `# The Hidden Mind - robots.txt
User-agent: *
Allow: /

Sitemap: ${CONFIGURED_DOMAIN}/sitemap.xml
`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');
  console.log(`[prerender] Generated robots.txt in dist/ matching ${CONFIGURED_DOMAIN}`);
}

// If executed directly via CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  prerenderAllRoutes();
}
