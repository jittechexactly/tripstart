import { Module } from "@nestjs/common";
import { AuthenticationController } from "./controllers/authentication.controller";
import { AuthenticationService } from "./service/authentication.service";
import { UserModule } from "../user/user.module";
import { BullMQModule } from "../../infrastructure/backgound-works/bullMQ.module";

@Module({
    imports: [UserModule, BullMQModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
    exports: [],
})
export class AuthenticationModule {

}