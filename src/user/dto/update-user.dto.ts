import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class UpdateUserDto {
  @ApiProperty({ type: String, description: 'Email of user', required: false })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
  @ApiProperty({
    type: String,
    description: 'Password of user',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(7, 16, { message: 'Must be longer than 6 and shorter than 16' })
  password?: string;
  @ApiProperty({ type: String, description: 'User name', required: false })
  @IsOptional()
  @IsString()
  name?: string;
  @ApiProperty({ type: Number, description: 'User age', required: false })
  @IsOptional()
  @IsNumber()
  age?: number;
}
