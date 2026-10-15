import React from 'react';
import { X, BookOpen, Scale, Award, ShieldAlert } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] max-w-3xl w-full max-h-[90vh] overflow-y-auto hairline-border shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 hairline-b flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#4D5E43] font-semibold">
              Editorial Standards
            </span>
            <h2 className="text-2xl font-editorial-serif font-medium text-[#1C1917] mt-1">
              About The Hidden Mind
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-sm text-[#44403C] font-reading-prose leading-relaxed">
          {/* Mission */}
          <div className="space-y-3">
            <h3 className="text-lg font-editorial-serif font-medium text-[#1C1917]">
              Our Editorial Mission
            </h3>
            <p>
              <strong>The Hidden Mind</strong> explores the psychological mechanisms behind human beliefs,
              decisions, perceptions, social behaviour, and everyday judgements.
            </p>
            <p className="italic text-base text-[#1C1917] pl-4 border-l-2 border-[#4D5E43]">
              &ldquo;Understand the mind. Question your assumptions. See human behaviour differently.&rdquo;
            </p>
            <p>
              Our goal is to help readers recognize familiar experiences in daily life, understand the empirical
              psychological research behind them, question simplistic assumptions, and develop a more nuanced,
              compassionate understanding of why human beings act the way they do.
            </p>
          </div>

          <hr className="hairline-b" />

          {/* Research Transparency Standards */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#4D5E43] font-semibold">
              <Scale className="w-4 h-4" />
              <span>Research Standards &amp; Intellectual Honesty</span>
            </div>
            <h3 className="text-lg font-editorial-serif font-medium text-[#1C1917]">
              How We Treat Scientific Evidence
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs font-sans text-[#44403C]">
              <li>
                <strong>Distinguish Findings from Interpretations:</strong> We clearly differentiate between what an
                original experiment empirically observed and how researchers subsequently interpreted those results.
              </li>
              <li>
                <strong>Acknowledge Replication &amp; Limits:</strong> We do not treat a single laboratory experiment as
                conclusive proof of an immutable law. Where later meta-analyses or replications have clarified boundaries
                (e.g., the scarcity of the backfire effect demonstrated by Wood &amp; Porter 2019), we present those findings openly.
              </li>
              <li>
                <strong>No Fabricated Citations:</strong> Every paper cited includes real authors, dates, journal names, and
                stable DOI or publisher links.
              </li>
              <li>
                <strong>Proportionate Skepticism:</strong> Disagreement in human debate does not automatically imply that one
                party is irrational; reasoning can be shaped by differing moral foundations, lived experiences, and evidentiary standards.
              </li>
            </ul>
          </div>

          <hr className="hairline-b" />

          {/* Photography Ethics */}
          <div className="space-y-3">
            <h3 className="text-lg font-editorial-serif font-medium text-[#1C1917]">
              Strictly Authentic Editorial Photography
            </h3>
            <p className="text-xs font-sans">
              In an era saturated with synthetic imagery, <strong>The Hidden Mind strictly prohibits AI-generated images,
              synthetic portraits, and cartoon illustrations.</strong> Every visual asset on our site is an authentic
              photograph captured by real human photographers in natural environments, licensed through reputable editorial
              libraries with transparent photographer attribution.
            </p>
          </div>

          <hr className="hairline-b" />

          {/* Byline & Non-Clinical Disclaimer */}
          <div className="space-y-3 bg-[#F3EFEA] p-4 text-xs font-sans hairline-border">
            <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
              <ShieldAlert className="w-4 h-4 text-[#4D5E43]" />
              <span>Editorial Byline &amp; Educational Advisory</span>
            </div>
            <p>
              Articles are authored and curated under the publication byline <strong>The Hidden Mind Editorial Team</strong>.
              We do not fabricate individual academic degrees or clinical affiliations.
            </p>
            <p className="text-[#78716C]">
              <strong>Advisory:</strong> The Hidden Mind is strictly an educational publication focused on cognitive
              psychology, decision-making, and social science. Content is not intended to provide clinical diagnosis, psychiatric
              treatment, or professional mental health advice.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 hairline-t bg-[#F3EFEA] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-[#1C1917] text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
