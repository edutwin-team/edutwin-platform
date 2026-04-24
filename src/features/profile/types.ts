export type SubjectScore = {
  label: string;
  value: string;
};

export type LearningPreference = {
  label: string;
};

export type DifficultyItem = {
  title: string;
  description: string;
  tone: "error" | "warning";
};

export type EvaluationHistoryRow = {
  title: string;
  date: string;
  score: string;
  trend: string;
  trendTone: "success" | "warning";
};

export type ProfilePageData = {
  heading: string;
  description: string;
  academic: {
    level: string;
    subtitle: string;
    scores: SubjectScore[];
  };
  preferences: {
    profileLabel: string;
    tags: LearningPreference[];
    description: string;
  };
  recurringDifficulties: DifficultyItem[];
  evaluationHistory: EvaluationHistoryRow[];
};
