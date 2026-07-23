import { useState } from 'react';

import { type Quiz, type Question, ContentSourceType } from '../../../types';

import { emptyQuestion } from '../../../utils/question/emptyQuestion';

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

export function useQuizForm(quiz?: Quiz | null) {
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

  return {
    form,
    setForm,

    selectedQuestionIndex,
    setSelectedQuestionIndex,

    handleChange,
    addQuestion,
    removeQuestion,
    updateQuestion,

    addAnswer,
    removeAnswer,
    updateAnswer,
  };
}
