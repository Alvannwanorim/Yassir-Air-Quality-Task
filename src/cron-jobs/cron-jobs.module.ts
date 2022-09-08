import { Module } from '@nestjs/common';
import { AirQualityModule } from 'src/air-quality/air-quality.module';
import { CronJobsService } from './cron-jobs.service';

@Module({
	imports: [ AirQualityModule ],
	providers: [ CronJobsService ]
})
export class CronJobsModule {}
