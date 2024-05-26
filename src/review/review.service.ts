import { Injectable } from '@nestjs/common';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>
  ) {}

  async createReview(dto: CreateReviewDto, userId: string) {
    let review = await this.reviewRepository.insert({
      rating: dto.rating,
      userId: userId,
      postId: dto.postId,
    });
    return review.generatedMaps[0];
  }

  async updateReview(dto: UpdateReviewDto) {
    return await this.reviewRepository.update({ id: dto.id }, dto);
  }

  async findById(id: string) {
    return await this.reviewRepository.findOne({ where: { id: id } });
  }

  async deleteById(id: string) {
    return await this.reviewRepository.delete({ id: id });
  }
}
