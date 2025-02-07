import { Module } from '@nestjs/common';
import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { ProjectsModule } from '@/modules/projects/projects.module';

@Module({
  imports: [UsersModule, AuthModule, ProjectsModule],
})
export class AppModule {}
