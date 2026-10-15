import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, Plugin } from 'vite';
import { getRouteSEO, injectRouteMetadataIntoHtml } from './src/data/seoRoutes';
import { prerenderAllRoutes } from './scripts/prerender';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function seoPrerenderPlugin(): Plugin {
  return {
    name: 'seo-prerender-plugin',
    // Dev server on-the-fly HTML transformation for search bots / direct route requests
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const reqPath = ctx.originalUrl || ctx.path || '/';
        const cleanPath = reqPath.split('?')[0].split('#')[0];
        const routeData = getRouteSEO(cleanPath);
        return injectRouteMetadataIntoHtml(html, routeData);
      },
    },
    // Production build generation of static route HTML files in dist/
    closeBundle() {
      try {
        prerenderAllRoutes();
      } catch (err) {
        console.error('[seo-prerender-plugin] Error during static prerender:', err);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), seoPrerenderPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
