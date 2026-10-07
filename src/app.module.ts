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
import { NotificationModule } from './notification/notification.module';
import { DatabaseModule } from './database/database.module';
import { PreferenceModule } from './preference/preference.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    EmailModule,
    NotificationModule,
    PreferenceModule,
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
