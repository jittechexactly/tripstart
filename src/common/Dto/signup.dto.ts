import { Injectable } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@Injectable()
export class SignupDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email!: string;
}