import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { UsersService } from '@/modules/users/users.service';
import { MailerService } from '@/modules/mailer/mailer.service';
import { UserCreatedJob } from '../jobs/user-created.job';

@Processor('main')
export class UserWorker {
  private readonly logger = new Logger(UserWorker.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  @Process('process-user-created')
  async handleUserCreated(job: Job<UserCreatedJob>) {
    this.logger.debug(`Processing user created job ${job.id}`);

    try {
      await this.processUserCreated(job.data);
    } catch (error) {
      this.logger.error(`Failed to process user created: ${error.message}`);
      throw error;
    }
  }

  private async processUserCreated(data: UserCreatedJob) {
    const user = await this.usersService.findOne(data.userId);

    if (!user) {
      this.logger.warn(`User with ID ${data.userId} not found`);
      return;
    }

    await this.mailerService.sendEmail({
      to: user.email,
      subject: 'Welcome to Nesty!',
      template: 'welcome',
      context: {
        name: user.name,
        loginUrl: `${process.env.FRONTEND_URL}/login`,
      },
    });

    this.logger.debug(`Welcome email sent to ${user.email}`);
  }
}
