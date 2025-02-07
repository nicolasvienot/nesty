import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UseZodValidation } from '../../shared/zod/use-zod-validation.decorator';
import { User } from '../users/user.decorator';
import { LoginDto, LoginSchema } from './dto/login.dto';
import { CreateUserDto, CreateUserSchema } from '../users/dto/create-user.dto';
import { AuthResponse } from './auth.types';
import { User as UserType, PublicUser } from '../users/users.types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @UseZodValidation(LoginSchema)
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
  @UseZodValidation(CreateUserSchema)
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.usersService.create(createUserDto);
    return this.authService.login(user);
  }

  @Get('session')
  @UseGuards(AuthGuard('jwt'))
  getSession(@User() user: UserType): PublicUser {
    return user;
  }
}
