import { Module } from '@nestjs/common';
import { ProjectsController } from '@/modules/projects/projects.controller';
import { ProjectsService } from '@/modules/projects/projects.service';
import { PrismaModule } from '@/shared/prisma/prisma.module';
import { ProjectsRepository } from '@/modules/projects/projects.repository';
@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository],
})
export class ProjectsModule {}
