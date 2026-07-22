export const ContentSourceType = {
  MANUAL: 'manual',
  IMPORT_FILE: 'import_file',
} as const;

export type ContentSourceType = (typeof ContentSourceType)[keyof typeof ContentSourceType];

export type QuizService = {
  getAll: () => Promise<Quiz[]>;
  getById: (id: number) => Promise<Quiz>;
};

export type Quiz = {
  id?: number;
  title: string;
  description: string | null;
  passing_score: number;
  time_limit_minutes: number;
  source_type: ContentSourceType;
  course: number | null;
  questions: Question[];
  //todo add course here since we have 1:n relation with course
};

export type Course = {
  id?: number;
  title: string;
  description: string | null;
  content: string;
  source_type: ContentSourceType;
};

export type Question = {
  id?: number;
  text: string;
  question_type: QuestionType;
  difficulty_level: DifficultyLevel;
  answers: Answer[];
};

export type Answer = {
  id?: number;
  text: string;
  is_correct?: boolean;
};

export const QuestionType = {
  single_choice: 'single_choice',
  multiple_choice: 'multiple_choice',
  true_false: 'true_false',
} as const;

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

export const DifficultyLevel = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
} as const;

export type DifficultyLevel = (typeof DifficultyLevel)[keyof typeof DifficultyLevel];

export const ContentType = {
  course: 1,
  quiz: 2,
} as const;

export type ContentType = (typeof ContentType)[keyof typeof ContentType];
