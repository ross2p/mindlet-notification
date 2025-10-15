import { Module } from '@nestjs/common';
import { BaseEmailModule } from './base-email/base-email.module';
import { WelcomeEmailModule } from './welcome-email/welcome-email.module';
import { MailConfirmationModule } from './mail-confirmation/mail-confirmation.module';
import { TwoFactorModule } from './two-factor/two-factor.module';
@Module({
  imports: [
    BaseEmailModule,
    WelcomeEmailModule,
    MailConfirmationModule,
    TwoFactorModule,
  ],
})
export class AppModule {}
