import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import envConfig from 'src/config/env.config';
type strNum = string | number;

export class BcryptService {
  constructor(private configService: ConfigService) {}

  generateSalt = async () => {
    const salt: any =
      process.env.SALT !== undefined ? Number(process.env.SALT) : 10;
    return await bcrypt.genSalt(salt);
  };

  hashPassword = async (rawPassword: string, salt: strNum) => {
    return await bcrypt.hash(rawPassword, salt);
  };

  comparePassword = async (
    rawPassword: string | Buffer,
    hashedPassword: string,
  ) => {
    return bcrypt.compare(rawPassword, hashedPassword);
  };
}
