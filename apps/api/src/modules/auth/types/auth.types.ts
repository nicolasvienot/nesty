import { Request } from 'express';
import { User } from '@prisma/client';

export type UserObject = {
  user: Omit<User, 'password'>;
};

export type AuthenticatedRequest = Request & UserObject;

export type JwtPayload = {
  email: string;
  name: string;
  sub: string;
};
