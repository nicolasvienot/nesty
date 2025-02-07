export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
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
};

export type UpdateUser = Partial<CreateUser>;
