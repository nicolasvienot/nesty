import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  @Cron(CronExpression.EVERY_HOUR)
  async handleHourlyTask() {
    this.logger.debug('Running hourly task');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.logger.debug('Hourly task completed successfully');
    } catch (error) {
      this.logger.error('Failed to run hourly task:', error);
    }
  }
}
