import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServiceImpl } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import userSchema, { User } from 'src/database/schemas/auth.schema';
import { BcryptService } from 'src/utils/bcrypt.utils';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthServiceImpl, BcryptService, JwtStrategy],
})
export class AuthModule {}
