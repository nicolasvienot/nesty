export type SendEmailOptions = {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
};

export type EmailTemplateFunction = (context: Record<string, any>) => string;
