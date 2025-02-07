import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, "Name can't exceed 100 characters"),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(50, "Password can't exceed 50 characters"),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
