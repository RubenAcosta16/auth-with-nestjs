import { UserRepository } from 'src/lib/User/domain/UserRepository';
import { AuthRepository } from '../domain/AuthRepository';
import { roles } from 'src/lib/User/UserTypes';
import { User } from 'src/lib/User/domain/User';
import { UserId } from 'src/lib/User/domain/Props/UserId';
import { UserName } from 'src/lib/User/domain/Props/UserName';
import { UserEmail } from 'src/lib/User/domain/Props/UserEmail';
import { UserPassword } from 'src/lib/User/domain/Props/UserPassword';
import { UserRole } from 'src/lib/User/domain/Props/UserRole';
import { UserCreate } from 'src/lib/User/application/UserCreate';

export class AuthRegister {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
  ) {}

  async run(
    // id: string,
    name: string,
    email: string,
    password: string,
    role: roles,
  ): Promise<void> {
    const userApplication = new UserCreate(this.userRepository);

    const id = this.authRepository.generateId();
    const hashedPassword = await this.authRepository.hashPassword(password);

    const newUser = new User(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),
      new UserPassword(hashedPassword),
      new UserRole(role),
    );

    return await userApplication.run(
      newUser.id.value,
      newUser.name.value,
      newUser.email.value,
      newUser.password.value,
      newUser.role.value,
    );
  }
}
