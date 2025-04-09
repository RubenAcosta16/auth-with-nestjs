import { Module } from '@nestjs/common';
// import { UserModule } from './lib/User/infrastructure/NestJs/user.module';
import { AuthModule } from './lib/Auth/infraestructure/NestJs/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
