import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { envConfig } from './helpers/env.helpers';
import { HttpExceptionFilter } from '@helper/error.helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO: apply swagger
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  await app.listen(envConfig.PORT || 3000);
}
bootstrap();
