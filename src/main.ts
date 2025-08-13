import { NestFactory } from '@nestjs/core';
import { AppModule } from './api';
import { ValidationPipe } from '@nestjs/common';
import { config } from './config';
import { AllExceptionsFilter } from './infrastructure';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  const apiPrefix = 'api/v1';
  app.setGlobalPrefix(apiPrefix);
  const port=config.APP_PORT

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/${apiPrefix}`);
  });}
bootstrap();
