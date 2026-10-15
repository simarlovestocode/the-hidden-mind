import React, { useState, useEffect } from 'react';
import { ARTICLES } from './data/articles';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ArticleView } from './views/ArticleView';
import { KeywordResearchModal } from './components/KeywordResearchModal';
import { VerificationChecklistModal } from './components/VerificationChecklistModal';
import { ImageProvenanceModal } from './components/ImageProvenanceModal';
import { AboutModal } from './components/AboutModal';
import { updatePageSEO } from './utils/seo';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Clean trailing slash unless root
    const path = window.location.pathname;
    return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  });

  const [keywordModalOpen, setKeywordModalOpen] = useState(false);
  const [checklistModalOpen, setChecklistModalOpen] = useState(false);
  const [imageAuditModalOpen, setImageAuditModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  // Handle URL navigation and popstate
  const navigate = (path: string) => {
    const cleanPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
    if (window.location.pathname !== cleanPath) {
      window.history.pushState({}, '', cleanPath);
    }
    setCurrentPath(cleanPath);
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const cleanPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
      setCurrentPath(cleanPath);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update Document Head, Canonical URL & Schema.org JSON-LD on route changes
  useEffect(() => {
    const matchedArticle = ARTICLES.find((a) => a.path === currentPath);

    if (matchedArticle) {
      updatePageSEO({
        title: matchedArticle.seoTitle,
        description: matchedArticle.metaDescription,
        path: matchedArticle.path,
        imageUrl: matchedArticle.heroImage.assetUrl,
        article: matchedArticle,
      });
    } else if (currentPath === '/' || currentPath === '') {
      updatePageSEO({
        path: '/',
      });
    } else {
      updatePageSEO({
        title: 'Page Not Found | The Hidden Mind',
        description: 'The requested psychology inquiry could not be found.',
        path: currentPath,
      });
    }
  }, [currentPath]);

  // Determine which page content to render
  const currentArticle = ARTICLES.find((a) => a.path === currentPath);
  const isHome = currentPath === '/' || currentPath === '';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] selection:bg-[#4D5E43]/20">
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenKeywords={() => setKeywordModalOpen(true)}
        onOpenChecklist={() => setChecklistModalOpen(true)}
        onOpenImageAudit={() => setImageAuditModalOpen(true)}
        onOpenAbout={() => setAboutModalOpen(true)}
      />

      <main className="flex-1">
        {isHome ? (
          <HomeView
            onNavigate={navigate}
            onOpenKeywords={() => setKeywordModalOpen(true)}
            onOpenChecklist={() => setChecklistModalOpen(true)}
            onOpenAbout={() => setAboutModalOpen(true)}
          />
        ) : currentArticle ? (
          <ArticleView
            article={currentArticle}
            onNavigate={navigate}
            onOpenImageAudit={() => setImageAuditModalOpen(true)}
          />
        ) : (
          /* 404 Fallback */
          <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
            <div className="w-12 h-12 mx-auto rounded-full bg-stone-200 flex items-center justify-center text-[#1C1917]">
              <AlertCircle className="w-6 h-6 text-[#78716C]" />
            </div>
            <h1 className="text-3xl font-editorial-serif font-medium text-[#1C1917]">
              Inquiry Not Found
            </h1>
            <p className="text-sm font-reading-prose text-[#44403C]">
              The page <code className="bg-stone-200 px-1 py-0.5 text-xs">{currentPath}</code> does not match any published articles in The Hidden Mind archive.
            </p>
            <div>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#4D5E43] text-white hover:bg-[#374430] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Publication Homepage</span>
              </a>
            </div>
          </div>
        )}
      </main>

      <Footer
        onNavigate={navigate}
        onOpenKeywords={() => setKeywordModalOpen(true)}
        onOpenChecklist={() => setChecklistModalOpen(true)}
        onOpenImageAudit={() => setImageAuditModalOpen(true)}
        onOpenAbout={() => setAboutModalOpen(true)}
      />

      {/* Deliverable Modals */}
      <KeywordResearchModal
        isOpen={keywordModalOpen}
        onClose={() => setKeywordModalOpen(false)}
      />
      <VerificationChecklistModal
        isOpen={checklistModalOpen}
        onClose={() => setChecklistModalOpen(false)}
      />
      <ImageProvenanceModal
        isOpen={imageAuditModalOpen}
        onClose={() => setImageAuditModalOpen(false)}
      />
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />
    </div>
  );
}
