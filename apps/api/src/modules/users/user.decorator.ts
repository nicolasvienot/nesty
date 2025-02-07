import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PublicUser } from '@/modules/users/users.types';
import { AuthRequest } from '@/modules/auth/auth.types';

export const User = createParamDecorator(
  (
    data: keyof PublicUser,
    ctx: ExecutionContext,
  ): PublicUser[keyof PublicUser] | PublicUser => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
