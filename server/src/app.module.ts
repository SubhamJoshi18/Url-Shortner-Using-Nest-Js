import { Logger, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ShortenUrlModule } from './shortenUrl/shortenUrl.module';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig from './config/env.config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRES_IN,
      },
    }),
    AuthModule,
    ShortenUrlModule,
  ],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule {}
