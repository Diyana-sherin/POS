import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../../domain/entities/User';

type StringValue =
  | '10s' | '20s' | '30s' | '40s' | '50s' | '60s'
  | '1m' | '5m' | '10m' | '15m' | '30m'
  | '1h' | '2h' | '6h' | '12h' | '24h'
  | '1d' | '2d' | '7d' | '14d' | '30d'
  | '1y' | '2y';

export class JwtService {
  private secret: string;
  private expiresIn: StringValue;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'your-secret-key';
    this.expiresIn = (process.env.JWT_EXPIRES_IN as StringValue) || '7d';
  }

  generateToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const options: SignOptions = {
      expiresIn: this.expiresIn,
    };

    return jwt.sign(payload, this.secret, options);
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
