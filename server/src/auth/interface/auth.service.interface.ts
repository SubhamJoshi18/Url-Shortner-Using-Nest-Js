import { RegisterUserDto } from '../dtos/register.user.dto';
import { ICustomLoginResponse } from '../../types/auth.interface';

export interface AuthService {
  registerUser(registerUserDto: RegisterUserDto): Promise<string>;
  loginUser(
    registerUserDto: RegisterUserDto,
  ): Promise<Partial<ICustomLoginResponse>>;
}
