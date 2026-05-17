import { Inject, Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { WelcomeEmailTemplateDto } from './welcome.template';
import { ClientService, Services, UserQuery } from '@ross2p/common';
import type { NotificationUserView } from '../user.view';

@Injectable()
export class WelcomeEmailService {
  constructor(
    private readonly emailService: EmailService,
    @Inject(Services.USER)
    private readonly userService: ClientService,
  ) {}
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

  async onModuleInit() {
    this.userService.subscribeToResponseOf(UserQuery.GET_BY_ID);
    await this.userService.connect();
  }
}
