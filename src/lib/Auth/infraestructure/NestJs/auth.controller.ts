import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthLogin } from '../../application/AuthLogin';
import { UserError, UserNotFoundError } from 'src/lib/User/domain/errors';
import { AuthInvalidCredentialsError } from '../../domain/errors';
import { Login } from './Validations';
import { Create } from 'src/lib/User/infrastructure/NestJs/Validations';
import { AuthRegister } from '../../application/AuthRegister';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthLogin') private readonly authLogin: AuthLogin,
    @Inject('AuthRegister') private readonly authRegister: AuthRegister,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: Login, @Res() res: Response) {
    const token = await this.authLogin.run(email, password);

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60,
      })
      .json({
        token: token.token,
      });
  }

  @Post('register')
  async register(@Body() { email, password, id, name, role }: Create) {
    return await this.authRegister.run(name, email, password, role);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token').send();
  }

  @Get('protected')
  async protectedRoute(@Req() req: Request) {
    if (!req.user) {
      throw new BadRequestException('Access denied: User not authenticated');
    }

    return {
      data: {
        id: req.user.id,
        username: req.user.name,
        email: req.user.email,
      },
    };
  }

  @Get('admin')
  adminRoute() {
    return {
      message: 'Admin route accessed successfully',
    };
  }
}
