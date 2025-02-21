export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  googleId: string | null;
  githubId: string | null;
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
};

export type CreateUser = {
  name: string;
  email: string;
  password: string;
  googleId?: string | null;
  githubId?: string | null;
};

export type UpdateUser = Partial<CreateUser>;
