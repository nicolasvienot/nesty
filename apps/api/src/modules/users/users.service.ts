import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '@/modules/users/users.repository';
import { User, CreateUser, UpdateUser } from '@/modules/users/users.types';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(payload: CreateUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    return await this.usersRepository.create({
      ...payload,
      password: hashedPassword,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.usersRepository.findOne(id);
  }

  async update(id: string, payload: UpdateUser): Promise<User | null> {
    return await this.usersRepository.update(id, payload);
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
