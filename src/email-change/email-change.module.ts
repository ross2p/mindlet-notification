import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { EmailChangeController } from './email-change.controller';
import { EmailChangeService } from './email-change.service';

@Module({
  imports: [EmailModule],
  controllers: [EmailChangeController],
  providers: [EmailChangeService],
})
export class EmailChangeModule {}
