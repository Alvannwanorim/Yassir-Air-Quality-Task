import { IsNotEmpty, IsString } from 'class-validator';

export class AirQualityDto {
	@IsString()
	@IsNotEmpty()
	public latitude: string;

	@IsString()
	@IsNotEmpty()
	public longitude: string;
}
