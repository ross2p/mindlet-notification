import { Inject, Injectable } from '@nestjs/common';
import { ClientService, Services, UserQuery } from '@ross2p/common';
import { BaseEmailService } from '../base-email/base-email.service';
import { UserEntity } from '@ross2p/database';
import { TwoFactorTemplate } from './two-factor.template';

@Injectable()
export class TwoFactorService {
  constructor(
    private readonly emailService: BaseEmailService,
    @Inject(Services.USER)
    private readonly userService: ClientService,
  ) {}
  async sendTwoFactorEmail(userId: string, code: string) {
    const user = await this.userService.firstValueFrom<UserEntity, string>(
      UserQuery.GET_BY_ID,
      userId,
    );

    await this.emailService.sendEmailWithTemplate(
      user.email,
      new TwoFactorTemplate(code),
    );
  }

  async onModuleInit() {
    this.userService.subscribeToResponseOf(UserQuery.GET_BY_ID);
    await this.userService.connect();
  }
}
