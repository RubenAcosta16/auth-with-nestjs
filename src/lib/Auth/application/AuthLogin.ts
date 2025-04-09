import { UserEmail } from 'src/lib/User/domain/Props/UserEmail';
import { AuthToken } from '../domain/AuthToken';
import { UserRepository } from 'src/lib/User/domain/UserRepository';
import { AuthRepository } from '../domain/AuthRepository';
import { AuthInvalidCredentialsError } from '../domain/errors';
import { UserFindByEmail } from 'src/lib/User/application/UserFindByEmail';

export class AuthLogin {
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
  ) {}

  async run(email: string, password: string): Promise<AuthToken> {
    const userApplication = new UserFindByEmail(this.userRepository);

    const user = await userApplication.run(email);

    if (!user) {
      throw new AuthInvalidCredentialsError('Invalid credentials');
    }

    const isValidPassword = await this.authRepository.verifyPassword(
      password,
      user.password.value,
    );

    if (!isValidPassword) {
      throw new AuthInvalidCredentialsError('Invalid credentials');
    }

    const token = await this.authRepository.generateToken(user);

    return {
      token,
    };
  }
}
