'use client';

import { useContext, createContext } from 'react';

export type AuthContextType = {
  user: any | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};
