import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { EventClientService, Services, UserQuery } from '@ross2p/common';
import { EmailService } from '../email/email.service';
import type { NotificationUserView } from '../user.view';
import { WelcomeEmailTemplateDto } from './welcome.template';

@Injectable()
export class WelcomeEmailService implements OnModuleInit {
  constructor(
    private readonly emailService: EmailService,
    @Inject(Services.USER)
    private readonly userService: EventClientService,
  ) {}

  async onModuleInit() {
    this.userService.subscribeToResponseOf(UserQuery.GET_BY_ID);
    await this.userService.connect();
  }

  async sendWelcomeEmail(userId: string) {
    const user = await this.userService.sendAndReturnPromise<
      NotificationUserView,
      { userId: string }
    >(UserQuery.GET_BY_ID, { userId });

    await this.emailService.sendEmailWithTemplate(
      user.email,
      new WelcomeEmailTemplateDto(user.firstName),
    );
  }
}
