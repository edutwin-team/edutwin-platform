import type { UserUpdateData } from '../../context/AuthContext';
import api from '../axios';

export type RegisterData = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  birthdate?: string;
  educational_profile?: {
    school: string;
    diploma?: string;
    institution_type?: string;
    education_level?: string;
    experience_years?: number;
  };
};

export type LoginData = {
  email: string;
  password: string;
};

export const register = (data: RegisterData) => {
  return api.post('auth/register/', data);
};

export const login = (data: LoginData) => {
  return api.post('auth/login/', data);
};

export const logout = () => {
  return api.post('auth/logout/');
};

export const getMe = () => {
  return api.get('auth/me/');
};
export const updateMe = (data: UserUpdateData) => {
  return api.put('auth/me/', data);
};
