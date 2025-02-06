import { Request } from 'express';
import { User } from '@prisma/client';

export type AuthenticatedRequest = Request & {
  user: Omit<User, 'password'>;
};

export type JwtPayload = {
  email: string;
  sub: string;
};
