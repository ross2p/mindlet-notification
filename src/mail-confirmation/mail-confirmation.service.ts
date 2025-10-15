import { Inject, Injectable } from '@nestjs/common';
import { ClientService, UserQuery, Services } from '@ross2p/common';
import { UserEntity } from '@ross2p/database';
import { BaseEmailService } from '../base-email/base-email.service';
import { MailConfirmationTemplate } from './mail-confirmation.template';

@Injectable()
export class MailConfirmationService {
  constructor(
    private readonly emailService: BaseEmailService,
    @Inject(Services.USER)
    private readonly userService: ClientService,
  ) {}

  async sendConfirmationEmail(userId: string, confirmationCode: string) {
    const user = await this.userService.firstValueFrom<UserEntity, string>(
      UserQuery.GET_BY_ID,
      userId,
    );

    await this.emailService.sendEmailWithTemplate(
      user.email,
      new MailConfirmationTemplate(confirmationCode),
    );
  }

  async onModuleInit() {
    this.userService.subscribeToResponseOf(UserQuery.GET_BY_ID);
    await this.userService.connect();
  }
}
