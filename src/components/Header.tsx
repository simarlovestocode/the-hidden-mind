import React, { useState } from 'react';
import { Menu, X, BookOpen, Search, ShieldCheck, Camera } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenKeywords: () => void;
  onOpenChecklist: () => void;
  onOpenImageAudit: () => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenKeywords,
  onOpenChecklist,
  onOpenImageAudit,
  onOpenAbout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md hairline-b transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark (Display Serif, 1 line, no clutter) */}
          <div className="shrink-0 flex items-center">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="text-2xl sm:text-3xl font-editorial-serif tracking-tight font-medium text-[#1C1917] hover:text-[#4D5E43] transition-colors whitespace-nowrap"
            >
              The Hidden Mind
            </a>
          </div>

          {/* Zone 2: Navigation Links (Clean single-line text links) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#44403C]">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className={`transition-colors hover:text-[#1C1917] whitespace-nowrap ${
                currentPath === '/' ? 'text-[#1C1917] font-semibold underline underline-offset-8 decoration-[#4D5E43]' : ''
              }`}
            >
              Home
            </a>
            <a
              href="/#articles"
              onClick={(e) => {
                e.preventDefault();
                if (currentPath !== '/') {
                  onNavigate('/');
                  setTimeout(() => {
                    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="transition-colors hover:text-[#1C1917] whitespace-nowrap"
            >
              Articles
            </a>
            <button
              onClick={onOpenAbout}
              className="transition-colors hover:text-[#1C1917] whitespace-nowrap text-left cursor-pointer"
            >
              About &amp; Standards
            </button>
            <button
              onClick={onOpenKeywords}
              className="transition-colors hover:text-[#1C1917] text-[#4D5E43] font-medium whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
              title="SEO Deliverable: Keyword Research Table"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Keyword Research</span>
            </button>
            <button
              onClick={onOpenChecklist}
              className="transition-colors hover:text-[#1C1917] whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
              title="SEO Deliverable: Pre-Deployment Audit"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SEO Audit</span>
            </button>
            <button
              onClick={onOpenImageAudit}
              className="transition-colors hover:text-[#1C1917] text-stone-500 hover:text-stone-900 whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
              title="Editorial Photography Provenance"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photo Provenance</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href="/#articles"
              onClick={(e) => {
                e.preventDefault();
                if (currentPath !== '/') {
                  onNavigate('/');
                  setTimeout(() => {
                    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#4D5E43] hover:bg-[#374430] transition-colors whitespace-nowrap rounded-sm"
            >
              Explore Research
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1C1917] hover:text-[#4D5E43] transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] hairline-b px-4 pt-3 pb-6 space-y-3">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className={`block py-2 text-base font-medium ${
              currentPath === '/' ? 'text-[#4D5E43] font-semibold' : 'text-[#1C1917]'
            }`}
          >
            Home
          </a>
          <a
            href="/#articles"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              if (currentPath !== '/') {
                onNavigate('/');
                setTimeout(() => {
                  document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="block py-2 text-base font-medium text-[#1C1917]"
          >
            All Articles
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAbout();
            }}
            className="block w-full text-left py-2 text-base font-medium text-[#1C1917]"
          >
            About &amp; Research Standards
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenKeywords();
            }}
            className="block w-full text-left py-2 text-base font-medium text-[#4D5E43]"
          >
            Keyword Research Table (SEO Plan)
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenChecklist();
            }}
            className="block w-full text-left py-2 text-base font-medium text-[#1C1917]"
          >
            Pre-Deployment Verification Checklist
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenImageAudit();
            }}
            className="block w-full text-left py-2 text-base font-medium text-stone-600"
          >
            Photo Provenance &amp; Verification (No AI)
          </button>
        </div>
      )}
    </header>
  );
};
