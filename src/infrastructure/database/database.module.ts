import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                url: config.getOrThrow<string>('DB_URL'),
                ssl: config.get<boolean>('DB_SSL')
                    ? { rejectUnauthorized: false }
                    : false,
                autoLoadEntities: true,
                synchronize: config.get<string>('NODE_ENV') === 'development',
                migrationsRun: false,
                logging: false,
            }),
        })
    ]
})
export class DatabaseModule { }
