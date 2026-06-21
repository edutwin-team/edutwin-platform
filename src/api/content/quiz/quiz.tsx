import type { Quiz } from '../../../types/types';
import api from '../../axios';

/**
 * Backend = /quizzes/
 */

export const getQuizzes = async (): Promise<Quiz[]> => {
  const response = await api.get('content/quizzes/');
  return response.data;
};

export const getQuiz = async (id: number): Promise<Quiz> => {
  const response = await api.get(`content/quizzes/${id}/`);
  return response.data;
};

export const createQuiz = async (data: Quiz) => {
  const response = await api.post('content/quizzes/', data);
  return response.data;
};

export const updateQuiz = async (id: number, data: Quiz) => {
  const response = await api.put(`content/quizzes/${id}/`, data);
  return response.data;
};

export const deleteQuiz = async (id: number) => {
  const response = await api.delete(`content/quizzes/${id}/`);
  return response.data;
};

//todo : a voir si on garde ca
export const submitQuiz = async (
  quizId: number,
  data: {
    answers: {
      question_id: number;
      answer_id: number;
    }[];
  }
) => {
  const response = await api.post(`content/quizzes/${quizId}/submit/`, data);
  return response.data;
};
