import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, description: 'Email of user' })
  @IsString({ message: 'Must be string'})
  @IsEmail({}, {message: 'Must be email'})
  email: string;
  @ApiProperty({ type: String, description: 'Password of user' })
  password: string;
}
