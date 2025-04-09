import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { InMemoryUserRepository } from '../db/InMemoryUserRepository';
import { UserFindAll } from '../../application/UserFindAll';
import { UserFindById } from '../../application/UserfindById';
import { UserFindByEmail } from '../../application/UserFindByEmail';
import { UserCreate } from '../../application/UserCreate';
import { UserUpdate } from '../../application/UserUpdate';
import { UserDelete } from '../../application/UserDelete';

@Module({
  controllers: [UserController],
  // imports: [InMemoryUserRepository],
  providers: [
    {
      provide: 'UserRepository',
      useClass: InMemoryUserRepository,
    },
    {
      provide: 'UserFindAll',
      useFactory: (repository: InMemoryUserRepository) =>
        new UserFindAll(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserFindById',
      useFactory: (repository: InMemoryUserRepository) =>
        new UserFindById(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserFindByEmail',
      useFactory: (repository: InMemoryUserRepository) =>
        new UserFindByEmail(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserCreate',
      useFactory: (repository: InMemoryUserRepository) =>
        new UserCreate(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserUpdate',
      useFactory: (repository: InMemoryUserRepository) =>
        new UserUpdate(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserDelete',
      useFactory: (repository: InMemoryUserRepository) =>
        new UserDelete(repository),
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}
