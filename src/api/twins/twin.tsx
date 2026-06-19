import type { DigitalTwin } from '../../types/types';
import api from '../axios';

/**
 * Backend = /learners/
 * Frontend = twins (product abstraction)
 */

export const getTwins = async (): Promise<DigitalTwin[]> => {
  const response = await api.get('twins/learners/');
  return response.data;
};

export const getTwin = async (id: number): Promise<DigitalTwin> => {
  const response = await api.get(`twins/learners/${id}/`);
  return response.data;
};

export const createTwin = async (data: Partial<DigitalTwin>) => {
  const response = await api.post('twins/learners/', data);
  return response.data;
};

export const updateTwin = async (id: number, data: Partial<DigitalTwin>) => {
  const response = await api.put(`twins/learners/${id}/`, data);
  return response.data;
};

export const deleteTwin = async (id: number) => {
  const response = await api.delete(`twins/learners/${id}/`);
  return response.data;
};
