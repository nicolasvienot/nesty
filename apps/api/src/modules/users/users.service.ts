import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient, User as PrismaUser } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, CreateUserSchema } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async create(createUserDto: CreateUserDto): Promise<PrismaUser> {
    const validationResult = CreateUserSchema.safeParse(createUserDto);
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
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      return await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
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

  async findAll(): Promise<PrismaUser[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
    // TODO: Handle errors (not found, etc.)
  }

  async update(
    id: string,
    updateUserDto: CreateUserDto,
  ): Promise<PrismaUser | null> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
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

  async remove(id: string): Promise<PrismaUser | null> {
    return this.prisma.user.delete({
      where: { id },
    });
    // TODO: Handle errors (not found, etc.)
  }

  async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async findByEmail(email: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}

// Type guard to check if error is a Prisma error
function isPrismaError(error: any): error is { code: string } {
  return typeof error === 'object' && error !== null && 'code' in error;
}
