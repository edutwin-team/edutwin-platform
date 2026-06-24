//todo : seperate these type in diffrent files
//todo: now we have id? not best solution we need to seperate types between get types and dto backend types exp : Quiz (GET) CreateQuizDto (POST) UpdateQuizDto (PATCH)
export type QuizService = {
  getAll: () => Promise<Quiz[]>;
  getById: (id: number) => Promise<Quiz>;
};

export const ContentSourceType = {
  MANUAL: 'manual',
  IMPORT_FILE: 'import_file',
} as const;

export type ContentSourceType = (typeof ContentSourceType)[keyof typeof ContentSourceType];

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
  order_index: number;
  answers: Answer[];
};

export type Answer = {
  id?: number;
  text: string;
  is_correct?: boolean; // optionnel — masqué côté student
  order_index: number;
};

//AS CONST replaces backend models type variants
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

export type Objective = {
  id?: number;
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
  id?: number;
  name: string;
  description: string;
  age: number;
  average_grade: number;
  context_name: string;
  context: number;
  behavior: Behavior;
};

export type DashboardCounts = {
  contexts: number;
  twins: number;
  quizzes: number;
  simulations: number;
};

export type WeeklySimulation = {
  day: string;
  count: number;
};

export type LastTwin = {
  id: number;
  name: string;
  description: string | null;
  average_grade: number;
};

export type DashboardResponse = {
  counts: DashboardCounts;
  last_7_days_total: number;
  weekly_simulations: WeeklySimulation[];
  last_twins: LastTwin[];
};
