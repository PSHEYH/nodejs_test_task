import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ type: Number, description: 'Rating of review' })
  @Min(0)
  @Max(5)
  @IsInt()
  rating: number;
  
  @ApiProperty({
    type: String,
    description: 'Id of post',
  })
  @IsUUID()
  postId: string;
}
