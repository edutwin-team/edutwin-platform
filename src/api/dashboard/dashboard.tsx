import type { DashboardResponse } from '../../types';
import api from '../axios';

export const getDashboard = async (): Promise<DashboardResponse> => {
  const { data } = await api.get('/dashboard/');
  return data;
};
