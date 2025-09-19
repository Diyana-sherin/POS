import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'User not authenticated' });
        return;
      }

      if (!allowedRoles.includes(req.user.role)) {
        res.status(403).json({ success: false, message: 'Access denied' });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
};
