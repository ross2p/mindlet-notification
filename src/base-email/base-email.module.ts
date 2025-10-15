import { Module } from '@nestjs/common';
import { BaseEmailService } from './base-email.service';

@Module({
  providers: [BaseEmailService],
})
export class BaseEmailModule {}
