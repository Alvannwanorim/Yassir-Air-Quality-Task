import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronJobsService {
	constructor() {}
	private readonly logger = new Logger(CronJobsService.name);

	@Cron('45 * * * * *')
	handleCron() {
		this.logger.debug('Called when the current second is 45');
	}
}
