import { Module } from '@nestjs/common';
import { EventClientModule, Services } from '@ross2p/common';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [EventClientModule.register(Services.USER)],
  providers: [PasswordResetService],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
