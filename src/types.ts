export interface Citation {
  id: string;
  author: string;
  year: number;
  title: string;
  source: string;
  doi?: string;
  url: string;
  verified: boolean;
  notes?: string;
}

export interface ImageRecord {
  articleSlug: string;
  pageTitle: string;
  assetUrl: string;
  thumbnailUrl: string;
  photographer: string;
  sourcePlatform: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  altText: string;
  width: number;
  height: number;
  aspectRatio: string;
  format: string;
  searchQuery: string;
  verifiedAuthentic: boolean;
}

export interface ArticleSection {
  heading: string;
  content: string[]; // array of paragraphs
  directAnswer?: string;
  pullQuote?: {
    text: string;
    attribution?: string;
  };
}

export interface Article {
  slug: string;
  path: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: [string, string];
  category: string;
  datePublished: string;
  dateModified: string;
  readTimeMinutes: number;
  wordCount: number;
  summary: string;
  directAnswer: string;
  heroImage: ImageRecord;
  sections: ArticleSection[];
  citations: Citation[];
  relatedSlugs: string[];
}

export interface KeywordResearchItem {
  pageName: string;
  proposedUrl: string;
  primaryKeyword: string;
  secondaryKeyword1: string;
  secondaryKeyword2: string;
  searchIntent: string;
  monthlySearchVolume: string;
  keywordDifficulty: string;
  researchSourceAndDate: string;
  questionAnswers: string;
}

export interface VerificationCheck {
  requirement: string;
  homepage: 'Passed' | 'Failed' | 'Requires manual verification';
  article1: 'Passed' | 'Failed' | 'Requires manual verification';
  article2: 'Passed' | 'Failed' | 'Requires manual verification';
  article3: 'Passed' | 'Failed' | 'Requires manual verification';
  notes: string;
}
