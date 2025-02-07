import { applyDecorators, UsePipes } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ZodValidationPipe } from '@/shared/zod/zod-validation.pipe';

export function UseZodValidation(schema: ZodSchema<any>) {
  return applyDecorators(UsePipes(new ZodValidationPipe(schema)));
}
