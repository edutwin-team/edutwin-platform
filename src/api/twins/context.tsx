import type { Context } from '../../types/types';
import api from '../axios';

export const getContexts = async () => {
  const response = await api.get('twins/contexts/');
  return response.data;
};

export const getContext = async (id: number) => {
  const response = await api.get(`twins/contexts/${id}/`);
  return response.data;
};

export const createContext = async (data: Context) => {
  const response = await api.post('twins/contexts/', data);
  return response.data;
};

export const updateContext = async (id: number, data: Context) => {
  const response = await api.put(`twins/contexts/${id}/`, data);
  return response.data;
};

export const deleteContext = async (id: number) => {
  const response = await api.delete(`twins/contexts/${id}/`);
  return response.data;
};
