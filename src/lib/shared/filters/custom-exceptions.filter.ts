import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  import {
    UserError,
    UserNotFoundError,
  } from 'src/lib/User/domain/errors';
  import { AuthInvalidCredentialsError } from 'src/lib/Auth/domain/errors';
  
  @Catch()
  export class CustomExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
  
      if (exception instanceof UserNotFoundError) {
        status = HttpStatus.NOT_FOUND;
        message = 'User not found';
      } else if (exception instanceof UserError) {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
      } else if (exception instanceof AuthInvalidCredentialsError) {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
        
      } else if (exception instanceof HttpException) {
        status = exception.getStatus();
        
        const responseMessage = exception.getResponse();
        message = typeof responseMessage === 'string' ? responseMessage : JSON.stringify(responseMessage);
      }
  
      response.status(status).json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
      });
    }
  }