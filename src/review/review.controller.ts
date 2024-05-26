import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewGuard } from 'src/guards/review.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReview(@GetUser() user, @Body() dto: CreateReviewDto) {
    return await this.reviewService.createReview(dto, user.id);
  }

  @UseGuards(JwtAuthGuard, ReviewGuard)
  @Patch()
  async updateReview(@Body() dto: UpdateReviewDto) {
    return await this.reviewService.updateReview(dto);
  }

  @UseGuards(JwtAuthGuard, ReviewGuard)
  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return await this.reviewService.deleteById(id);
  }
}
