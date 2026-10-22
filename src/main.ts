import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { env } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  app.enableVersioning({
    type: VersioningType.URI
  });

  app.setGlobalPrefix('api');
  app.enableCors({ origin: env.CORS_ORIGIN });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
