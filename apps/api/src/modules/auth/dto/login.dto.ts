import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(50, "Password can't exceed 50 characters"),
});

export type LoginDto = z.infer<typeof LoginSchema>;
