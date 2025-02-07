import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function handlePrismaError(error: unknown): never {
  console.log(error);
  if (
    error instanceof PrismaClientKnownRequestError &&
    error.code === 'P2002' &&
    error.meta?.target
  ) {
    const target = error.meta.target as string;
    const field = target.split('_')[1];
    const errorMessage = `${field.charAt(0).toUpperCase() + field.slice(1)} is already taken. Please choose a different value.`;
    throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
  }
  throw new HttpException(
    'An unexpected error occurred.',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}
