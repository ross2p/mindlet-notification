import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { EmailChangeService } from './email-change.service';

@Module({
  imports: [EmailModule],
  providers: [EmailChangeService],
  exports: [EmailChangeService],
})
export class EmailChangeModule {}
