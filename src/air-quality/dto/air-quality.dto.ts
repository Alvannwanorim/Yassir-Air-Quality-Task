import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AirQualityDto {
	@IsNotEmpty() public latitude: string;

	@IsNotEmpty() public longitude: string;
}
export class CreateAirQualityDto {
	@IsNotEmpty()
	@IsString()
	ts: string;

	@IsNotEmpty()
	@IsNumber()
	aqius: number;

	@IsNotEmpty()
	@IsString()
	mainus: string;

	@IsNotEmpty()
	@IsNumber()
	aqicn: number;

	@IsNotEmpty()
	@IsString()
	maincn: string;
}
