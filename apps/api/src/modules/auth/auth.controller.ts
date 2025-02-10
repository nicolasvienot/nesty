import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/modules/auth/auth.service';
import { UsersService } from '@/modules/users/users.service';
import { UseZodValidation } from '@/shared/zod/use-zod-validation.decorator';
import { User } from '@/modules/users/user.decorator';
import { handlePrismaError } from '@/utils/prisma.util';
import { LoginDto, LoginSchema } from '@/modules/auth/dto/login.dto';
import {
  CreateUserDto,
  CreateUserSchema,
} from '@/modules/users/dto/create-user.dto';
import {
  COOKIE_NAME,
  cookieConfig,
} from '@/modules/auth/strategies/cookie.config';
import { AuthResponse } from '@/modules/auth/auth.types';
import { User as UserType, PublicUser } from '@/modules/users/users.types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @UseZodValidation(LoginSchema)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Omit<AuthResponse, 'access_token'>> {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const auth = this.authService.login(user);

    res.cookie(COOKIE_NAME, auth.access_token, cookieConfig);

    return { user: auth.user };
  }

  @Post('register')
  @UseZodValidation(CreateUserSchema)
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Omit<AuthResponse, 'access_token'>> {
    try {
      const user = await this.usersService.create(createUserDto);
      const auth = this.authService.login(user);

      res.cookie(COOKIE_NAME, auth.access_token, cookieConfig);

      return { user: auth.user };
    } catch (error) {
      handlePrismaError(error);
    }
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(COOKIE_NAME);
    return { success: true };
  }

  @Get('session')
  @UseGuards(AuthGuard('jwt'))
  getSession(@User() user: UserType): PublicUser {
    return user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // This method is intentionally empty
    // When user clicks "Continue with Google", they hit this endpoint
    // AuthGuard('google') automatically redirects to Google's consent screen
    // After user consents, Google redirects back to your callback URL
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(
    @User() user: UserType,
    @Res({ passthrough: true }) res: Response,
  ) {
    const auth = this.authService.login(user);

    res.cookie(COOKIE_NAME, auth.access_token, cookieConfig);

    res.redirect(
      process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/dashboard',
    );
  }
}
