import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Post } from 'src/post/post.entity';

export const GetUpdateFields = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string[] => {
    const request = ctx.switchToHttp().getRequest();
    return request.updateFields;
  }
);
