import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ReviewService } from 'src/review/review.service';
import { UserRole } from 'src/user/user.entity';

@Injectable()
export class ReviewGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly reviewService: ReviewService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const id: string = request.body.id;
    const review = await this.reviewService.findById(id);
    if (!review) {
      throw new NotFoundException('Review not found');
    } else {
      if (user.role === UserRole.Admin) {
        request.review = review;
        return true;
      } else {
        request.review = review;
        if (review.userId !== user.id) {
          throw new ForbiddenException();
        }
        return true;
      }
    }

    return true;
  }
}
