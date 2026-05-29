export type DigitalTwin = {
  id: number;
  name: string;
  behavior: string;
  attention: number;
  absence: number;
};

export type QuizService = {
  getAll: () => Promise<Quiz[]>;
  getById: (id: number) => Promise<Quiz>;
};

export type Content = {
  id: number;
  title: string;
  content_type: ContentType;
  is_published: boolean;
  created_at: string;
  created_by: number;
};

export type Quiz = Content & {
  content_type: ContentType;
  passing_score: number;
  time_limit_minutes: number;
  questions: Question[];
};

export type Course = Content & {
  content_type: ContentType;
  description: string;
  body: string;
};

export type Question = {
  id: number;
  title: string;
  question_type: QuestionType;
  answers: Answer[];
};

export type Answer = {
  id: number;
  text: string;
  is_correct?: boolean; // optionnel — masqué côté student
};

//AS CONST replaces backend models type variants
export const QuestionType = {
  single_choice: 1,
  multiple_choice: 2,
  true_false: 3,
} as const;

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

export const ContentType = {
  course: 1,
  quiz: 2,
} as const;

export type ContentType = (typeof ContentType)[keyof typeof ContentType];

export type Objective = {
  id: number;
  label: string;
};

export type Context = {
  id: number;
  name: string;
  description: string;
  school: string;
  country: string;
  level: string;
  subject: string;
  academic_year: string;
  objectives: Objective[];
  twins: number;
};
