import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  CommonModule,
  ErrorFilter,
  ExceptionFilter,
  GlobalFilter,
  globalPipe,
  RpcExpiryInterceptor,
} from '@ross2p/common';
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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExpiryInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: globalPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
