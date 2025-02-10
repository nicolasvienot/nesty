import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';
import { User } from '@/modules/users/users.types';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  async validateOrCreateGoogleUser(googleUser: {
    email: string;
    name: string;
    googleId: string;
  }) {
    let user = await this.usersService.findByEmail(googleUser.email);

    if (user) {
      // If user exists but doesn't have googleId, link the account
      if (!user.googleId) {
        user = await this.usersService.update(user.id, {
          googleId: googleUser.googleId,
        });
      }
    } else {
      // Create new user if doesn't exist
      user = await this.usersService.create({
        email: googleUser.email,
        name: googleUser.name,
        googleId: googleUser.googleId,
        password: Math.random().toString(36).slice(-8),
      });
    }

    return user;
  }
}
