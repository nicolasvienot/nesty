import { Module } from '@nestjs/common';
import { MailerService } from '@/modules/mailer/mailer.service';

@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
