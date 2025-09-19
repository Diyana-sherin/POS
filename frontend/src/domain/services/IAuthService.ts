import type { User } from "../entities/User";


export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'employee';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface IAuthService {
  login(credentials: LoginDTO): Promise<AuthResponse>;
  register(userData: RegisterDTO): Promise<AuthResponse>;
  logout(): void;
  getCurrentUser(): User | null;
  getToken(): string | null;
  isAuthenticated(): boolean;
}
