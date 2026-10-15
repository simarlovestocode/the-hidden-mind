export interface RouteSEOData {
  path: string;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: [string, string];
  canonicalUrl: string;
  ogType: 'website' | 'article';
  ogImage: string;
  datePublished?: string;
  dateModified?: string;
}

// Configured production domain (can be overridden via environment variable APP_URL / VITE_APP_URL)
export const CONFIGURED_DOMAIN =
  (typeof process !== 'undefined' && (process.env?.APP_URL || process.env?.VITE_APP_URL)) ||
  'https://thehiddenmind.vercel.app';

export const SEO_ROUTES: Record<string, RouteSEOData> = {
  '/': {
    path: '/',
    title: 'Human Behaviour: Psychology of Everyday Actions | The Hidden Mind',
    description:
      'Explore the hidden mechanisms of human behaviour. Discover research on the psychology of human behaviour, cognitive biases, and everyday social decisions.',
    primaryKeyword: 'human behaviour',
    secondaryKeywords: ['psychology of human behaviour', 'human behaviour psychology'],
    canonicalUrl: `${CONFIGURED_DOMAIN}/`,
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
  },
  '/psychology/why-people-resist-changing-beliefs': {
    path: '/psychology/why-people-resist-changing-beliefs',
    title: 'Confirmation Bias & Why We Reject Evidence | The Hidden Mind',
    description:
      'Learn how confirmation bias shapes our thinking, why people reject evidence, and how this cognitive bias prevents us from updating our beliefs.',
    primaryKeyword: 'confirmation bias',
    secondaryKeywords: ['cognitive bias', 'why people reject evidence'],
    canonicalUrl: `${CONFIGURED_DOMAIN}/psychology/why-people-resist-changing-beliefs`,
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    datePublished: '2026-03-12',
    dateModified: '2026-10-15',
  },
  '/psychology/spotlight-effect': {
    path: '/psychology/spotlight-effect',
    title: 'Spotlight Effect Psychology: Why We Feel Observed | The Hidden Mind',
    description:
      'Discover spotlight effect psychology, explore real spotlight effect examples, and understand what is the spotlight effect when we feel everyone is watching.',
    primaryKeyword: 'spotlight effect psychology',
    secondaryKeywords: ['spotlight effect examples', 'what is the spotlight effect'],
    canonicalUrl: `${CONFIGURED_DOMAIN}/psychology/spotlight-effect`,
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1508873696983-2df5703bc398?auto=format&fit=crop&w=1200&q=80',
    datePublished: '2026-03-18',
    dateModified: '2026-10-15',
  },
  '/psychology/mere-exposure-effect': {
    path: '/psychology/mere-exposure-effect',
    title: 'The Mere Exposure Effect: Psychology of Familiarity | The Hidden Mind',
    description:
      'Understand the mere exposure effect, familiarity bias in decision making, and the subtle psychology of familiarity and trust in human social choices.',
    primaryKeyword: 'mere exposure effect',
    secondaryKeywords: ['familiarity bias in decision making', 'psychology of familiarity and trust'],
    canonicalUrl: `${CONFIGURED_DOMAIN}/psychology/mere-exposure-effect`,
    ogType: 'article',
    ogImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    datePublished: '2026-03-24',
    dateModified: '2026-10-15',
  },
};

export function getRouteSEO(pathname: string): RouteSEOData {
  const cleanPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return SEO_ROUTES[cleanPath] || SEO_ROUTES['/'];
}

export function buildRouteStructuredData(route: RouteSEOData): object {
  if (route.ogType === 'article') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${route.canonicalUrl}#article`,
          isPartOf: {
            '@type': 'WebSite',
            '@id': `${CONFIGURED_DOMAIN}/#website`,
            name: 'The Hidden Mind',
            url: CONFIGURED_DOMAIN,
          },
          headline: route.title,
          description: route.description,
          url: route.canonicalUrl,
          mainEntityOfPage: route.canonicalUrl,
          datePublished: route.datePublished,
          dateModified: route.dateModified,
          inLanguage: 'en-US',
          author: {
            '@type': 'Organization',
            name: 'The Hidden Mind Editorial Team',
            url: CONFIGURED_DOMAIN,
          },
          publisher: {
            '@type': 'Organization',
            name: 'The Hidden Mind',
            url: CONFIGURED_DOMAIN,
          },
          image: {
            '@type': 'ImageObject',
            url: route.ogImage,
          },
          keywords: [route.primaryKeyword, ...route.secondaryKeywords],
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${route.canonicalUrl}#breadcrumbs`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${CONFIGURED_DOMAIN}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Psychology',
              item: `${CONFIGURED_DOMAIN}/#articles`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: route.title,
              item: route.canonicalUrl,
            },
          ],
        },
      ],
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${CONFIGURED_DOMAIN}/#website`,
        name: 'The Hidden Mind',
        url: `${CONFIGURED_DOMAIN}/`,
        description: route.description,
        publisher: {
          '@type': 'Organization',
          name: 'The Hidden Mind Editorial Team',
          url: `${CONFIGURED_DOMAIN}/`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${CONFIGURED_DOMAIN}/#organization`,
        name: 'The Hidden Mind',
        url: `${CONFIGURED_DOMAIN}/`,
        description:
          'A research-backed digital publication exploring the psychological mechanisms behind human beliefs, perceptions, and social behaviour.',
      },
    ],
  };
}

/**
 * Replaces the metadata inside raw index.html template with the route-specific metadata.
 */
export function injectRouteMetadataIntoHtml(html: string, route: RouteSEOData): string {
  let output = html;

  // Replace <title>...</title>
  output = output.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);

  // Replace <meta name="description" content="..." />
  output = output.replace(
    /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );

  // Replace <link rel="canonical" href="..." />
  output = output.replace(
    /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(route.canonicalUrl)}" />`
  );

  // Replace OpenGraph title
  output = output.replace(
    /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );

  // Replace OpenGraph description
  output = output.replace(
    /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );

  // Replace OpenGraph url
  output = output.replace(
    /<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(route.canonicalUrl)}" />`
  );

  // Replace OpenGraph type
  output = output.replace(
    /<meta\s+property=["']og:type["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:type" content="${escapeHtml(route.ogType)}" />`
  );

  // Replace OpenGraph image
  output = output.replace(
    /<meta\s+property=["']og:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtml(route.ogImage)}" />`
  );

  // Replace Twitter card title
  output = output.replace(
    /<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );

  // Replace Twitter card description
  output = output.replace(
    /<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );

  // Replace Twitter card image
  output = output.replace(
    /<meta\s+name=["']twitter:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtml(route.ogImage)}" />`
  );

  // Replace or inject JSON-LD script
  const jsonLd = JSON.stringify(buildRouteStructuredData(route), null, 2);
  if (output.includes('id="site-schema"')) {
    output = output.replace(
      /<script\s+type=["']application\/ld\+json["']\s+id=["']site-schema["']>[\s\S]*?<\/script>/i,
      `<script type="application/ld+json" id="site-schema">\n${jsonLd}\n    </script>`
    );
  } else if (output.includes('</head>')) {
    output = output.replace(
      '</head>',
      `  <script type="application/ld+json" id="site-schema">\n${jsonLd}\n  </script>\n</head>`
    );
  }

  return output;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
