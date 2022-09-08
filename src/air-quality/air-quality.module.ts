import { Module } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';

@Module({
  providers: [AirQualityService],
  controllers: [AirQualityController]
})
export class AirQualityModule {}
