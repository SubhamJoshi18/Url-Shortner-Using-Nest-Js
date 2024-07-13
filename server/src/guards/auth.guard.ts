import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const authToken = request.headers['authorization'];
      if (!authToken) {
        throw new UnauthorizedException('Authorization Token is Missing');
      }
      const payload = await this.jwtService.verify(authToken, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      if (typeof payload === undefined || !payload) {
        throw new BadRequestException('Payload is missing');
      }
      request.user = payload;
      return true;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
