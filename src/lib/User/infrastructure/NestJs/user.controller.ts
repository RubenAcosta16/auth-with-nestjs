import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserFindAll } from '../../application/UserFindAll';
import { UserFindById } from '../../application/UserfindById';
import { UserCreate } from '../../application/UserCreate';
import { UserUpdate } from '../../application/UserUpdate';
import { UserDelete } from '../../application/UserDelete';
import { UserFindByEmail } from '../../application/UserFindByEmail';
import { Create, FindOneByIdParams, Update } from './Validations';
import { UserError, UserNotFoundError } from '../../domain/errors';

@Controller('user')
export class UserController {
  constructor(
    @Inject('UserFindAll') private readonly userFindAll: UserFindAll,
    @Inject('UserFindById') private readonly userFindById: UserFindById,
    // @Inject('UserFindByEmail')
    // private readonly userGetOneByEmail: UserFindByEmail,
    @Inject('UserCreate') private readonly userCreate: UserCreate,
    @Inject('UserUpdate') private readonly userUpdate: UserUpdate,
    @Inject('UserDelete') private readonly userDelete: UserDelete,
  ) {}

  @Get()
  async getAll() {
    return (await this.userFindAll.run()).map((u) =>
      u.mapToPrimitivesNoPassword(),
    );
  }

  @Get(':id')
  async getOneById(@Param() params: FindOneByIdParams) {
    return (await this.userFindById.run(params.id)).mapToPrimitivesNoPassword();
  }

  @Post()
  async createUser(@Body() { id, email, name, password, role }: Create) {
    return await this.userCreate.run(id, name, email, password, role);
  }

  @Put()
  async updateUser(@Body() { id, email, name, password, role }: Update) {
    return await this.userUpdate.run(id, name, email, password, role);
  }

  @Delete(':id')
  async deleteUser(@Param() params: FindOneByIdParams) {
    await this.userDelete.run(params.id);
  }
}
