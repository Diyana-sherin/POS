import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IAuthService } from '../../../domain/services/IAuthService';
import { User } from '../../../domain/entities/User';
import { LoginDTO } from '../../dto/LoginDTO';

export class LoginUser {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  async execute(loginData: LoginDTO): Promise<{ user: User; token: string }> {
    // Find user by email
    const user = await this.userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await this.authService.comparePassword(
      loginData.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.authService.generateToken(user);

    return { user, token };
  }
}