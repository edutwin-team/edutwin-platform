import { useMe } from '../hooks/user/useMe';
import { AuthContext } from './AuthContext';
import type { ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useMe();

  return (
    <AuthContext.Provider
      value={{
        user: data ?? null,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
