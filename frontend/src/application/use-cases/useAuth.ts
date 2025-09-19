import { useState, useEffect } from 'react';
import { AuthService } from '../../infrastructure/services/AuthService';
import type { User } from '../../domain/entities/User';
import type { LoginDTO } from '../dto/LoginDTO';
import type { RegisterDTO } from '../dto/RegisterDTO';

const authService = new AuthService();

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = async (credentials: LoginDTO) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(credentials);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        return response.data.user;
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };


  const register = async (userData: RegisterDTO) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(userData);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        return response.data.user;
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
  };
};