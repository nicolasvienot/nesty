export const COOKIE_NAME = 'auth-token';

export const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
  maxAge: 24 * 60 * 60 * 1000, // 1 day
} as const;
