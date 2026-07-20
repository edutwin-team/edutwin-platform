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
