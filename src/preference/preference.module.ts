import { Module } from '@nestjs/common';
import { PreferenceRepository } from './preference.repository';
import { PreferenceService } from './preference.service';
import { PreferenceController } from './preference.controller';

@Module({
  controllers: [PreferenceController],
  providers: [PreferenceRepository, PreferenceService],
  exports: [PreferenceRepository, PreferenceService],
})
export class PreferenceModule {}
