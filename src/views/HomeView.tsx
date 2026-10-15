import React, { useState } from 'react';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { ArrowDown, Scale, Search, ShieldCheck, HelpCircle } from 'lucide-react';
import { IMAGE_RECORDS } from '../data/imageRecords';

interface HomeViewProps {
  onNavigate: (path: string) => void;
  onOpenKeywords: () => void;
  onOpenChecklist: () => void;
  onOpenAbout: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenKeywords,
  onOpenChecklist,
  onOpenAbout,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  const topics = [
    { id: 'all', label: 'All Research' },
    { id: 'Cognitive Biases', label: 'Cognitive Biases' },
    { id: 'Social Psychology', label: 'Social Psychology' },
    { id: 'Decision-Making', label: 'Decision-Making' },
  ];

  const filteredArticles =
    selectedTopic === 'all'
      ? ARTICLES
      : ARTICLES.filter((art) => art.category === selectedTopic);

  const heroImage = IMAGE_RECORDS.homepageHero;

  return (
    <div className="space-y-24">
      {/* SECTION B: HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 hairline-b bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5] to-[#F5F2EB]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Editorial Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#4D5E43] font-semibold">
                <span>The Psychology of Human Behaviour</span>
                <span aria-hidden="true">·</span>
                <span>Volume 1</span>
              </div>

              {/* Single Clear H1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial-serif font-medium tracking-tight text-[#1C1917] leading-[1.12] text-balance">
                Why Do We Think, Believe, and Behave the Way We Do?
              </h1>

              <p className="text-lg sm:text-xl font-reading-prose text-[#44403C] leading-relaxed max-w-2xl">
                The human mind is governed by subtle cognitive mechanisms. Explore research-backed insights into{' '}
                <strong className="font-semibold text-[#1C1917]">human behaviour</strong>, discover how the{' '}
                <strong className="font-semibold text-[#1C1917]">psychology of human behaviour</strong> shapes everyday decisions, and understand the forces guiding{' '}
                <strong className="font-semibold text-[#1C1917]">human behaviour psychology</strong> in social life.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#articles"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#4D5E43] hover:bg-[#374430] transition-colors shadow-xs rounded-sm"
                >
                  <span>Explore the Research</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onOpenAbout}
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#1C1917] bg-white hairline-border hover:bg-stone-50 transition-colors rounded-sm cursor-pointer"
                >
                  Our Editorial Standard
                </button>
              </div>

              {/* Research Adjacency Strip */}
              <div className="pt-6 hairline-t grid grid-cols-3 gap-6 text-xs text-[#78716C]">
                <div>
                  <span className="block font-semibold text-[#1C1917] text-sm tabular-nums">100%</span>
                  <span>Verifiable Peer-Reviewed Citations</span>
                </div>
                <div>
                  <span className="block font-semibold text-[#1C1917] text-sm">Strictly Real</span>
                  <span>Authentic Photography (No AI)</span>
                </div>
                <div>
                  <span className="block font-semibold text-[#1C1917] text-sm">Long-Form</span>
                  <span>1,400+ Words Per Deep Analysis</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual - Authentic Curatorial Library Atmosphere */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] lg:aspect-[3/4] hairline-border overflow-hidden bg-[#F3EFEA] shadow-lg">
                <img
                  src={heroImage.assetUrl}
                  alt={heroImage.altText}
                  width={heroImage.width}
                  height={heroImage.height}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-xs">
                  <p className="font-editorial-serif text-sm italic font-medium leading-tight">
                    &ldquo;Understand the mind. Question your assumptions. See human behaviour differently.&rdquo;
                  </p>
                  <span className="text-[10px] text-white/80 block mt-1">
                    Photo: {heroImage.photographer} · Unsplash Editorial
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C & E: FEATURED ARTICLES & TOPIC EXPLORATION */}
      <section id="articles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 hairline-b pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#4D5E43] font-semibold">
              Curated Research Collection
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial-serif font-medium text-[#1C1917]">
              Featured Inquiries
            </h2>
            <p className="text-sm font-reading-prose text-[#44403C] max-w-xl">
              Each article is an evidence-grounded investigation into human cognition, drawing upon foundational experiments, modern replications, and clear practical analysis.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional segmented controls permitted by constitution) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F3EFEA] hairline-border">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t.id)}
                className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedTopic === t.id
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>

      {/* SECTION D: EDITORIAL INTRODUCTION ("Beyond the Obvious") */}
      <section className="bg-[#F3EFEA] hairline-t hairline-b py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <span className="text-xs uppercase tracking-widest text-[#4D5E43] font-semibold block">
            Editorial Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-medium text-[#1C1917] leading-tight">
            Beyond the Obvious
          </h2>
          <div className="text-base sm:text-lg font-reading-prose text-[#44403C] leading-relaxed space-y-4 max-w-3xl mx-auto text-left sm:text-center">
            <p>
              Human beings are storytellers by nature, quick to construct explanations for why we feel insecure in public, why our friends resist uncomfortable facts, or why we instinctively gravitate toward familiar faces. Too often, popular culture reduces these complex mental phenomena to simplistic catchphrases or unsupported self-help advice.
            </p>
            <p>
              <strong>The Hidden Mind</strong> exists to look beneath the surface. We examine the empirical research behind human beliefs, perception, decision-making, and social behaviour. By investigating the experimental paradigms of cognitive psychology—from Peter Wason’s counter-testing logic to Thomas Gilovich’s spotlight studies and Robert Zajonc’s mere-exposure investigations—we illuminate the hidden cognitive architecture that guides our daily lives.
            </p>
          </div>
        </div>
      </section>

      {/* AEO QUESTION & ANSWER SECTION: Direct Answers on Human Behaviour */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#4D5E43] font-semibold block">
            Key Questions &amp; Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial-serif font-medium text-[#1C1917]">
            Understanding Human Behaviour &amp; Psychology
          </h2>
          <p className="text-sm font-reading-prose text-[#44403C] max-w-2xl mx-auto">
            Direct, evidence-based answers explaining the foundational principles of human behaviour psychology.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white hairline-border p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#4D5E43]">
              <HelpCircle className="w-4 h-4" />
              <span>Core Psychological Mechanism</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-editorial-serif font-medium text-[#1C1917]">
              What Drives Human Behaviour in Everyday Decision-Making?
            </h3>
            <p className="text-sm sm:text-base font-reading-prose text-[#44403C] leading-relaxed">
              <strong>Direct Answer:</strong> Everyday human behaviour is guided by an evolutionary compromise between cognitive efficiency, identity protection, and social belonging. Rather than calculating optimal decisions through purely mathematical logic, the human brain relies on fast mental heuristics—such as confirmation bias, availability heuristics, and familiarity cues—to navigate complex environments without cognitive overload.
            </p>
          </div>

          <div className="bg-white hairline-border p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#4D5E43]">
              <HelpCircle className="w-4 h-4" />
              <span>Cognitive Architecture</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-editorial-serif font-medium text-[#1C1917]">
              How Does the Psychology of Human Behaviour Explain Biased Reasoning?
            </h3>
            <p className="text-sm sm:text-base font-reading-prose text-[#44403C] leading-relaxed">
              <strong>Direct Answer:</strong> The psychology of human behaviour demonstrates that biased reasoning is rarely caused by poor intelligence. Instead, mechanisms such as confirmation bias and motivated cognition protect our emotional coherence and community standing. When facts challenge deeply held worldviews, the nervous system often registers that contradiction as an ego threat, leading individuals to reject disconfirming data while unreservedly accepting agreeable narratives.
            </p>
          </div>

          <div className="bg-white hairline-border p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#4D5E43]">
              <HelpCircle className="w-4 h-4" />
              <span>Social Perception</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-editorial-serif font-medium text-[#1C1917]">
              Why Does Studying Human Behaviour Psychology Improve Everyday Judgement?
            </h3>
            <p className="text-sm sm:text-base font-reading-prose text-[#44403C] leading-relaxed">
              <strong>Direct Answer:</strong> Learning human behaviour psychology cultivates epistemic humility. By recognising the spotlight effect (how much we overestimate outside attention) and the mere exposure effect (how familiarity gets mistaken for trustworthiness), individuals can dismantle self-conscious illusions, critically evaluate repetitive messaging, and communicate more effectively during contentious disagreements.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION F: RESEARCH-FIRST STATEMENT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white hairline-border p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#FAF8F5] hairline-border text-[#4D5E43]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block">
                Scientific Integrity
              </span>
              <h2 className="text-2xl font-editorial-serif font-medium text-[#1C1917]">
                Our Research-First Standard
              </h2>
            </div>
          </div>

          <p className="text-sm font-reading-prose text-[#44403C] leading-relaxed">
            Psychological science is an evolving empirical discipline, not a catalogue of unchanging dogmas. In every article, The Hidden Mind aims to clearly distinguish between:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 bg-[#FAF8F5] hairline-border space-y-2">
              <span className="text-xs font-semibold text-[#4D5E43] uppercase tracking-wider block">
                01. Established Findings
              </span>
              <p className="text-xs text-[#44403C] leading-relaxed">
                Empirical effects replicated across multiple independent laboratories, sample demographics, and meta-analyses.
              </p>
            </div>
            <div className="p-5 bg-[#FAF8F5] hairline-border space-y-2">
              <span className="text-xs font-semibold text-[#4D5E43] uppercase tracking-wider block">
                02. Ongoing Debates
              </span>
              <p className="text-xs text-[#44403C] leading-relaxed">
                Active scientific controversies regarding effect sizes, boundary conditions, and replication limits (such as the backfire effect).
              </p>
            </div>
            <div className="p-5 bg-[#FAF8F5] hairline-border space-y-2">
              <span className="text-xs font-semibold text-[#4D5E43] uppercase tracking-wider block">
                03. Plausible Interpretations
              </span>
              <p className="text-xs text-[#44403C] leading-relaxed">
                Theoretical frameworks that offer compelling explanatory models while awaiting further empirical verification.
              </p>
            </div>
          </div>

          <p className="text-xs text-[#78716C] italic pt-2">
            Transparency statement: We do not claim that every published article has been independently peer-reviewed, nor do we claim to maintain an internal clinical research laboratory. We ground our work directly in publicly verifiable, published academic literature.
          </p>
        </div>
      </section>

      {/* PROFESSOR & SEO EVALUATION CALLOUT STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] hairline-border p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#4D5E43] font-semibold block">
              Assignment Deliverables
            </span>
            <h4 className="text-lg font-editorial-serif font-medium text-[#1C1917]">
              Evaluating SEO, On-Page Architecture &amp; Photography Provenance?
            </h4>
            <p className="text-xs text-[#78716C]">
              Access the complete keyword research matrix (10 columns) and pre-deployment verification checklist.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenKeywords}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-white hairline-border hover:bg-stone-50 text-[#1C1917] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#4D5E43]" />
              <span>Keyword Research (Phase 4)</span>
            </button>
            <button
              onClick={onOpenChecklist}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#4D5E43] text-white hover:bg-[#374430] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Audit Checklist (Phase 10)</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
