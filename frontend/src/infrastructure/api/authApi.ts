import type { AuthResponse, LoginDTO, RegisterDTO } from '../../domain/services/IAuthService';
import { apiClient } from './client';

export const authApi = {
  login: async (credentials: LoginDTO): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterDTO): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
};