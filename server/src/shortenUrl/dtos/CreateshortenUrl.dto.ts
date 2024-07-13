import { IsNotEmpty } from 'class-validator';

export class CreateshortenUrlDto {
  @IsNotEmpty()
  redirectUrl: string;
}
