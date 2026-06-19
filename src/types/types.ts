//todo : seperate these type in diffrent files
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

export type Behavior = {
  id?: number;
  comprehension_level: number;
  motivation: number;
  learning_speed: number;
  error_rate: number;
  learning_style: string;
  fatigue_level: number;
  attention_level: number;
  stress_level: number;
  curiosity_level: number;
  autonomy_level: number;
  persistence_level: number;
  memory_retention: number;
  preferred_content_type: string;
  question_frequency: number;
  comment?: string;
};

export type DigitalTwin = {
  id: number;
  name: string;
  description: string;
  age: number;
  average_grade: number;
  context_name: string;
  context: number;
  behavior: Behavior;
};
