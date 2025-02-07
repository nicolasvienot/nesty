import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserType } from '@prisma/client';

export type AuthenticatedUser = Omit<UserType, 'password'>;

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

export const User = createParamDecorator(
  (
    data: keyof AuthenticatedUser,
    ctx: ExecutionContext,
  ): AuthenticatedUser[keyof AuthenticatedUser] | AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
