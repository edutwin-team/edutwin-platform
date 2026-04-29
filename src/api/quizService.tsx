import { type Quiz } from '../types/types';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;

export const quizService = {
  getAll: async (): Promise<Quiz[]> => {
    const res = await fetch(`${BASE_URL}/content/quizzes/`, {
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Erreur fetch quizzes');
    return res.json();
  },

  getById: async (id: number): Promise<Quiz> => {
    const res = await fetch(`${BASE_URL}/content/quizzes/${id}/`, {
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Erreur fetch quiz');
    return res.json();
  },
};
