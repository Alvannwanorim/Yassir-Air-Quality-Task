import { airQualityStub } from '../stubs/air-quality.stub';

export const AirQualityService = jest.fn().mockReturnValue({
	getAirQualityByLatAndLong: jest.fn().mockReturnValue(airQualityStub()),
	getAirQualityByNearestCity: jest.fn().mockReturnValue(airQualityStub())
});
