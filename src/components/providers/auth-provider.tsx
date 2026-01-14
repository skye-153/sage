'use client';

import { useState, useEffect } from 'react';
import { AuthContext } from '@/hooks/use-auth';
import { initializeStorage } from '@/lib/localStorage';


type AuthProviderProps = {
  children: React.ReactNode;
};

type User = {
  id: string;
  email: string;
  isAdmin: boolean;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize localStorage on client side
    initializeStorage();
    
    // All users are considered "logged in" for this app
    // since there's no backend authentication
    setUser(null);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
