import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Project } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  private prisma = new PrismaClient();

  async create(
    userId: string,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        userId,
      },
    });
  }

  async findAll(userId: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: { userId },
    });
  }

  async findOne(userId: string, id: string): Promise<Project | null> {
    const project = await this.prisma.project.findFirst({
      where: { id, userId },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(
    userId: string,
    id: string,
    updateProjectDto: CreateProjectDto,
  ): Promise<Project | null> {
    return await this.prisma.project.update({
      where: { id, userId },
      data: updateProjectDto,
    });
    // TODO: Handle errors (not found, etc.)
  }

  async remove(userId: string, id: string): Promise<Project | null> {
    return await this.prisma.project.delete({
      where: { id, userId },
    });
    // TODO: Handle errors (not found, etc.)
  }
}
