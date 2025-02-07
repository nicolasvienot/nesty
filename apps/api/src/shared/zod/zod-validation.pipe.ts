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

  transform<T>(value: any, metadata: ArgumentMetadata): T {
    if (metadata.type === 'body') {
      const validationResult = this.schema.safeParse(value);
      if (!validationResult.success) {
        throw new BadRequestException(
          'Validation failed: \n' +
            validationResult.error.errors.map((e) => e.message).join('\n'),
        );
      }
      return validationResult.data as T;
    }
    return value as T;
  }
}
