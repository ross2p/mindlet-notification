import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  EventClientService,
  NotificationCoreProto,
  Services,
  UserQuery,
} from '@ross2p/common';
import { EmailService } from '../email/email.service';
import type { NotificationUserView } from '../user.view';
import { TwoFactorTemplate } from './two-factor.template';

@Injectable()
export class TwoFactorService implements OnModuleInit {
  constructor(
    private readonly emailService: EmailService,
    @Inject(Services.USER)
    private readonly userService: EventClientService,
  ) {}

  async onModuleInit() {
    this.userService.subscribeToResponseOf(UserQuery.GET_BY_ID);
    await this.userService.connect();
  }

  async sendTwoFactorEmail(userId: string, code: string) {
    const user = await this.userService.sendAndReturnPromise<
      NotificationUserView,
      { userId: string }
    >(UserQuery.GET_BY_ID, { userId });

    await this.emailService.sendEmailWithTemplate(
      user.email,
      new TwoFactorTemplate(code),
    );
  }

  async sendTwoFactor(
    _provider: NotificationCoreProto.Provider,
    userId: string,
    code: string,
  ) {
    return this.sendTwoFactorEmail(userId, code);
  }
}
