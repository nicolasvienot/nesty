import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from '@/modules/queue/queue.service';
import { QueueProcessor } from '@/modules/queue/queue.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: 'main',
    }),
  ],
  providers: [QueueService, QueueProcessor],
  exports: [QueueService],
})
export class QueueModule {}
