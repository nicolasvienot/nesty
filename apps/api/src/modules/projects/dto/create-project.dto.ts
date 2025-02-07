import { z } from 'zod';

export const CreateProjectSchema = z.object({
  name: z.string().nonempty('Name is required'),
  repository: z.string().nonempty('Repository is required'),
});

export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;
