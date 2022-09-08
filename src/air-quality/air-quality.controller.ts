import { Body, Controller, Get, Post } from '@nestjs/common';
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
	@Post('coordinates')
	public async getAirQualityByLatAndLong(@Body() airQualityDto: AirQualityDto) {
		return await this.airQualityService.getAirQualityByLatAndLong(airQualityDto);
	}

	/**
     * getAirQualityByLatAndLong
     */
	@Get('paris')
	public async getPairHighestAirPollution() {
		return await this.airQualityService.getPairHighestAirPollution();
	}
}
