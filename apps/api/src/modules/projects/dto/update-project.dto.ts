import { z } from 'zod';

export const UpdateProjectSchema = z.object({
  name: z.string().nonempty('Name cannot be empty if provided').optional(),
  repository: z
    .string()
    .nonempty('Repository cannot be empty if provided')
    .optional(),
});

export type UpdateProjectDto = z.infer<typeof UpdateProjectSchema>;
