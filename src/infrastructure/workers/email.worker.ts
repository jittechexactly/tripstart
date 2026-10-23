import { MailerService } from "@nestjs-modules/mailer";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

type VerificationJobData = {
    to: string;
    name: string;
    otp: string;
};
@Processor('email')
export class EmailProcessor extends WorkerHost {
    constructor(private readonly mailer: MailerService) {
        super();
        console.log("worker running")
    }

    async process(job: Job<VerificationJobData>): Promise<void> {
        switch (job.name) {
            case 'verification':
                await this.mailer.sendMail({
                    to: job.data.to,
                    subject: 'Verify your email',
                    text: `Hi ${job.data.name}, your verification code is ${job.data.otp}. It expires in 10 minutes.`,
                });
                break;
            default:
                throw new Error(`Unknown job: ${job.name}`);
        }
    }
}