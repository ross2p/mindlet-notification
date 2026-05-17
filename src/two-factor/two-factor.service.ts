import { Inject, Injectable } from '@nestjs/common';
import { ClientService, Services, UserQuery } from '@ross2p/common';
import { EmailService } from '../email/email.service';
import type { NotificationUserView } from '../user.view';
import { TwoFactorTemplate } from './two-factor.template';
import { Provider } from 'src/provider.enum';

@Injectable()
export class TwoFactorService {
  constructor(
    private readonly emailService: EmailService,
    @Inject(Services.USER)
    private readonly userService: ClientService,
  ) {}

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

  async sendTwoFactor(provider: Provider, userId: string, code: string) {
    return this.sendTwoFactorEmail(userId, code);
  }

  async onModuleInit() {
    this.userService.subscribeToResponseOf(UserQuery.GET_BY_ID);
    await this.userService.connect();
  }
}
