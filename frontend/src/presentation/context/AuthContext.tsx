import React, { createContext, useContext, ReactNode } from 'react';
import type { User } from '../../domain/entities/User';
import type { LoginDTO, RegisterDTO } from '../../domain/services/IAuthService';
import { useAuth } from '../../application/use-cases/useAuth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginDTO) => Promise<User>;
  register: (userData: RegisterDTO) => Promise<User>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};