import { IAuthService } from '../../domain/services/IAuthService';
import { User } from '../../domain/entities/User';
import { PasswordService } from '../auth/PasswordService';
import { JwtService } from '../auth/JwtService';

export class AuthService implements IAuthService {
  private passwordService: PasswordService;
  private jwtService: JwtService;

  constructor() {
    this.passwordService = new PasswordService();
    this.jwtService = new JwtService();
  }

  async hashPassword(password: string): Promise<string> {
    return this.passwordService.hashPassword(password);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return this.passwordService.comparePassword(password, hashedPassword);
  }

  generateToken(user: User): string {
    return this.jwtService.generateToken(user);
  }

  verifyToken(token: string): any {
    return this.jwtService.verifyToken(token);
  }
}