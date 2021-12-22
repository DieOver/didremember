/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { TransformInterceptor } from './middlewares/transform.interceptor';
import * as helmet from 'helmet';
import { logger } from './middlewares/logger.middleware';

async function bootstrap() {
  const port = process.env.PORT || 3333;
  const globalPrefix = 'api';

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);
  app.use(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
  app.use(helmet());

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
