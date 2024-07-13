import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus() || 500;
    const errorDetails = exception.getResponse();

    this.logger.error(
      `${request.method} ${request.originalUrl} has encountered an error`,
      errorDetails,
    );

    if (exception instanceof UnauthorizedException) {
      if (errorDetails['message'] === 'jwt expired') {
        return response.status(status).json({
          time: new Date().toISOString(),
          pathMessage: `${request.method} ${request.originalUrl} has encountered an authorization error`,
          errorDetails: {
            message:
              'JWT token has expired. Please log in again to get a new token.',
          },
        });
      } else {
        return response.status(status).json({
          time: new Date().toISOString(),
          pathMessage: `${request.method} ${request.originalUrl} has encountered an authorization error`,
          errorDetails: {
            message: 'Unauthorized. Please provide a valid token.',
          },
        });
      }
    }

    response.status(status).json({
      time: new Date().toISOString(),
      pathMessage: `${request.method} ${request.originalUrl} has encountered an error`,
      errorDetails: errorDetails,
    });
  }
}
