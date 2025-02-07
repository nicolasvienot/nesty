import { z } from 'zod';

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name must be at least 1 character long')
    .max(100, "Name can't exceed 100 characters")
    .optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(50, "Password can't exceed 50 characters")
    .optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
