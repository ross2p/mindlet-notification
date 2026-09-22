import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { EmailChangeCodeTemplate } from './email-change-code.template';
import { EmailChangeWarningTemplate } from './email-change-warning.template';

@Injectable()
export class EmailChangeService {
  constructor(private readonly emailService: EmailService) {}

  async sendChangeCode(email: string, code: string): Promise<void> {
    await this.emailService.sendEmailWithTemplate(
      email,
      new EmailChangeCodeTemplate(code),
    );
  }

  async sendChangeWarning(email: string, newEmail: string): Promise<void> {
    await this.emailService.sendEmailWithTemplate(
      email,
      new EmailChangeWarningTemplate(newEmail),
    );
  }
}
