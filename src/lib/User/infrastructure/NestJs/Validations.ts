import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { roles } from '../../UserTypes';

export class FindOneByIdParams {
  @IsString()
  @Length(5, 255)
  id: string;
}

export class FindOneByEmailParams {
  @IsString()
  @IsEmail()
  email: string;
}

export class Create {
  @IsString()
  @Length(5, 255)
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsEnum(roles)
  role: roles;
}

export class Update {
  @IsString()
  @Length(5, 255)
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsEnum(roles)
  role: roles;
}
