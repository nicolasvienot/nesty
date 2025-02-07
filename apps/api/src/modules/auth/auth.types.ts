import { Request } from 'express';
import { PublicUser } from '../users/users.types';

export type AuthRequest = Request & {
  user: PublicUser;
};

export type AuthResponse = {
  access_token: string;
  user: PublicUser;
};

export type JwtPayload = {
  email: string;
  sub: string;
};
