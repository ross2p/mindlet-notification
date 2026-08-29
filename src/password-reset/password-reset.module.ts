import { Module } from '@nestjs/common';
import { ClientModule, Services } from '@ross2p/common';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [ClientModule.register(Services.USER)],
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
})
export class PasswordResetModule {}
