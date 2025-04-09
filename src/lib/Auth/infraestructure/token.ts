import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { EXPIRES_JWT, SALTROUNDS, SECRET_JWT_KEY } from 'src/lib/shared/config';
import { User } from 'src/lib/User/domain/User';
import { AuthRepository } from '../domain/AuthRepository';
import { v4 as uuidv4 } from 'uuid';

if (!SALTROUNDS) {
  throw new Error('Missing environment variables for JWT configuration');
}

export class AuthTokenInfraestrucutre implements AuthRepository {
  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, Number(SALTROUNDS));
  }

  public generateId(): string {
    return uuidv4();
  }

  public async generateToken(user: User): Promise<string> {
    // console.log(user);
    const token = jwt.sign(
      {
        id: user.id.value,
        name: user.name.value,
        email: user.email.value,
        role: user.role.value,
      },
      SECRET_JWT_KEY as string,
      { expiresIn: EXPIRES_JWT } as jwt.SignOptions,
    );

    return token;
  }

  public async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
