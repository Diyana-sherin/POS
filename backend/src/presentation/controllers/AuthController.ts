import { Request, Response } from 'express';
import { RegisterEmployee } from '../../application/use-cases/auth/RegisterEmployee';
import { LoginUser } from '../../application/use-cases/auth/LoginUser';
import { UserRepository } from '../../infrastructure/database/mongodb/repositories/UserRepository';
import { AuthService } from '../../infrastructure/services/AuthService';

export class AuthController {
  private registerEmployeeUseCase: RegisterEmployee;
  private loginUserUseCase: LoginUser;

  constructor() {
    const userRepository = new UserRepository();
    const authService = new AuthService();
    
    this.registerEmployeeUseCase = new RegisterEmployee(userRepository, authService);
    this.loginUserUseCase = new LoginUser(userRepository, authService);
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user, token } = await this.registerEmployeeUseCase.execute(req.body);
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Registration failed',
      });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user, token } = await this.loginUserUseCase.execute(req.body);
      
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        },
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || 'Login failed',
      });
    }
  };
}