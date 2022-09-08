import { Module } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AirQuality, AirQualitySchema } from './schema/air-quality.schema';

@Module({
	imports: [ MongooseModule.forFeature([ { name: AirQuality.name, schema: AirQualitySchema } ]) ],
	providers: [ AirQualityService ],
	controllers: [ AirQualityController ],
	exports: [ AirQualityService, MongooseModule ]
})
export class AirQualityModule {}
