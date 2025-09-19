import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../infrastructure/services/AuthService';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      res.status(401).json({ success: false, message: 'No token provided' });
      return;
    }

    const authService = new AuthService();
    const decoded = authService.verifyToken(token);
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};