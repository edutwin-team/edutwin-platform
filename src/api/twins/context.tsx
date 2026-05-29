import api from '../axios';

export type Objective = {
  id?: number;
  label: string;
};

export type PedagogicalContext = {
  id?: number;
  name: string;
  subject: string;
  level: string;
  school: string;
  country: string;
  academic_year: string;
  description: string;
  objectives: Objective[];
};

export const getContexts = async () => {
  const response = await api.get('twins/contexts/');
  return response.data;
};

export const getContext = async (id: number) => {
  const response = await api.get(`twins/contexts/${id}/`);
  return response.data;
};

export const createContext = async (data: PedagogicalContext) => {
  const response = await api.post('twins/contexts/', data);
  return response.data;
};

export const updateContext = async (id: number, data: PedagogicalContext) => {
  const response = await api.put(`twins/contexts/${id}/`, data);
  return response.data;
};

export const deleteContext = async (id: number) => {
  const response = await api.delete(`twins/contexts/${id}/`);
  return response.data;
};
