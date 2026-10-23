import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationService } from "../service/authentication.service";
import { SignupDTO } from "../../../common/Dto/signup.dto";
import { UserResource } from "../../../common/resources/user.resource";
import { VerifyOtpDto } from "../../../common/Dto/verifyOtp.dto";

@Controller({
    version: '1',
    path: 'auth'
})
export class AuthenticationController {

    constructor(private readonly authService: AuthenticationService) {
    }

    @Post('signup')
    public async signup(@Body() signupRequest: SignupDTO) {
        return UserResource.from(await this.authService.signup(signupRequest));
    }

    @Post('verify-otp')
    public async verifyOtp(@Body() verifyOtpRequest: VerifyOtpDto) {
        const { user, tokens } = await this.authService.otpVerification(verifyOtpRequest);

        return {
            user: UserResource.from(user),
            tokens: {
                refreshToken: tokens.refreshToken,
                accessToken: tokens.accessToken,
            },
        };
    }

    public async signIn(@Body() signInRequest) {

    }

}