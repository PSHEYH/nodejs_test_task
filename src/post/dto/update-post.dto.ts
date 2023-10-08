import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ type: String, description: 'Title of post', required: false })
  @IsOptional()
  @IsString()
  title?: string;
  @ApiProperty({
    type: String,
    description: 'Content of post',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;
  @ApiProperty({
    type: String,
    description: 'Id of post owner',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
