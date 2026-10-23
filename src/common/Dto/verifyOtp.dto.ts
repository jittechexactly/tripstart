import { Injectable } from "@nestjs/common";
import { IsNotEmpty, MaxLength } from "class-validator";

@Injectable()
export class VerifyOtpDto {
    @IsNotEmpty()
    userId!: string;

    @IsNotEmpty()
    @MaxLength(6)
    otp!: string;
}