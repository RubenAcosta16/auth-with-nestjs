import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { InMemoryUserRepository } from 'src/lib/User/infrastructure/db/InMemoryUserRepository';
import { AuthTokenInfraestrucutre } from '../token';
import { AuthLogin } from '../../application/AuthLogin';
import { AuthRegister } from '../../application/AuthRegister';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { AuthAdminMiddleware } from '../../middleware/authAdmin.middleware';

@Module({
  controllers: [AuthController],
  // imports: [InMemoryUserRepository],
  providers: [
    {
      provide: 'UserRepository',
      useClass: InMemoryUserRepository,
    },
    {
      provide: 'AuthRepository',
      useClass: AuthTokenInfraestrucutre,
    },
    {
      provide: 'AuthLogin',
      useFactory: (
        userRepository: InMemoryUserRepository,
        authRepository: AuthTokenInfraestrucutre,
      ) => new AuthLogin(userRepository, authRepository),
      inject: ['UserRepository', 'AuthRepository'],
    },
    {
      provide: 'AuthRegister',
      useFactory: (
        userRepository: InMemoryUserRepository,
        authRepository: AuthTokenInfraestrucutre,
      ) => new AuthRegister(userRepository, authRepository),
      inject: ['UserRepository', 'AuthRepository'],
    },
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes('/');
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/auth/protected',
      method: RequestMethod.GET,
    });
    consumer.apply(AuthMiddleware, AuthAdminMiddleware).forRoutes({
      path: '/auth/admin',
      method: RequestMethod.GET,
    });
  }
}
