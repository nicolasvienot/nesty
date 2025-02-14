import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from '@/modules/queue/queue.service';
import { UserWorker } from '@/modules/queue/workers/user.worker';
import { MailerModule } from '@/modules/mailer/mailer.module';
import { UsersModule } from '@/modules/users/users.module';

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
    MailerModule,
    UsersModule,
  ],
  providers: [QueueService, UserWorker], // Add new workers here for now, can create a processor module later
  exports: [QueueService],
})
export class QueueModule {}
