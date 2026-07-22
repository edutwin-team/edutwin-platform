import { useMemo, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import {
  BookOpen,
  AlignLeft,
  Percent,
  Clock,
  Plus,
  Trash2,
  HelpCircle,
  CheckCircle,
} from 'lucide-react';

import {
  type Quiz,
  type Question,
  ContentSourceType,
  QuestionType,
  DifficultyLevel,
} from '../../../../types';

import { useCreateQuiz } from '../../../../hooks/content/quiz/useCreateQuiz';
import { useUpdateQuiz } from '../../../../hooks/content/quiz/useUpdateQuiz';
import { Input, TextArea } from '../../../ui/form/inputs';
import { SelectableCard } from '../../../ui/cards/SelectableCard';
import { emptyQuestion } from '../../../../utils/question/emptyQuestion';
import { getQuestionError } from '../../../../utils/question/validateQuestion';

type ManualQuizFormProps = {
  open: boolean;
  onClose: () => void;
  quiz?: Quiz | null;
  onBack?: () => void;
};

type QuizForm = Omit<Quiz, 'passing_score' | 'time_limit_minutes'> & {
  passing_score: number | null;
  time_limit_minutes: number | null;
};

const defaultQuizForm: QuizForm = {
  title: '',
  description: null,
  passing_score: 50,
  time_limit_minutes: 15,
  source_type: ContentSourceType.MANUAL,
  course: null,
  questions: [],
};

export function ManualQuizForm({ open, onClose, quiz, onBack }: ManualQuizFormProps) {
  const [step, setStep] = useState(1);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(
    quiz?.questions?.length ? 0 : null
  );

  const [form, setForm] = useState<QuizForm>(
    quiz
      ? {
          ...quiz,
          passing_score: quiz.passing_score ?? 50,
          time_limit_minutes: quiz.time_limit_minutes ?? 15,
        }
      : defaultQuizForm
  );

  const { mutate: createQuiz, isPending: creating } = useCreateQuiz({
    onSuccess: closeManualQuizForm,
  });

  const { mutate: updateQuiz, isPending: updating } = useUpdateQuiz({
    onSuccess: closeManualQuizForm,
  });

  const pending = creating || updating;

  const questionErrors = useMemo(
    () => form.questions.map((question) => getQuestionError(question)),
    [form.questions]
  );

  const canGoNext = useMemo(() => {
    if (step === 1) {
      return (
        form.title.trim() !== '' &&
        typeof form.passing_score === 'number' &&
        form.passing_score >= 0 &&
        form.passing_score <= 100 &&
        typeof form.time_limit_minutes === 'number' &&
        form.time_limit_minutes > 0
      );
    }

    if (step === 2) {
      return form.questions.length > 0 && questionErrors.every((error) => error === null);
    }

    return true;
  }, [form, questionErrors, step]);

  function closeManualQuizForm() {
    setStep(1);
    onClose();
  }

  function handleChange<K extends keyof QuizForm>(key: K, value: QuizForm[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function addQuestion() {
    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, emptyQuestion()],
    }));
    setSelectedQuestionIndex((prev) => (prev === null ? 0 : prev));
  }

  function removeQuestion(questionIndexToRemove: number) {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.filter(
        (_, questionIndex) => questionIndex !== questionIndexToRemove
      ),
    }));

    setSelectedQuestionIndex((prev) => {
      if (prev === null) return null;
      if (prev === questionIndexToRemove) return null;
      if (prev > questionIndexToRemove) return prev - 1;
      return prev;
    });
  }

  function updateQuestion(index: number, data: Partial<Question>) {
    setForm((prev) => ({
      ...prev,

      questions: prev.questions.map((question, i) =>
        i === index
          ? {
              ...question,
              ...data,
            }
          : question
      ),
    }));
  }

  function updateAnswer(
    targetQuestionIndex: number,
    targetAnswerIndex: number,
    data: Partial<Question['answers'][number]>
  ) {
    setForm((prev) => ({
      ...prev,

      questions: prev.questions.map((question, questionIndex) => {
        if (questionIndex !== targetQuestionIndex) return question;

        return {
          ...question,

          answers: question.answers.map((answer, answerIndex) =>
            answerIndex === targetAnswerIndex
              ? {
                  ...answer,
                  ...data,
                }
              : answer
          ),
        };
      }),
    }));
  }

  function addAnswer(targetQuestionIndex: number) {
    setForm((prev) => ({
      ...prev,

      questions: prev.questions.map((question, questionIndex) => {
        if (questionIndex !== targetQuestionIndex) return question;

        return {
          ...question,

          answers: [
            ...question.answers,
            {
              text: '',
              is_correct: false,
            },
          ],
        };
      }),
    }));
  }

  function removeAnswer(targetQuestionIndex: number, targetAnswerIndex: number) {
    setForm((prev) => ({
      ...prev,

      questions: prev.questions.map((question, questionIndex) => {
        if (questionIndex !== targetQuestionIndex) return question;

        return {
          ...question,

          answers: question.answers.filter((_, answerIndex) => answerIndex !== targetAnswerIndex),
        };
      }),
    }));
  }

  function submit() {
    const payload: Quiz = {
      ...form,
      passing_score: form.passing_score ?? 50,
      time_limit_minutes: form.time_limit_minutes ?? 15,
      description: form.description ?? null,
    } as Quiz;

    if (quiz?.id) {
      updateQuiz({
        id: quiz.id,
        data: payload,
      });
    } else {
      createQuiz(payload);
    }
  }

  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl max-h-[95vh]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">{quiz ? 'Modifier le quiz' : 'Créer un quiz'}</h2>

          <div className="flex items-center gap-2">
            {!quiz && (
              <button onClick={onBack} className="btn btn-sm btn-ghost">
                ← Importer un quiz
              </button>
            )}

            <button className="btn btn-sm btn-ghost" onClick={closeManualQuizForm}>
              <IoCloseSharp />
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded ${step >= s ? 'bg-primary' : 'bg-base-300'}`}
            />
          ))}
        </div>

        <div className="overflow-y-auto max-h-[75vh] pr-2 pb-4 min-h-0">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Titre du quiz <span className="text-error">*</span>
                  </span>
                </label>
                <Input
                  icon={BookOpen}
                  value={form.title}
                  placeholder="Ex. : Quiz de maths sur les fractions"
                  onChange={(value) => handleChange('title', value)}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <TextArea
                  icon={AlignLeft}
                  value={form.description ?? ''}
                  placeholder="Décrivez le quiz en quelques phrases"
                  onChange={(value) => handleChange('description', value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      Score de réussite (%) <span className="text-error">*</span>
                    </span>
                  </label>
                  <Input
                    icon={Percent}
                    type="number"
                    value={form.passing_score ?? ''}
                    placeholder="EX: 50"
                    onChange={(value) =>
                      handleChange('passing_score', value === '' ? null : Number(value))
                    }
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      Durée (minutes) <span className="text-error">*</span>
                    </span>
                  </label>
                  <Input
                    icon={Clock}
                    type="number"
                    value={form.time_limit_minutes ?? ''}
                    placeholder="EX: 15"
                    onChange={(value) =>
                      handleChange('time_limit_minutes', value === '' ? null : Number(value))
                    }
                  />
                </div>
              </div>

              {!canGoNext && (
                <p className="text-sm text-warning mt-1">
                  Remplissez tous les champs obligatoires pour passer à l’étape suivante.
                </p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">Questions</h3>
                  <p className="text-sm text-base-content/70">
                    Sélectionnez une question pour la modifier.
                  </p>
                </div>
                <button className="btn btn-outline btn-sm gap-2" onClick={addQuestion}>
                  <Plus size={16} /> Ajouter question
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4 min-h-0">
                <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-2">
                  {form.questions.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-base-300 p-6 text-center text-sm text-base-content/70">
                      <HelpCircle className="mx-auto mb-3 text-primary" size={28} />
                      Commencez par ajouter une question.
                    </div>
                  ) : (
                    form.questions.map((question, questionIndex) => (
                      <SelectableCard
                        key={questionIndex}
                        title={`Question ${questionIndex + 1}`}
                        description={question.text || 'Aucune question définie'}
                        selected={selectedQuestionIndex === questionIndex}
                        onClick={() => setSelectedQuestionIndex(questionIndex)}
                      >
                        <div className="text-xs text-base-content/60">
                          {question.answers.length} réponses •{' '}
                          {question.question_type === QuestionType.multiple_choice
                            ? 'Choix multiple'
                            : question.question_type === QuestionType.true_false
                              ? 'Vrai/Faux'
                              : 'Choix unique'}
                        </div>
                      </SelectableCard>
                    ))
                  )}
                </div>

                <div className="space-y-4 min-h-0">
                  {selectedQuestionIndex === null ? (
                    <div className="rounded-xl border border-dashed border-base-300 p-6 text-center text-sm text-base-content/70">
                      <HelpCircle className="mx-auto mb-3 text-primary" size={28} />
                      Choisissez une question dans la liste pour la modifier.
                    </div>
                  ) : (
                    <div className="border rounded-xl p-4 space-y-4 bg-base-100 max-h-[55vh] overflow-y-auto">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <h4 className="font-semibold">
                            Modifier la question {selectedQuestionIndex + 1}
                          </h4>
                          <p className="text-sm text-base-content/70">
                            Toutes les modifications sont enregistrées automatiquement.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="btn btn-error btn-sm gap-2"
                          onClick={() => removeQuestion(selectedQuestionIndex)}
                        >
                          <Trash2 size={14} /> Supprimer
                        </button>
                      </div>

                      <div className="space-y-3">
                        <label className="label">
                          <span className="label-text">
                            Intitulé <span className="text-error">*</span>
                          </span>
                        </label>
                        <Input
                          icon={BookOpen}
                          value={form.questions[selectedQuestionIndex].text}
                          placeholder="Rédigez la question"
                          onChange={(value) =>
                            updateQuestion(selectedQuestionIndex, { text: value })
                          }
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <select
                          className="select select-bordered"
                          value={form.questions[selectedQuestionIndex].question_type}
                          onChange={(e) =>
                            updateQuestion(selectedQuestionIndex, {
                              question_type: e.target.value as QuestionType,
                            })
                          }
                        >
                          <option value={QuestionType.single_choice}>Choix unique</option>
                          <option value={QuestionType.multiple_choice}>Choix multiple</option>
                          <option value={QuestionType.true_false}>Vrai/Faux</option>
                        </select>

                        <select
                          className="select select-bordered"
                          value={form.questions[selectedQuestionIndex].difficulty_level}
                          onChange={(e) =>
                            updateQuestion(selectedQuestionIndex, {
                              difficulty_level: e.target.value as DifficultyLevel,
                            })
                          }
                        >
                          <option value={DifficultyLevel.easy}>Facile</option>
                          <option value={DifficultyLevel.medium}>Moyen</option>
                          <option value={DifficultyLevel.hard}>Difficile</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        {form.questions[selectedQuestionIndex].answers.map(
                          (answer, answerIndex) => (
                            <div
                              key={answerIndex}
                              className="grid grid-cols-[auto_1fr_auto] items-center gap-2"
                            >
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="checkbox checkbox-primary"
                                  checked={answer.is_correct}
                                  onChange={(e) =>
                                    updateAnswer(selectedQuestionIndex, answerIndex, {
                                      is_correct: e.target.checked,
                                    })
                                  }
                                />
                                <span className="text-sm">Réponse correcte</span>
                              </label>

                              <Input
                                icon={AlignLeft}
                                value={answer.text}
                                placeholder={`Réponse ${answerIndex + 1}`}
                                onChange={(value) =>
                                  updateAnswer(selectedQuestionIndex, answerIndex, { text: value })
                                }
                              />

                              <button
                                type="button"
                                className="btn btn-error btn-sm"
                                onClick={() => removeAnswer(selectedQuestionIndex, answerIndex)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          )
                        )}

                        <button
                          type="button"
                          className="btn btn-sm btn-outline gap-2"
                          onClick={() => addAnswer(selectedQuestionIndex)}
                        >
                          <Plus size={16} /> Ajouter réponse
                        </button>
                      </div>

                      {questionErrors[selectedQuestionIndex] ? (
                        <p className="text-sm text-warning mt-2">
                          {questionErrors[selectedQuestionIndex]}
                        </p>
                      ) : (
                        <p className="text-sm text-success mt-2 flex items-center gap-2">
                          <CheckCircle size={14} /> Question prête
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <h3 className="font-bold">Résumé</h3>

              <p>Titre : {form.title || '—'}</p>
              <p>Description : {form.description || '—'}</p>
              <p>
                Score de réussite : {form.passing_score != null ? `${form.passing_score}%` : '—'}
              </p>
              <p>
                Durée :{' '}
                {form.time_limit_minutes != null ? `${form.time_limit_minutes} minutes` : '—'}
              </p>
              <p>Nombre de questions : {form.questions.length}</p>
            </div>
          )}
        </div>

        <div className="modal-action">
          {step > 1 && (
            <button className="btn" onClick={() => setStep(step - 1)}>
              Retour
            </button>
          )}

          {step < 3 ? (
            <button
              className="btn btn-primary"
              disabled={!canGoNext}
              onClick={() => canGoNext && setStep(step + 1)}
            >
              Suivant
            </button>
          ) : (
            <button className="btn btn-success" disabled={pending} onClick={submit}>
              {pending ? 'Sauvegarde...' : 'Enregistrer'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
