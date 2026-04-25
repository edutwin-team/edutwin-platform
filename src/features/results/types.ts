import type { RecommendationGroup } from '../../components/recommendations/RecommendationPanel';

export type ResultsKpi = {
  title: string;
  value: string;
  subtitle: string;
  description: string;
  progress?: number;
  tags?: string[];
};

export type FeedbackBlock = {
  title: string;
  description: string;
};

export type ResultsPageData = {
  heading: string;
  description: string;
  kpis: {
    successRate: ResultsKpi;
    acquiredSkills: ResultsKpi;
    improvementTracks: ResultsKpi;
  };
  feedbackBlocks: FeedbackBlock[];
  recommendations: RecommendationGroup[];
};
