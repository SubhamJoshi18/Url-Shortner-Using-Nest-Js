import { Module } from '@nestjs/common';
import { ShortenUrlController } from './shortenUrl.controller';
import { ShortenUrlServiceImpl } from './shortenUrl.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import userSchema, { User } from 'src/database/schemas/auth.schema';
import urlSchema, { Url } from 'src/database/schemas/url.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
      {
        name: Url.name,
        schema: urlSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [ShortenUrlController],
  providers: [ShortenUrlServiceImpl],
})
export class ShortenUrlModule {}
