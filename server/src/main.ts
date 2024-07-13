import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { GlobalExceptionFilter } from './expection/global.httpException';
import corsOptions from './config/cors.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const logger = app.get(Logger);
  app.enableCors(corsOptions);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  await app.listen(port);
}
bootstrap();
