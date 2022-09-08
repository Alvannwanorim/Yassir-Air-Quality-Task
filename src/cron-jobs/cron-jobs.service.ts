import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AirQualityService } from 'src/air-quality/air-quality.service';

@Injectable()
export class CronJobsService {
	constructor(private readonly airQualityService: AirQualityService) {}
	private readonly logger = new Logger(CronJobsService.name);

	/**
     * @method Update Paris Air Quality
     * @Params 
     * @Returns 
     */
	public async getParisAirQuality() {
		const latitude: string = '48.856613';
		const longitude: string = '2.352222';

		await this.airQualityService.createAirQualityObject(latitude, longitude);
	}

	/**
     * @method Update the Air Quality for Paris 
     * @Params
     * @Returns 
     */
	@Cron('1 * * * * *')
	async handleCron() {
		this.logger.debug('Job Starts');
		await this.getParisAirQuality();
		this.logger.debug('Job Ends');
	}
}
