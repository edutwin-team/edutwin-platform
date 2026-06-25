import type { QuizSimulationResult, SimulateQuizPayload } from '../../types/types';
import api from '../axios';

export const simulateQuiz = async (data: SimulateQuizPayload): Promise<QuizSimulationResult> => {
  const response = await api.post('/simulation/quiz/', data);

  return response.data;
};
export const getSimulationHistory = async () => {
  const response = await api.get('/simulation/history/');

  return response.data;
};
