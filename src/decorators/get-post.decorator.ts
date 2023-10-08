import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Post } from 'src/post/post.entity';

export const GetPost = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Pick<Post, 'id' | 'content' | 'title' | 'userId'> => {
    const request = ctx.switchToHttp().getRequest();
    return request.post;
  }
);
