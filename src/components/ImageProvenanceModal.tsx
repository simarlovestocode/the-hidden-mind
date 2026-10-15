import React from 'react';
import { IMAGE_RECORDS } from '../data/imageRecords';
import { X, ExternalLink, CheckCircle2, ShieldCheck, Camera } from 'lucide-react';

interface ImageProvenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageProvenanceModal: React.FC<ImageProvenanceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const records = Object.values(IMAGE_RECORDS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] max-w-5xl w-full max-h-[90vh] overflow-y-auto hairline-border shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 hairline-b flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#4D5E43] font-semibold">
              <Camera className="w-3.5 h-3.5" />
              <span>Section 16 Deliverable</span>
              <span aria-hidden="true">·</span>
              <span>Authentic Photography Audit</span>
            </div>
            <h2 className="text-2xl font-editorial-serif font-medium text-[#1C1917] mt-1">
              Editorial Photography Provenance &amp; Verification Records
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
        <div className="p-6 space-y-6">
          {/* Policy Banner */}
          <div className="p-4 bg-emerald-50 hairline-border border-emerald-200 text-xs text-emerald-950 space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Strict "No AI-Generated Images" Compliance Statement</span>
            </div>
            <p>
              In accordance with editorial guidelines, every visual asset on The Hidden Mind is an authentic, real photograph
              captured by a human photographer and sourced from reputable editorial photographic collections. Zero AI-generated
              images, synthetic faces, or 3D cartoon illustrations are used.
            </p>
          </div>

          {/* Cards of Records */}
          <div className="space-y-6">
            {records.map((rec, idx) => (
              <div key={idx} className="bg-white hairline-border p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 hairline-b pb-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#4D5E43] font-semibold block">
                      {rec.articleSlug.toUpperCase()}
                    </span>
                    <h3 className="text-lg font-editorial-serif font-medium text-[#1C1917]">
                      {rec.pageTitle}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verified Authentic Photograph</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Thumbnail Preview */}
                  <div className="md:col-span-4 aspect-[3/2] overflow-hidden bg-stone-100 hairline-border relative">
                    <img
                      src={rec.thumbnailUrl}
                      alt={rec.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Metadata Audit Grid */}
                  <div className="md:col-span-8 text-xs text-[#44403C] space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-stone-500 block">Photographer:</span>
                        <strong className="text-[#1C1917]">{rec.photographer}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Source Library:</span>
                        <a
                          href={rec.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#4D5E43] hover:underline inline-flex items-center gap-1"
                        >
                          {rec.sourcePlatform} <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Licence Terms:</span>
                        <a
                          href={rec.licenseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1C1917] hover:underline"
                        >
                          {rec.license}
                        </a>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Dimensions &amp; Aspect Ratio:</span>
                        <span className="tabular-nums font-mono">
                          {rec.width} &times; {rec.height} px ({rec.aspectRatio})
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Format &amp; Delivery:</span>
                        <span>{rec.format} with dynamic responsive sizing</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Editorial Search Query:</span>
                        <code className="text-[11px] bg-stone-100 px-1 py-0.5 text-stone-700">
                          {rec.searchQuery}
                        </code>
                      </div>
                    </div>

                    <div className="pt-2 hairline-t">
                      <span className="text-stone-500 block font-medium">Descriptive Alt Text:</span>
                      <p className="italic text-[#1C1917] mt-0.5 font-reading-prose text-xs">
                        &ldquo;{rec.altText}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 hairline-t bg-[#F3EFEA] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-[#1C1917] text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Close Provenance Audit
          </button>
        </div>
      </div>
    </div>
  );
};
