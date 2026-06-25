//todo : seperate these type in diffrent files
//todo: now we have id? not best solution we need to seperate types between get types and dto backend types exp : Quiz (GET) CreateQuizDto (POST) UpdateQuizDto (PATCH)

//content types
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

//context types
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

//twins types
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

//dashboard types

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

//simulation types
export interface BehaviorSnapshot {
  comprehension_level: number;
  motivation: number;
  fatigue_level: number;
  attention_level?: number;
  memory_retention?: number;
  error_rate?: number;
  stress_level?: number;
  learning_speed?: number;
  learning_style?: string;
  curiosity_level?: number;
  persistence_level?: number;
  autonomy_level?: number;
}

export interface SimulateQuizPayload {
  twin_id: number;
  quiz_id: number;
}

export interface LLMAnswer {
  question_index: number;
  question_title?: string;
  chosen_index: number;
  reasoning: string;

  chosen_text?: string;
  correct_text?: string;

  is_correct?: boolean;
  is_valid_choice?: boolean;
}

export interface QuizSimulationResult {
  id: number;

  twin_id: number;
  twin_name: string;

  quiz_id: number;
  quiz_title: string;

  simulated_score: number;
  correct: number;
  total: number;

  simulated_time_seconds: number;
  passed: boolean;

  feedback: string;

  llm_answers?: LLMAnswer[];

  behavior_snapshot: BehaviorSnapshot;
}

export interface AnswerDetail {
  question_index: number;
  question_title: string;

  chosen_index: number;
  chosen_text: string;

  correct_text: string;

  reasoning: string;

  is_correct: boolean;
  is_valid_choice: boolean;
}

export interface SimulationHistoryItem {
  id: number;

  simulation_type: 'quiz' | 'course';

  twin_name: string;

  quiz_title?: string;
  course_title?: string;

  simulated_score: number;
  simulated_time_seconds: number;

  passed: boolean | null;
  correct: number | null;
  total: number | null;

  feedback: string;

  behavior_snapshot: BehaviorSnapshot;

  created_at: string;

  answer_details: AnswerDetail[];
}

// export interface CourseSimulationResult {
//   id: number;

//   twin_id: number;
//   twin_name: string;

//   course_id: number;
//   course_title: string;

//   simulated_score: number;
//   simulated_time_seconds: number;

//   feedback: string;

//   behavior_snapshot: BehaviorSnapshot;
// }
