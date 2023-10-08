import { ApiProperty } from '@nestjs/swagger';
import { User, UserRole } from '../user.entity';
import { IsEmail, IsString, IsEnum, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, description: 'Email of user' })
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({ type: String, description: 'Password of user' })
  @IsString()
  @Length(7, 16, { message: 'Must be longer than 6 and shorter than 16' })
  password: string;
  @ApiProperty({ type: String, description: 'Name of user', required: false })
  @IsString()
  name?: string;
  @ApiProperty({ type: Number, description: 'Age of user', required: false })
  @IsOptional()
  @IsString()
  age?: number;
  @ApiProperty({
    enum: UserRole,
    description: 'Role of user',
    required: false,
    example: UserRole.User,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
