import React, { useState } from 'react';
import { PRE_DEPLOYMENT_CHECKLIST } from '../data/keywords';
import { X, CheckCircle2, AlertCircle, Copy, Check, Download } from 'lucide-react';

interface VerificationChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationChecklistModal: React.FC<VerificationChecklistModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const renderStatus = (status: 'Passed' | 'Failed' | 'Requires manual verification') => {
    if (status === 'Passed') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" /> Passed
        </span>
      );
    }
    if (status === 'Requires manual verification') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-200">
          <AlertCircle className="w-3 h-3" /> Manual Check
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 border border-rose-200">
        Failed
      </span>
    );
  };

  const copyMarkdownTable = () => {
    let md = `| Requirement | Homepage | Article 1 | Article 2 | Article 3 | Technical Verification Notes |\n`;
    md += `| --- | --- | --- | --- | --- | --- |\n`;
    PRE_DEPLOYMENT_CHECKLIST.forEach((item) => {
      md += `| ${item.requirement} | ${item.homepage} | ${item.article1} | ${item.article2} | ${item.article3} | ${item.notes} |\n`;
    });
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] max-w-5xl w-full max-h-[90vh] overflow-y-auto hairline-border shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 hairline-b flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#4D5E43] font-semibold">
              <span>Phase 10 Deliverable</span>
              <span aria-hidden="true">·</span>
              <span>Pre-Deployment Verification Matrix</span>
            </div>
            <h2 className="text-2xl font-editorial-serif font-medium text-[#1C1917] mt-1">
              SEO &amp; Content Audit Checklist
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-xs text-[#44403C] max-w-xl">
              This matrix validates all 14 technical and on-page SEO criteria across all four canonical pages.
              Copy this markdown table into your academic report.
            </p>
            <button
              onClick={copyMarkdownTable}
              className="px-4 py-2 text-xs font-medium uppercase tracking-wider bg-white hairline-border hover:bg-stone-50 text-[#1C1917] flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Markdown!' : 'Copy Markdown Checklist'}</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto hairline-border bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F3EFEA] text-[#78716C] uppercase tracking-wider font-semibold hairline-b">
                  <th className="p-3 border-r hairline-border">Requirement</th>
                  <th className="p-3 border-r hairline-border text-center">Homepage</th>
                  <th className="p-3 border-r hairline-border text-center">Article 1 (Beliefs)</th>
                  <th className="p-3 border-r hairline-border text-center">Article 2 (Spotlight)</th>
                  <th className="p-3 border-r hairline-border text-center">Article 3 (Exposure)</th>
                  <th className="p-3">Technical Verification Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-[#1C1917]">
                {PRE_DEPLOYMENT_CHECKLIST.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                    <td className="p-3 font-semibold border-r hairline-border whitespace-nowrap">
                      {row.requirement}
                    </td>
                    <td className="p-3 border-r hairline-border text-center whitespace-nowrap">
                      {renderStatus(row.homepage)}
                    </td>
                    <td className="p-3 border-r hairline-border text-center whitespace-nowrap">
                      {renderStatus(row.article1)}
                    </td>
                    <td className="p-3 border-r hairline-border text-center whitespace-nowrap">
                      {renderStatus(row.article2)}
                    </td>
                    <td className="p-3 border-r hairline-border text-center whitespace-nowrap">
                      {renderStatus(row.article3)}
                    </td>
                    <td className="p-3 text-[11px] text-stone-600 leading-relaxed min-w-[260px]">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 hairline-t bg-[#F3EFEA] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-[#1C1917] text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Close Audit Checklist
          </button>
        </div>
      </div>
    </div>
  );
};
