import { Module } from '@nestjs/common';
import { PreferenceRepository } from './preference.repository';
import { PreferenceService } from './preference.service';

@Module({
  providers: [PreferenceRepository, PreferenceService],
  exports: [PreferenceRepository, PreferenceService],
})
export class PreferenceModule {}
