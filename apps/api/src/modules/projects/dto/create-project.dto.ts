import { z } from 'zod';

export const CreateProjectSchema = z.object({
  name: z.string(),
  repository: z.string().url(),
});

export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;
