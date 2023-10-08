import { ApiProperty } from '@nestjs/swagger';

export class OmitPost {
  @ApiProperty({ type: String, description: 'Id of post' })
  id: string;
  @ApiProperty({ type: String, description: 'Title of post' })
  title: string;
  @ApiProperty({ type: String, description: 'Content of post' })
  content: string;
  @ApiProperty({
    type: String,
    description: 'Id of post owner',
    required: false,
  })
  userId?: string;
}
