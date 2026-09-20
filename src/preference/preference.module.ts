import { Module } from '@nestjs/common';
import { PreferenceRepository } from './preference.repository';

@Module({
  providers: [PreferenceRepository],
  exports: [PreferenceRepository],
})
export class PreferenceModule {}
