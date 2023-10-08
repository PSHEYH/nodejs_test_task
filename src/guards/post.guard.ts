import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PostService } from 'src/post/post.service';
import { UserRole } from 'src/user/user.entity';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly postService: PostService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const idParam: string = request.params.id;
    if (idParam) {
      const post = await this.postService.find(idParam);
      if (!post) {
        throw new NotFoundException('Post not found');
      } else {
        if (user.role === UserRole.Admin) {
          request.post = post;
          request.updateFields = Object.getOwnPropertyNames(post);
          return true;
        } else {
          request.post = {
            id: post.id,
            title: post.title,
            content: post.content,
          };
          request.updateFields = ['title', 'content'];
          if (post.userId !== user.id) {
            throw new ForbiddenException();
          }
          return true;
        }
      }
    }
    return true;
  }
}
