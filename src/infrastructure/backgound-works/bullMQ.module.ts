import { BullModule } from "@nestjs/bullmq";
import { Global, Module } from "@nestjs/common";
import { ConfigModule} from "@nestjs/config";

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        BullModule.forRoot({
            connection: {
                url: process.env.REDIS_URL,
                maxRetriesPerRequest: null,
            },
        }),
        BullModule.registerQueue({
            name: 'email',
            defaultJobOptions: {
                attempts: 3,
                removeOnComplete: true
            }
        }),
    ],
    controllers: [],
    providers: [],
    exports: [BullModule],
})
export class BullMQModule {

}