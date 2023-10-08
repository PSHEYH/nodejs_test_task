import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ type: String, description: 'Title of post' })
  @IsString()
  title: string;
  @ApiProperty({
    type: String,
    description: 'Content of post',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(40)
  content?: string;
}
