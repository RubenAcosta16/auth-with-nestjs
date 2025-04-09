import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthInvalidCredentialsError } from '../domain/errors';
import { SECRET_JWT_KEY } from '../../shared/config';
import { User } from 'src/lib/User/domain/User';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { roles } from 'src/lib/User/UserTypes';
import { UserRole } from 'src/lib/User/domain/Props/UserRole';

@Injectable()
export class AuthAdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new BadRequestException('User not authenticated');
      }

      if (req.user.role !== (roles.Admin as unknown as UserRole)) {
        throw new BadRequestException(
          'Access denied: Only admin can access this route',
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
