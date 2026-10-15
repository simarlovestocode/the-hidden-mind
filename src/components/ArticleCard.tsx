import React, { useState } from 'react';
import { Article } from '../types';
import { ArrowRight, BookOpen } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onNavigate: (path: string) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onNavigate, featured = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(article.path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article
      className={`group flex flex-col justify-between bg-white hairline-border transition-all duration-300 hover:shadow-md ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      <div>
        {/* Authentic Photographic Media Container */}
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#F3EFEA]">
          {!imageError ? (
            <img
              src={article.heroImage.thumbnailUrl}
              alt={article.heroImage.altText}
              loading="lazy"
              width={article.heroImage.width}
              height={article.heroImage.height}
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F3EFEA] text-[#78716C]">
              <BookOpen className="w-8 h-8 mb-2 stroke-1 text-[#4D5E43]" />
              <p className="text-xs uppercase tracking-wider font-medium">{article.category}</p>
              <p className="text-xs italic mt-1 max-w-xs">{article.heroImage.altText}</p>
            </div>
          )}

          {/* Quiet Photo Provenance Attribution (Editorial Transparency) */}
          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-[10px] text-white/90">
            Photo: {article.heroImage.photographer} (Unsplash)
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 space-y-4">
          {/* Zero-Pill Metadata Line (Anti-Slop Constitution Rule) */}
          <div className="flex items-center gap-2 text-xs text-[#78716C] uppercase tracking-wider font-medium">
            <span className="text-[#4D5E43] font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTimeMinutes} min read</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{article.wordCount} words</span>
          </div>

          {/* Descriptive Accessible Heading Link */}
          <h3 className="text-xl sm:text-2xl font-editorial-serif font-medium text-[#1C1917] leading-snug group-hover:text-[#4D5E43] transition-colors">
            <a href={article.path} onClick={handleClick}>
              {article.title}
            </a>
          </h3>

          {/* Original Summary */}
          <p className="text-sm font-reading-prose text-[#44403C] leading-relaxed line-clamp-3">
            {article.summary}
          </p>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
        <a
          href={article.path}
          onClick={handleClick}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4D5E43] group-hover:text-[#374430] transition-colors"
        >
          <span>Read Full Analysis</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
};
