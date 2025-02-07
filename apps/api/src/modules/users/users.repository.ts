import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { User, CreateUser, UpdateUser } from './users.types';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateUser): Promise<User> {
    return await this.prisma.user.create({
      data: payload,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, payload: UpdateUser): Promise<User | null> {
    return await this.prisma.user.update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: string): Promise<User | null> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
}
