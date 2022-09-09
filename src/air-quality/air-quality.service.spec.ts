import { Test, TestingModule } from '@nestjs/testing';

import { getModelToken } from '@nestjs/mongoose';
import { AirQualityService } from './air-quality.service';
import { AirQuality } from './schema/air-quality.schema';

const mappingModel = {
	find: jest.fn(),
	create: jest.fn()
};
describe('AirQualityService', () => {
	let service: AirQualityService;
	let model: typeof mappingModel;

	beforeAll(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [ AirQualityService, { provide: getModelToken(AirQuality.name), useValue: mappingModel } ]
		}).compile();

		service = app.get<AirQualityService>(AirQualityService);
		model = app.get(getModelToken(AirQuality.name));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(model).toBeDefined();
	});

	const AirQualityData = {
		ts: '2022-09-08T12:00:00.000Z',
		aqius: 168,
		mainus: 'p2',
		aqicn: 118,
		maincn: 'p2'
	};

	describe('Get AirQuality By Nearest City', () => {
		it('should return all AirQuality', async () => {
			model.find.mockResolvedValue(AirQualityData);
			const res = await service.getAirQualityByNearestCity();

			expect(res).toMatchObject({ data: AirQualityData });
			expect(model.find).toHaveBeenCalledTimes(1);
		});

		it('should through in AirQuality list', async () => {
			model.find.mockRejectedValue({ message: 'hub not found!!' });
			try {
				await service.getAirQualityByNearestCity();
			} catch (e) {
				expect(e.message).toBe('Record not found.');
			}
		});
	});
});
