import React, { useState } from 'react';
import { KEYWORD_RESEARCH_DATA } from '../data/keywords';
import { X, Copy, Check, Download, ExternalLink, Info } from 'lucide-react';

interface KeywordResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeywordResearchModal: React.FC<KeywordResearchModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const generateMarkdown = () => {
    const headers = [
      'Page',
      'Proposed URL',
      'Primary Keyword',
      'Secondary Keyword 1',
      'Secondary Keyword 2',
      'Search Intent',
      'Monthly Search Volume',
      'Keyword Difficulty',
      'Research Source and Date',
      'Question the Page Answers',
    ];
    let md = `| ${headers.join(' | ')} |\n| ${headers.map(() => '---').join(' | ')} |\n`;
    KEYWORD_RESEARCH_DATA.forEach((item) => {
      md += `| ${item.pageName} | ${item.proposedUrl} | ${item.primaryKeyword} | ${item.secondaryKeyword1} | ${item.secondaryKeyword2} | ${item.searchIntent} | ${item.monthlySearchVolume} | ${item.keywordDifficulty} | ${item.researchSourceAndDate} | ${item.questionAnswers} |\n`;
    });
    return md;
  };

  const generateTSV = () => {
    const headers = [
      'Page',
      'Proposed URL',
      'Primary Keyword',
      'Secondary Keyword 1',
      'Secondary Keyword 2',
      'Search Intent',
      'Monthly Search Volume',
      'Keyword Difficulty',
      'Research Source and Date',
      'Question the Page Answers',
    ];
    let tsv = headers.join('\t') + '\n';
    KEYWORD_RESEARCH_DATA.forEach((item) => {
      tsv += `${item.pageName}\t${item.proposedUrl}\t${item.primaryKeyword}\t${item.secondaryKeyword1}\t${item.secondaryKeyword2}\t${item.searchIntent}\t${item.monthlySearchVolume}\t${item.keywordDifficulty}\t${item.researchSourceAndDate}\t${item.questionAnswers}\n`;
    });
    return tsv;
  };

  const downloadCSV = () => {
    const headers = [
      'Page',
      'Proposed URL',
      'Primary Keyword',
      'Secondary Keyword 1',
      'Secondary Keyword 2',
      'Search Intent',
      'Monthly Search Volume',
      'Keyword Difficulty',
      'Research Source and Date',
      'Question the Page Answers',
    ];
    let csv = headers.map((h) => `"${h}"`).join(',') + '\n';
    KEYWORD_RESEARCH_DATA.forEach((item) => {
      csv += [
        item.pageName,
        item.proposedUrl,
        item.primaryKeyword,
        item.secondaryKeyword1,
        item.secondaryKeyword2,
        item.searchIntent,
        item.monthlySearchVolume,
        item.keywordDifficulty,
        item.researchSourceAndDate,
        item.questionAnswers,
      ]
        .map((cell) => `"${cell.replace(/"/g, '""')}"`)
        .join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'the_hidden_mind_keyword_research.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] max-w-6xl w-full max-h-[90vh] overflow-y-auto hairline-border shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-6 hairline-b flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#4D5E43] font-semibold">
              <span>Phase 4 Deliverable</span>
              <span aria-hidden="true">·</span>
              <span>SEO Coursework Deliverable</span>
            </div>
            <h2 className="text-2xl font-editorial-serif font-medium text-[#1C1917] mt-1">
              Keyword Research Planning Table
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

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Academic Integrity & Methodology Notice */}
          <div className="p-4 bg-[#F3EFEA] hairline-border text-xs text-[#44403C] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
              <Info className="w-4 h-4 text-[#4D5E43]" />
              <span>Keyword Research Integrity Notice</span>
            </div>
            <p>
              In strict accordance with Phase 4 guidelines, search volume and keyword difficulty metrics are
              transparently marked as <strong className="text-[#1C1917]">"Needs external verification"</strong> rather than
              fabricating plausible-sounding numbers. For your college submission, enter these target phrases into
              Google Keyword Planner, Ahrefs, or Semrush to collect live volume ranges for your chosen regional market.
            </p>
          </div>

          {/* Action Export Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => copyToClipboard(generateTSV(), 'tsv')}
              className="px-3.5 py-2 text-xs font-medium uppercase tracking-wider bg-white hairline-border hover:bg-stone-50 text-[#1C1917] flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copiedType === 'tsv' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'tsv' ? 'Copied TSV to Clipboard!' : 'Copy TSV (Paste to Excel / Google Sheets)'}</span>
            </button>
            <button
              onClick={() => copyToClipboard(generateMarkdown(), 'md')}
              className="px-3.5 py-2 text-xs font-medium uppercase tracking-wider bg-white hairline-border hover:bg-stone-50 text-[#1C1917] flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copiedType === 'md' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'md' ? 'Copied Markdown!' : 'Copy Markdown Table'}</span>
            </button>
            <button
              onClick={downloadCSV}
              className="px-3.5 py-2 text-xs font-medium uppercase tracking-wider bg-[#4D5E43] text-white hover:bg-[#374430] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .CSV File</span>
            </button>
          </div>

          {/* 10-Column Responsive Table */}
          <div className="overflow-x-auto hairline-border bg-white">
            <table className="w-full text-left text-xs text-[#1C1917] border-collapse">
              <thead>
                <tr className="bg-[#F3EFEA] text-[#78716C] uppercase tracking-wider font-semibold hairline-b">
                  <th className="p-3 border-r hairline-border">Page</th>
                  <th className="p-3 border-r hairline-border">Proposed URL</th>
                  <th className="p-3 border-r hairline-border font-bold text-[#1C1917]">Primary Keyword</th>
                  <th className="p-3 border-r hairline-border">Secondary Keyword 1</th>
                  <th className="p-3 border-r hairline-border">Secondary Keyword 2</th>
                  <th className="p-3 border-r hairline-border">Search Intent</th>
                  <th className="p-3 border-r hairline-border">Monthly Volume</th>
                  <th className="p-3 border-r hairline-border">Keyword Difficulty</th>
                  <th className="p-3 border-r hairline-border">Research Source &amp; Date</th>
                  <th className="p-3">Question Answers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {KEYWORD_RESEARCH_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                    <td className="p-3 font-semibold border-r hairline-border whitespace-nowrap">{row.pageName}</td>
                    <td className="p-3 font-mono text-[11px] text-[#4D5E43] border-r hairline-border whitespace-nowrap">
                      {row.proposedUrl}
                    </td>
                    <td className="p-3 font-medium text-[#1C1917] bg-[#FAF8F5] border-r hairline-border">
                      {row.primaryKeyword}
                    </td>
                    <td className="p-3 border-r hairline-border text-[#44403C]">{row.secondaryKeyword1}</td>
                    <td className="p-3 border-r hairline-border text-[#44403C]">{row.secondaryKeyword2}</td>
                    <td className="p-3 border-r hairline-border whitespace-nowrap">{row.searchIntent}</td>
                    <td className="p-3 border-r hairline-border italic text-stone-500 whitespace-nowrap">
                      {row.monthlySearchVolume}
                    </td>
                    <td className="p-3 border-r hairline-border italic text-stone-500 whitespace-nowrap">
                      {row.keywordDifficulty}
                    </td>
                    <td className="p-3 border-r hairline-border text-[11px] text-stone-600">
                      {row.researchSourceAndDate}
                    </td>
                    <td className="p-3 font-reading-prose text-[13px] leading-snug min-w-[280px]">
                      {row.questionAnswers}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Student Explanation Guide */}
          <div className="p-4 bg-white hairline-border space-y-2 text-xs text-[#44403C]">
            <h4 className="font-semibold text-sm text-[#1C1917]">How to Explain This to Your Professor:</h4>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>
                <strong>Search Intent is Informational:</strong> Readers seeking psychological topics are looking for explanations of phenomena they have personally observed or studied, not commercial transactions.
              </li>
              <li>
                <strong>Long-Tail Phrasing:</strong> Primary keywords (e.g. <em>"why people resist changing their beliefs"</em>) reflect natural question-led search queries that align directly with Answer Engine Optimization (AEO) and conversational search engines.
              </li>
              <li>
                <strong>No Keyword Stuffing:</strong> Secondary keywords were chosen to complement semantic relevance in H2 headings and body prose rather than forcing verbatim repetitions.
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 hairline-t bg-[#F3EFEA] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-[#1C1917] text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Close Table
          </button>
        </div>
      </div>
    </div>
  );
};
