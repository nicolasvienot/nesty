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
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../users/user.decorator';

@Controller('projects')
// Secure all routes
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @User('id') userId: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    console.log(userId);
    return this.projectsService.create(userId, createProjectDto);
  }

  @Get()
  findAll(@User('id') userId: string) {
    return this.projectsService.findAll(userId);
  }

  @Get(':id')
  findOne(@User('id') userId: string, @Param('id') projectId: string) {
    return this.projectsService.findOne(userId, projectId);
  }

  @Put(':id')
  update(
    @User('id') userId: string,
    @Param('id') projectId: string,
    @Body() updateProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.update(userId, projectId, updateProjectDto);
  }

  @Delete(':id')
  remove(@User('id') userId: string, @Param('id') projectId: string) {
    return this.projectsService.remove(userId, projectId);
  }
}
