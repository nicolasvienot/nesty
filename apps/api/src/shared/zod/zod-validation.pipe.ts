import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform<T>(value: any, metadata: ArgumentMetadata): T {
    const validationResult = this.schema.safeParse(value);
    if (!validationResult.success) {
      throw new BadRequestException(
        'Validation failed: ' +
          validationResult.error.errors
            .map((e) => `${e.path.join('.')} - ${e.message}`)
            .join(', '),
      );
    }
    return validationResult.data as T;
  }
}
