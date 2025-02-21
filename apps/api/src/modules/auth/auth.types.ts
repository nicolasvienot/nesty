import { Request } from 'express';
import { PublicUser } from '@/modules/users/users.types';

export type AuthRequest = Request & {
  user: PublicUser;
};

export type AuthResponse = {
  user: PublicUser;
  access_token: string;
};

export type JwtPayload = {
  email: string;
  sub: string;
};

export type GoogleUser = {
  email: string;
  name: string;
  googleId: string;
};

export type GithubUser = {
  email: string;
  name: string;
  githubId: string;
};
