import { DifficultyLevel, QuestionType, type Question } from '../../types';

export const emptyQuestion = (): Question => ({
  text: '',
  question_type: QuestionType.single_choice,
  difficulty_level: DifficultyLevel.medium,

  answers: [
    {
      text: '',
      is_correct: false,
    },

    {
      text: '',
      is_correct: false,
    },
  ],
});
