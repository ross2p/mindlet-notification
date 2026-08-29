import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientService, Services, UserQuery } from '@ross2p/common';
import { EmailService } from '../email/email.service';
import type { NotificationUserView } from '../user.view';
import { MailConfirmationTemplate } from './mail-confirmation.template';

@Injectable()
export class MailConfirmationService implements OnModuleInit {
  constructor(
    private readonly emailService: EmailService,
    @Inject(Services.USER)
    private readonly userService: ClientService,
  ) {}

  async onModuleInit() {
    this.userService.subscribeToResponseOf(UserQuery.GET_BY_ID);
    await this.userService.connect();
  }

  async sendConfirmationEmail(userId: string, confirmationCode: string) {
    const user = await this.userService.sendAndReturnPromise<
      NotificationUserView,
      { userId: string }
    >(UserQuery.GET_BY_ID, { userId });

    await this.emailService.sendEmailWithTemplate(
      user.email,
      new MailConfirmationTemplate(confirmationCode),
    );
  }
}
