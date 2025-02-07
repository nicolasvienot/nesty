import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Project, CreateProject, UpdateProject } from './projects.types';

@Injectable()
export class ProjectsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, payload: CreateProject): Promise<Project> {
    return await this.prisma.project.create({
      data: {
        ...payload,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(userId: string): Promise<Project[]> {
    return await this.prisma.project.findMany({
      where: { userId },
    });
  }

  async findOne(userId: string, id: string): Promise<Project | null> {
    return await this.prisma.project.findUnique({
      where: { id, userId },
    });
  }

  async update(
    userId: string,
    projectId: string,
    payload: UpdateProject,
  ): Promise<Project | null> {
    return await this.prisma.project.update({
      where: { id: projectId, userId },
      data: payload,
    });
  }

  async delete(userId: string, projectId: string): Promise<Project | null> {
    return await this.prisma.project.delete({
      where: { id: projectId, userId },
    });
  }
}
