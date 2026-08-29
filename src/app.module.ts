import { Module } from '@nestjs/common';
import { CommonModule } from '@ross2p/common';
import { EmailModule } from './email/email.module';
import { MailConfirmationModule } from './mail-confirmation/mail-confirmation.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { TwoFactorModule } from './two-factor/two-factor.module';
import { WelcomeEmailModule } from './welcome-email/welcome-email.module';

@Module({
  imports: [
    CommonModule,
    EmailModule,
    WelcomeEmailModule,
    MailConfirmationModule,
    PasswordResetModule,
    TwoFactorModule,
  ],
})
export class AppModule {}
