import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

type ProjectCreatedJob = {
  projectId: string;
  userId: string;
};

@Processor('main')
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name);

  @Process('process-project-created')
  async handleProjectCreated(job: Job<ProjectCreatedJob>) {
    this.logger.debug(`Processing project created job ${job.id}`);
    try {
      await this.processProjectCreated(job.data);
    } catch (error) {
      this.logger.error(`Failed to process project created: ${error.message}`);
      throw error;
    }
  }

  private async processProjectCreated(data: ProjectCreatedJob) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  }
}
