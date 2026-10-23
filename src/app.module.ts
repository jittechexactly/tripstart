import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthenticationModule } from './modules/auth/authentication.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".env"
  }),
    DatabaseModule, AuthenticationModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
