import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { ProjectsRepository } from './projects.repository';
@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository],
})
export class ProjectsModule {}
