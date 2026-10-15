import React, { useEffect, useState } from 'react';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  ChevronRight,
  Share2,
  Check,
  Camera,
  Info,
} from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  onNavigate: (path: string) => void;
  onOpenImageAudit: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onNavigate,
  onOpenImageAudit,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const relatedArticles = ARTICLES.filter((a) => article.relatedSlugs.includes(a.slug));

  return (
    <div>
      {/* Reading Progress Indicator Bar */}
      <div
        className="fixed top-20 left-0 h-1 bg-[#4D5E43] z-30 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-12">
        {/* Breadcrumb Navigation (Semantic & Accessible) */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-[#78716C]">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="hover:text-[#1C1917] transition-colors"
          >
            Home
          </a>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <a
            href="/#articles"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
              setTimeout(() => {
                document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="hover:text-[#1C1917] transition-colors"
          >
            Psychology
          </a>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-[#1C1917] font-medium truncate max-w-[200px] sm:max-w-xs">
            {article.title}
          </span>
        </nav>

        {/* Article Header & Typography Hero */}
        <header className="space-y-6 hairline-b pb-8">
          {/* Zero-Pill Metadata Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#78716C] uppercase tracking-wider font-medium">
            <span className="text-[#4D5E43] font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>Published March 2026</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.readTimeMinutes} min read</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-mono">{article.wordCount} words</span>
          </div>

          {/* Single H1 Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-medium text-[#1C1917] leading-[1.18] tracking-tight text-balance">
            {article.title}
          </h1>

          {/* Byline & Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-[#78716C]">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#1C1917]">
                By The Hidden Mind Editorial Team
              </span>
              <span aria-hidden="true">·</span>
              <span>Evidence-based review</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3EFEA] hover:bg-stone-200 text-[#1C1917] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                title="Copy canonical page URL"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
              </button>
            </div>
          </div>

          {/* AEO Core Direct Answer Callout */}
          <div className="p-6 bg-[#F3EFEA] hairline-border space-y-2 mt-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#4D5E43] font-semibold">
              <Info className="w-4 h-4" />
              <span>Direct Answer (Quick Summary)</span>
            </div>
            <p className="text-base font-reading-prose text-[#1C1917] leading-relaxed">
              {article.directAnswer}
            </p>
          </div>
        </header>

        {/* Authentic Editorial Photographic Hero Visual */}
        <figure className="space-y-3">
          <div className="relative aspect-[3/2] w-full overflow-hidden hairline-border bg-[#F3EFEA]">
            <img
              src={article.heroImage.assetUrl}
              alt={article.heroImage.altText}
              width={article.heroImage.width}
              height={article.heroImage.height}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#78716C] pt-1">
            <span className="italic font-reading-prose">
              Figure 1. {article.heroImage.altText}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <span>Photo: {article.heroImage.photographer} (Unsplash)</span>
              <button
                onClick={onOpenImageAudit}
                className="text-[#4D5E43] hover:underline cursor-pointer"
              >
                Inspect Provenance
              </button>
            </div>
          </figcaption>
        </figure>

        {/* Long-Form Substantive Body Prose */}
        <div className="space-y-12 text-[#1C1917]">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-5">
              {/* Question-Led H2 Heading */}
              <h2 className="text-2xl sm:text-3xl font-editorial-serif font-medium text-[#1C1917] tracking-tight leading-snug pt-4 hairline-t">
                {section.heading}
              </h2>

              {/* Direct Section Answer (AEO Optimization) */}
              {section.directAnswer && (
                <div className="text-base font-reading-prose text-[#4D5E43] font-medium leading-relaxed bg-[#FAF8F5] p-3.5 hairline-border">
                  {section.directAnswer}
                </div>
              )}

              {/* Pull Quote if available */}
              {section.pullQuote && (
                <blockquote className="my-8 py-6 px-8 bg-[#F3EFEA] hairline-border space-y-2">
                  <p className="text-xl sm:text-2xl font-editorial-serif italic text-[#1C1917] leading-snug">
                    &ldquo;{section.pullQuote.text}&rdquo;
                  </p>
                  {section.pullQuote.attribution && (
                    <cite className="block text-xs uppercase tracking-wider text-[#78716C] font-sans not-italic font-semibold">
                      — {section.pullQuote.attribution}
                    </cite>
                  )}
                </blockquote>
              )}

              {/* Paragraphs with high-legibility measure (65-75ch) */}
              <div className="space-y-4 text-base sm:text-lg font-reading-prose text-[#292524] leading-relaxed">
                {section.content.map((p, pIdx) => {
                  // Drop cap on first paragraph of the first section
                  const isFirstP = idx === 0 && pIdx === 0;
                  return (
                    <p
                      key={pIdx}
                      className={
                        isFirstP
                          ? 'first-letter:text-5xl first-letter:font-editorial-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#1C1917]'
                          : ''
                      }
                    >
                      {p}
                    </p>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Contextual Internal Linking Strip (SEO Requirement 17) */}
        <div className="p-6 bg-[#F3EFEA] hairline-border space-y-3 mt-12">
          <span className="text-xs uppercase tracking-widest text-[#4D5E43] font-semibold block">
            Explore Related Cognitive Phenomena
          </span>
          <p className="text-sm font-reading-prose text-[#44403C]">
            Human decision-making operates through interconnected biases. To deepen your understanding:
          </p>
          <ul className="space-y-2 text-sm text-[#1C1917]">
            {article.slug === 'why-people-resist-changing-beliefs' && (
              <>
                <li>
                  <a
                    href="/psychology/spotlight-effect"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/psychology/spotlight-effect');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#4D5E43] font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Read our analysis of the Spotlight Effect &rarr;
                  </a>{' '}
                  <span className="text-[#78716C] text-xs">
                    (How self-focused anxiety distorts our perception of what others notice).
                  </span>
                </li>
                <li>
                  <a
                    href="/psychology/mere-exposure-effect"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/psychology/mere-exposure-effect');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#4D5E43] font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Explore the Mere-Exposure Effect &rarr;
                  </a>{' '}
                  <span className="text-[#78716C] text-xs">
                    (How repetitive information creates an illusory feeling of trust).
                  </span>
                </li>
              </>
            )}

            {article.slug === 'spotlight-effect' && (
              <>
                <li>
                  <a
                    href="/psychology/why-people-resist-changing-beliefs"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/psychology/why-people-resist-changing-beliefs');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#4D5E43] font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Read why people defend beliefs against counter-evidence &rarr;
                  </a>{' '}
                  <span className="text-[#78716C] text-xs">
                    (How self-protection and cognitive dissonance shape our worldviews).
                  </span>
                </li>
                <li>
                  <a
                    href="/psychology/mere-exposure-effect"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/psychology/mere-exposure-effect');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#4D5E43] font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Examine how familiarity shapes interpersonal judgements &rarr;
                  </a>{' '}
                  <span className="text-[#78716C] text-xs">
                    (Why proximity and repeated encounters soften social hesitation).
                  </span>
                </li>
              </>
            )}

            {article.slug === 'mere-exposure-effect' && (
              <>
                <li>
                  <a
                    href="/psychology/why-people-resist-changing-beliefs"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/psychology/why-people-resist-changing-beliefs');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#4D5E43] font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Explore why people resist changing beliefs &rarr;
                  </a>{' '}
                  <span className="text-[#78716C] text-xs">
                    (How repeated exposure interacts with motivated reasoning).
                  </span>
                </li>
                <li>
                  <a
                    href="/psychology/spotlight-effect"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/psychology/spotlight-effect');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#4D5E43] font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Investigate the Spotlight Effect &rarr;
                  </a>{' '}
                  <span className="text-[#78716C] text-xs">
                    (Why we assume everyone is evaluating our actions).
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Verified Research and References Section */}
        <section className="hairline-t pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block">
                Academic Rigor
              </span>
              <h3 className="text-2xl font-editorial-serif font-medium text-[#1C1917]">
                Research &amp; References
              </h3>
            </div>
            <div className="text-xs text-emerald-700 font-medium">
              Verified Primary Literature
            </div>
          </div>

          <p className="text-xs text-[#78716C]">
            All citations below refer to published academic studies, peer-reviewed journal papers, or established university press volumes:
          </p>

          <ol className="divide-y divide-stone-200 text-xs text-[#44403C] space-y-4">
            {article.citations.map((cite, cIdx) => (
              <li key={cite.id} className="pt-4 space-y-1">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-reading-prose text-sm text-[#1C1917]">
                    <strong>{cite.author}</strong> ({cite.year}). &ldquo;{cite.title}.&rdquo;{' '}
                    <em>{cite.source}</em>.
                  </p>
                  {cite.doi && (
                    <a
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4D5E43] hover:underline inline-flex items-center gap-1 font-mono text-[11px] shrink-0"
                    >
                      DOI <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                {cite.notes && (
                  <p className="text-[11px] text-stone-500 italic">
                    Methodological context: {cite.notes}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* Related Articles Navigation */}
        <section className="hairline-t pt-10 space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block">
            Continue Reading
          </span>
          <h3 className="text-2xl font-editorial-serif font-medium text-[#1C1917]">
            Related Inquiries in This Series
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.slug}
                className="bg-white hairline-border p-5 space-y-3 flex flex-col justify-between group hover:shadow-xs transition-shadow"
              >
                <div className="space-y-2">
                  <span className="text-[11px] text-[#4D5E43] uppercase tracking-wider font-semibold">
                    {rel.category} · {rel.readTimeMinutes} min read
                  </span>
                  <h4 className="text-lg font-editorial-serif font-medium text-[#1C1917] group-hover:text-[#4D5E43] transition-colors leading-snug">
                    <a
                      href={rel.path}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(rel.path);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {rel.title}
                    </a>
                  </h4>
                  <p className="text-xs font-reading-prose text-[#78716C] line-clamp-2">
                    {rel.summary}
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href={rel.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(rel.path);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs uppercase tracking-wider font-semibold text-[#4D5E43] hover:text-[#374430] inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back to Homepage Button */}
        <div className="hairline-t pt-8 flex justify-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-white hairline-border text-[#1C1917] hover:bg-stone-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to All Articles</span>
          </a>
        </div>
      </article>
    </div>
  );
};
