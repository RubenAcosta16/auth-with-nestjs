import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthInvalidCredentialsError } from '../domain/errors';
import { SECRET_JWT_KEY } from '../../shared/infraestructure/config';
import { User } from 'src/lib/User/domain/User';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

declare module 'express' {
  interface Request {
    user?: Pick<User, 'id' | 'name' | 'email' | 'role'>;
  }
}

const verifyToken = (token: string): jwt.JwtPayload => {
  try {
    if (!SECRET_JWT_KEY) {
      throw new BadRequestException('Secret JWT key is not defined');
    }

    return jwt.verify(token, SECRET_JWT_KEY) as jwt.JwtPayload;
  } catch {
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
};

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.access_token;

    if (!token) {
      throw new BadRequestException('Access denied: No token provided');
    }

    try {
      const decoded = verifyToken(token.token);
      const { id, name, email, role } = decoded;

      req.user = { id, name, email, role };

      next();
    } catch (error) {
      next(error);
    }
  }
}
