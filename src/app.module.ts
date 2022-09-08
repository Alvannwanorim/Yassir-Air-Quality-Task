import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronJobsModule } from './cron-jobs/cron-jobs.module';
import { AirQualityModule } from './air-quality/air-quality.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
		ConfigModule.forRoot(),
		ScheduleModule.forRoot(),
		MongooseModule.forRoot(`${process.env.MONGO_URL}`),
		CronJobsModule,
		AirQualityModule
	],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {}
