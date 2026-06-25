import type { RecommendationGroup } from '../../components/recommendations/RecommendationPanel';

export type TeacherKpi = {
  title: string;
  value: string;
  subtitle: string;
  description: string;
  progress?: number;
  stars?: number;
};

export type TeacherActionStep = {
  title: string;
  description: string;
};

export type TeacherPageData = {
  heading: string;
  description: string;
  kpis: {
    studentPerformance: TeacherKpi;
    questionQuality: TeacherKpi;
    contentAdjustment: TeacherKpi;
  };
  actionSteps: TeacherActionStep[];
  recommendations: RecommendationGroup[];
};
