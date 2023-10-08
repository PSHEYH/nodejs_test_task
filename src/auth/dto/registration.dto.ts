import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class RegistrationDto {
  @ApiProperty({ type: String, description: 'Email of user' })
  @IsString()
  @IsEmail({}, { message: 'Must be email' })
  email: string;
  @ApiProperty({ type: String, description: 'Password of user' })
  @IsString()
  @Length(7, 16, { message: 'Must be longer than 6 and shorter than 16' })
  password: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Name of user', required: false })
  name?: string;
}
