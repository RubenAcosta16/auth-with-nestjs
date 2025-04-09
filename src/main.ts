import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import { CustomExceptionsFilter } from './lib/shared/filters/custom-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // Aplicar el filtro global
  app.useGlobalFilters(new CustomExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
