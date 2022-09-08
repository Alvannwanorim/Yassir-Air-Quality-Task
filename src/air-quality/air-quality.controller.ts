import { Body, Controller, Get } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityDto } from './dto/air-quality.dto';

@Controller('air-quality')
export class AirQualityController {
	constructor(private readonly airQualityService: AirQualityService) {}

	/**
     * getAirQualityByNearestCity
     */
	@Get()
	public async getAirQualityByNearestCity() {
		return await this.airQualityService.getAirQualityByNearestCity();
	}

	/**
     * getAirQualityByLatAndLong
     */
	@Get('coordinates')
	public async getAirQualityByLatAndLong(@Body() airQualityDto: AirQualityDto) {
		return await this.airQualityService.getAirQualityByLatAndLong(airQualityDto);
	}
}
