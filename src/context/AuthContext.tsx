import { createContext } from 'react';

export type EducationalProfile = {
  school: string;
  diploma?: string;
  institution_type?: string;
  education_level?: string;
  experience_years?: number;
};

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture?: string | null;
  birthdate?: string | null;
  role: string;
  educational_profile?: EducationalProfile;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
