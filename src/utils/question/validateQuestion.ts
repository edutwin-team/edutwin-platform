import { type Question, QuestionType } from '../../types';

export function getQuestionError(question: Question): string | null {
  if (question.text.trim().length === 0) return 'La question est obligatoire.';
  if (question.answers.length < 2) return 'Ajoutez au moins 2 réponses.';
  if (question.answers.some((a) => a.text.trim().length === 0))
    return 'Toutes les réponses doivent être remplies.';

  const correctAnswersCount = question.answers.filter((a) => a.is_correct).length;
  const normalizedAnswers = question.answers.map((a) => a.text.trim().toLowerCase());
  const hasVrai = normalizedAnswers.includes('vrai');
  const hasFaux = normalizedAnswers.includes('faux');

  if (question.question_type === QuestionType.true_false) {
    if (question.answers.length !== 2)
      return 'Le vrai/faux doit contenir exactement deux réponses.';
    if (!(hasVrai && hasFaux)) return 'Les réponses doivent être « Vrai » et « Faux ».';
    if (correctAnswersCount !== 1) return 'Le vrai/faux doit contenir une seule réponse correcte.';
  }

  if (question.question_type === QuestionType.multiple_choice) {
    if (correctAnswersCount < 2)
      return 'Pour un choix multiple, sélectionnez au moins deux réponses correctes.';
  }

  if (question.question_type === QuestionType.single_choice) {
    if (correctAnswersCount !== 1)
      return 'Pour un choix unique, une seule réponse correcte est requise.';
  }

  return null;
}
