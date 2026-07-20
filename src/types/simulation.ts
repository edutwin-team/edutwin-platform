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
