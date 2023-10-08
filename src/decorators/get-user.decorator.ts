import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/user.entity';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Pick<User, 'id' | 'role'> => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
