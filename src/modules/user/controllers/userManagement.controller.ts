import { Controller } from "@nestjs/common";
import { UserManagementService } from "../service/userManagement.service";

@Controller({
    path: "user",
    version: "1"
})
export class UserManagementController {
    constructor(private readonly userService: UserManagementService) { }
}