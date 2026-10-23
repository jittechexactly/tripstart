import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { SignupDTO } from "../../../common/Dto/signup.dto";
import { UserManagementService } from "../../user/service/userManagement.service";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import { User } from "../../user/repositories/user.repository";
import { VerifyOtpDto } from "../../../common/Dto/verifyOtp.dto";

@Injectable()
export class AuthenticationService {
    constructor(private userService: UserManagementService,
        @InjectQueue('email')
        private readonly emailQueue: Queue) { }

    public async signup(signupRequest: SignupDTO): Promise<User> {
        let user = await this.userService.findByEmail(signupRequest.email);

        if (user) {
            throw new ConflictException("Account already exists. Login to continue.")
        }

        user = await this.userService.create(signupRequest);

        await this.sendOtpOnEmail(user.email, user.name, Number(user.verificationOtp))

        return user;
    }

    public async otpVerification(verifyOtpRequest: VerifyOtpDto) {
        let user = await this.userService.findByUserId(verifyOtpRequest.userId);

        if (!user) {
            throw new NotFoundException("Wrong credentials.")
        }

        if (!user.otpExpiredAt || user.otpExpiredAt.getTime() < Date.now()) {
            throw new BadRequestException('Verification code has expired. Request a new one.');
        }

        if (user.verificationOtp && user.verificationOtp === verifyOtpRequest.otp) {
            return {
                user: await this.userService.update(verifyOtpRequest.userId, {
                    verificationOtp: null,
                    otpExpiredAt: null,
                    verified: true
                }),
                tokens: {
                    "refreshToken": "kjfhdfjjnfj",
                    "accessToken": "dkfhgujdffjnf"
                }
            };
        }

        throw new ForbiddenException("Invalid OTP or expired.");
    }

    public async sendOtpOnEmail(email: string, name: string, otp: number) {
        return await this.emailQueue.add(
            'verification',
            { to: email, name: name, otp },
            {
                attempts: 5,
                backoff: { type: 'exponential', delay: 2000 },
                removeOnComplete: true,
                removeOnFail: 500,
            },
        );
    }
}