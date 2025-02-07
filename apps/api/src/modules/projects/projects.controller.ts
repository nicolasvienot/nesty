import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';
import { User } from '../users/user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './projects.types';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @User('id') userId: string,
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectsService.create(userId, createProjectDto);
  }

  @Get()
  findAll(@User('id') userId: string): Promise<Project[]> {
    return this.projectsService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @User('id') userId: string,
    @Param('id') projectId: string,
  ): Promise<Project | null> {
    return this.projectsService.findOne(userId, projectId);
  }

  @Put(':id')
  update(
    @User('id') userId: string,
    @Param('id') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project | null> {
    return this.projectsService.update(userId, projectId, updateProjectDto);
  }

  @Delete(':id')
  remove(
    @User('id') userId: string,
    @Param('id') projectId: string,
  ): Promise<Project | null> {
    return this.projectsService.remove(userId, projectId);
  }
}
