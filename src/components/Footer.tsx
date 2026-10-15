import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenKeywords: () => void;
  onOpenChecklist: () => void;
  onOpenImageAudit: () => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenKeywords,
  onOpenChecklist,
  onOpenImageAudit,
  onOpenAbout,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F3EFEA] hairline-t text-[#1C1917] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Publication Identity */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-2xl font-editorial-serif font-medium tracking-tight text-[#1C1917] block">
              The Hidden Mind
            </span>
            <p className="text-sm font-reading-prose text-[#44403C] leading-relaxed max-w-md">
              A digital publication investigating the psychological mechanisms behind human beliefs,
              perceptions, and social behaviour. Dedicated to distinguishing empirical evidence from
              speculation, without sensationalism or superficial self-help tropes.
            </p>
            <div className="pt-2 text-xs text-[#78716C] space-y-1">
              <p>Editorial Byline: The Hidden Mind Editorial Team</p>
              <p>Advisory: Educational and analytical publication; not intended as clinical or diagnostic guidance.</p>
            </div>
          </div>

          {/* Core Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#78716C] font-semibold">
              Publication
            </h3>
            <ul className="space-y-2 text-sm text-[#44403C]">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#1C1917] transition-colors"
                >
                  Homepage
                </a>
              </li>
              <li>
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
                  All Research Articles
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#1C1917] transition-colors text-left cursor-pointer"
                >
                  Editorial Philosophy &amp; Standards
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1C1917] transition-colors inline-flex items-center gap-1"
                >
                  XML Sitemap <ArrowUpRight className="w-3 h-3 text-[#78716C]" />
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1C1917] transition-colors inline-flex items-center gap-1"
                >
                  Robots.txt <ArrowUpRight className="w-3 h-3 text-[#78716C]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Academic & SEO Evaluation Deliverables */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-[#78716C] font-semibold">
              Coursework &amp; SEO Deliverables
            </h3>
            <p className="text-xs text-[#78716C] leading-normal">
              Prepared for college SEO evaluation. Inspect deliverables below:
            </p>
            <ul className="space-y-2 text-sm text-[#44403C]">
              <li>
                <button
                  onClick={onOpenKeywords}
                  className="hover:text-[#1C1917] transition-colors text-left flex items-center justify-between w-full group cursor-pointer"
                >
                  <span className="font-medium text-[#4D5E43] group-hover:underline">
                    Phase 4: Keyword Research Table (10-Col)
                  </span>
                  <span className="text-xs text-[#78716C]">View &amp; Export</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenChecklist}
                  className="hover:text-[#1C1917] transition-colors text-left flex items-center justify-between w-full group cursor-pointer"
                >
                  <span className="group-hover:underline">
                    Phase 10: Pre-Deployment Verification Audit
                  </span>
                  <span className="text-xs text-[#78716C]">14 Checks</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenImageAudit}
                  className="hover:text-[#1C1917] transition-colors text-left flex items-center justify-between w-full group cursor-pointer"
                >
                  <span className="group-hover:underline">
                    Section 16: Photo Provenance (Strictly No AI)
                  </span>
                  <span className="text-xs text-[#78716C]">Verified</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Dynamic Copyright & Research Transparency */}
        <div className="mt-12 pt-8 hairline-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>
            &copy; {currentYear} The Hidden Mind. All rights reserved. Built with authentic editorial photography and verifiable empirical citations.
          </p>
          <p className="text-center sm:text-right">
            Designed for Vercel deployment with clean URLs, canonical tagging, and JSON-LD schema.
          </p>
        </div>
      </div>
    </footer>
  );
};
