import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from 'express';

@Catch(HttpException)
export class GlobalhttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const body = exception.getResponse();
        let message: string | string[] = exception.message;
        let errors: Record<string, string[]> | null = null;

        if (typeof body === 'object' && body !== null) {
            const b = body as any;
            if (typeof b.message === 'string') message = b.message;
            if (b.errors && typeof b.errors === 'object') errors = b.errors;
        }

        response.status(status).json({
            success: false,
            statusCode: status,
            message,
            errors,
            data: null,
            timestamp: new Date().toISOString(),
        });
    }
}