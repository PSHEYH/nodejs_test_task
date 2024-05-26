import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsUUID, Max, Min } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty({ type: String, description: 'Id of review' })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: Number,
    description: 'New rating',
  })
  @Min(0)
  @Max(5)
  @IsInt()
  rating: number;
}
