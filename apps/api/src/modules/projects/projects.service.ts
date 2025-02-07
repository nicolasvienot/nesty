import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from '@/modules/projects/projects.repository';
import {
  Project,
  CreateProject,
  UpdateProject,
} from '@/modules/projects/projects.types';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async create(userId: string, payload: CreateProject): Promise<Project> {
    return await this.projectsRepository.create(userId, payload);
  }

  async findAll(userId: string): Promise<Project[]> {
    return await this.projectsRepository.findAll(userId);
  }

  async findOne(userId: string, id: string): Promise<Project | null> {
    return await this.projectsRepository.findOne(userId, id);
  }

  async update(
    userId: string,
    projectId: string,
    payload: UpdateProject,
  ): Promise<Project | null> {
    return await this.projectsRepository.update(userId, projectId, payload);
  }

  async remove(userId: string, projectId: string): Promise<Project | null> {
    return await this.projectsRepository.delete(userId, projectId);
  }
}
