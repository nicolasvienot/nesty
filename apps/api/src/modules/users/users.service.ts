import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserSchema } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User, CreateUser, UpdateUser } from './users.types';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(payload: CreateUser): Promise<User> {
    const validationResult = CreateUserSchema.safeParse(payload);
    if (!validationResult.success) {
      throw new HttpException(
        'Validation failed: ' +
          validationResult.error.errors
            .map((e) => `${e.path.join('.')} - ${e.message}`)
            .join(', '),
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      return await this.usersRepository.create({
        ...payload,
        password: hashedPassword,
      });
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2002') {
        throw new HttpException('Email must be unique', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.usersRepository.findOne(id);
  }

  async update(id: string, payload: UpdateUser): Promise<User | null> {
    try {
      return await this.usersRepository.update(id, payload);
    } catch (error) {
      if (isPrismaError(error) && error.code === 'P2002') {
        throw new HttpException('Email must be unique', HttpStatus.CONFLICT);
      }
      // TODO: Handle other errors (not found, etc.)
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<User | null> {
    return await this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }

  async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

function isPrismaError(error: any): error is { code: string } {
  return typeof error === 'object' && error !== null && 'code' in error;
}
