import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
//import { validateRequest } from '../middleware/validationMiddleware';
//import { registerSchema, loginSchema } from '../validators/authValidator';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);

export { router as authRoutes };