import { Request } from 'express';
import { PublicUser } from '@/modules/users/users.types';

export type AuthRequest = Request & {
  user: PublicUser;
};

export type AuthResponse = {
  user: PublicUser;
};

export type JwtPayload = {
  email: string;
  sub: string;
};
