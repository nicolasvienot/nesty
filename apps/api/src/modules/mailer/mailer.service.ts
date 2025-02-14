import { Injectable, Logger } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import {
  SendEmailOptions,
  EmailTemplateFunction,
} from '@/modules/mailer/mailer.types';
import * as path from 'path';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  constructor() {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      this.logger.warn('SENDGRID_API_KEY is not set');
      return;
    }
    SendGrid.setApiKey(apiKey);
  }

  async sendEmail({
    to,
    subject,
    template,
    context,
  }: SendEmailOptions): Promise<boolean> {
    try {
      const templatePath = path.resolve(
        __dirname,
        'templates',
        `${template}.template`,
      );
      const templateFn = (await import(templatePath)) as {
        default: EmailTemplateFunction;
      };

      const html = templateFn.default(context);

      await SendGrid.send({
        to,
        from: {
          email: process.env.SENDGRID_FROM_EMAIL || 'nesty@nicolasvienot.com',
          name: 'Nesty',
        },
        subject,
        html,
      });

      this.logger.log(`Email sent successfully to ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Error sending email: ${error.message}`);
      return false;
    }
  }
}
