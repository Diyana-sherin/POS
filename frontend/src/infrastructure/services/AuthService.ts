import type { IAuthService, LoginDTO, RegisterDTO, AuthResponse } from '../../domain/services/IAuthService';
import  type { User } from '../../domain/entities/User';
import { authApi } from '../api/authApi';

export class AuthService implements IAuthService {
  async login(credentials: LoginDTO): Promise<AuthResponse> {
    try {
      const response = await authApi.login(credentials);
      
      if (response.success && response.data) {
        // Store user and token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async register(userData: RegisterDTO): Promise<AuthResponse> {
    try {
      const response = await authApi.register(userData);
      
      if (response.success && response.data) {
        // Store user and token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

   logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null && this.getCurrentUser() !== null;
  }
}