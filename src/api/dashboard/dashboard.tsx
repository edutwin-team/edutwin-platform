import type { DashboardResponse } from '../../types/types';
import api from '../axios';

export const getDashboard = async (): Promise<DashboardResponse> => {
  const { data } = await api.get('/dashboard/');
  return data;
};
