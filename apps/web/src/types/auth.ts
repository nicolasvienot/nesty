export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & {
  name: string;
};

export type AuthResponse = {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export type User = {
  id: string;
  email: string;
  name: string;
};
