import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe, VersioningType } from '@nestjs/common';
import { } from '@nestjs/common';
import { env } from './config/env.config';
import { GlobalResponseInterceptor } from './common/interceptors/globalResponsehandler.interceptor';
import { GlobalhttpExceptionFilter } from './common/filters/globalHttpexception.filter';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      const errors = validationErrors.reduce<Record<string, string[]>>(
        (acc, err) => {
          acc[err.property] = Object.values(err.constraints ?? {});
          return acc;
        },
        {},
      );

      return new BadRequestException({
        message: 'Validation failed',
        errors,
      });
    },
  }));

  app.enableVersioning({
    type: VersioningType.URI
  });
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  app.useGlobalFilters(new GlobalhttpExceptionFilter());

  app.setGlobalPrefix('api');
  app.enableCors({ origin: env.CORS_ORIGIN });

  await app.listen(env.PORT ?? 3000);
}
bootstrap();
