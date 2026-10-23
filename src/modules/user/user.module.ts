import { Module } from "@nestjs/common";
import { UserManagementController } from "./controllers/userManagement.controller";
import { UserManagementService } from "./service/userManagement.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./repositories/user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserManagementController],
    providers: [UserManagementService],
    exports: [UserManagementService],
})
export class UserModule {

}