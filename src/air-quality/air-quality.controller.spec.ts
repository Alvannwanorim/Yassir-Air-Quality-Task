// AirQuality.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';

import { getModelToken } from '@nestjs/mongoose';
import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import { AirQuality } from './schema/air-quality.schema';

describe('AirQualityController', () => {
	let controller: AirQualityController;
	let service: AirQualityService;

	beforeAll(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [],
			controllers: [ AirQualityController ],
			providers: [
				AirQualityService,
				{
					provide: getModelToken(AirQuality.name),
					useValue: { Symbol: jest.fn() }
				}
			]
		}).compile();

		controller = app.get<AirQualityController>(AirQualityController);
		service = app.get<AirQualityService>(AirQualityService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
		expect(service).toBeDefined();
	});

	const AirQualityData = {
		ts: '2022-09-08T12:00:00.000Z',
		aqius: 168,
		mainus: 'p2',
		aqicn: 118,
		maincn: 'p2'
	};
	describe('Get AirQuality By Nearest City', () => {
		it('should return an object of AirQuality', async () => {
			jest
				.spyOn(service, 'getAirQualityByNearestCity')
				.mockResolvedValue({ result: { pollution: { AirQualityData } }, success: true });
			const AirQuality = await controller.getAirQualityByNearestCity();

			expect(AirQuality).toMatchObject({ result: { pollution: { AirQualityData } }, success: true });
		});

		it('should throw error record not found', async () => {
			jest.spyOn(service, 'getAirQualityByNearestCity').mockRejectedValue({ message: 'Records not found' });
			try {
				await controller.getAirQualityByNearestCity();
			} catch (e) {
				expect(e.message).toBe('Records not found');
			}
		});
	});
});
