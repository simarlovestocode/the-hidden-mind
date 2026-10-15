import { Article } from '../types';
import { CONFIGURED_DOMAIN, getRouteSEO, buildRouteStructuredData } from '../data/seoRoutes';

export function updatePageSEO(options: {
  title?: string;
  description?: string;
  path: string;
  imageUrl?: string;
  article?: Article;
}) {
  const routeSEO = getRouteSEO(options.path);
  const title = options.title || routeSEO.title;
  const description = options.description || routeSEO.description;
  const path = options.path;
  const fullUrl = routeSEO.canonicalUrl;
  const effectiveImage = options.imageUrl || routeSEO.ogImage;
  const article = options.article;

  // 1. Update Document Title
  document.title = title;

  // 2. Helper to set or create meta tag
  const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
    const selector = isProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(isProperty ? 'property' : 'name', nameOrProperty);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Set standard meta tags
  setMeta('description', description);

  // 4. Set Open Graph tags
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:url', fullUrl, true);
  setMeta('og:type', article ? 'article' : 'website', true);
  setMeta('og:image', effectiveImage, true);
  setMeta('og:site_name', 'The Hidden Mind', true);

  // 5. Set Twitter Card tags
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', effectiveImage);

  // 6. Update Self-referencing Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullUrl);

  // 7. Update JSON-LD Structured Data
  let jsonLdScript = document.getElementById('site-schema') as HTMLScriptElement | null;
  if (!jsonLdScript) {
    jsonLdScript = document.getElementById('dynamic-jsonld') as HTMLScriptElement | null;
  }
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'site-schema';
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }

  const structuredData = buildRouteStructuredData(routeSEO);
  jsonLdScript.textContent = JSON.stringify(structuredData, null, 2);
}
