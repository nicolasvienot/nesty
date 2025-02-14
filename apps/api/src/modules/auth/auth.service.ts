import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UsersService } from '@/modules/users/users.service';
import { QueueService } from '@/modules/queue/queue.service';
import { User, CreateUser } from '@/modules/users/users.types';
import { AuthResponse, GoogleUser } from '@/modules/auth/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private queueService: QueueService,
  ) {}

  login(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async register(createUser: CreateUser): Promise<AuthResponse> {
    const user = await this.usersService.create(createUser);

    await this.queueService.addJob('process-user-created', {
      userId: user.id,
    });

    return this.login(user);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user: User | null = await this.usersService.findByEmail(email);
    if (
      user &&
      (await this.usersService.verifyPassword(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  async validateOrCreateGoogleUser(googleUser: GoogleUser): Promise<User> {
    const user = await this.usersService.findByEmail(googleUser.email);

    if (user) {
      // If user exists but doesn't have googleId, link the account
      if (!user.googleId) {
        const updatedUser = await this.usersService.update(user.id, {
          googleId: googleUser.googleId,
        });
        if (!updatedUser) {
          throw new Error(`Failed to update user with id ${user.id}`);
        }
        return updatedUser;
      }
      return user;
    }

    // Create new user if doesn't exist
    const newUser = await this.usersService.create({
      email: googleUser.email,
      name: googleUser.name,
      googleId: googleUser.googleId,
      password: crypto.randomBytes(32).toString('hex'),
    });

    await this.queueService.addJob('process-user-created', {
      userId: newUser.id,
    });
    return newUser;
  }
}
