import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class QueueService implements OnModuleInit {
  private readonly logger = new Logger(QueueService.name);
  private isConnected = false;

  constructor(
    @InjectQueue('main')
    private queue: Queue,
  ) {}

  async onModuleInit() {
    try {
      await this.checkConnection();

      this.queue.on('error', (error) => {
        this.isConnected = false;
        this.logger.error(`Queue connection error: ${error.message}`);
      });

      this.queue.on('ready', () => {
        this.isConnected = true;
        this.logger.log('Queue connection ready');
      });
    } catch (error) {
      this.logger.error(`Failed to initialize queue: ${error.message}`);
      throw error;
    }
  }

  private async checkConnection(): Promise<void> {
    try {
      await this.queue.isReady();
      this.isConnected = true;
      this.logger.log('Successfully connected to Redis');
    } catch (error) {
      this.isConnected = false;
      this.logger.error(`Redis connection failed: ${error.message}`);
      throw error;
    }
  }

  async addJob(name: string, data: any) {
    if (!this.isConnected) {
      this.logger.warn(
        `Queue is not connected. Retrying connection before adding job...`,
      );
      await this.checkConnection();
      if (!this.isConnected) {
        throw new Error(
          `Queue is still not connected. Cannot add job: ${name}`,
        );
      }
    }

    this.logger.log(
      `Adding job to queue: ${name} with data: ${JSON.stringify(data)}`,
    );

    return this.queue.add(name, data, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: true,
    });
  }
}
