import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { GoogleStrategy } from '@/modules/auth/strategies/google.strategy';
import { GitHubStrategy } from '@/modules/auth/strategies/github.strategy';
import { AuthService } from '@/modules/auth/auth.service';
import { AuthController } from '@/modules/auth/auth.controller';
import { UsersModule } from '@/modules/users/users.module';
import { QueueModule } from '@/modules/queue/queue.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    QueueModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, GoogleStrategy, GitHubStrategy],
})
export class AuthModule {}
