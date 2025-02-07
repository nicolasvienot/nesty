import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthRequest, AuthResponse } from './auth.types';
import { PublicUser } from '../users/users.types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.usersService.create(createUserDto);
    return this.authService.login(user);
  }

  @Get('session')
  @UseGuards(AuthGuard('jwt'))
  getSession(@Request() req: AuthRequest): PublicUser {
    return req.user;
  }
}
