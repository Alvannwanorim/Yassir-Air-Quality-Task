import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { AirQualityDto } from './dto/air-quality.dto';

@Injectable()
export class AirQualityService {
	/**
     * @Method 
     * @Params
     * @returns Json of nearest city air quality 
     */
	public async FetchAirQualityByNearestCity() {
		const url = `${process.env.AIRVISUAL_URL}/v2/nearest_city?key=${process.env.AIRVISUAL_SECRET_KEY}`;
		try {
			const { data } = await axios.get(url);
			return data;
		} catch (err) {
			console.error(err.response.data);
			throw new NotFoundException('Error fetching data');
		}
	}
	/**
     * @Method 
     * @Params
     * @returns Json of nearest city air quality 
     */
	public async FetchAirQualityByLatAndLong(latitude: string, longitude: string) {
		const url = `${process.env.AIRVISUAL_URL}/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env
			.AIRVISUAL_SECRET_KEY}`;
		try {
			const { data } = await axios.get(url);
			return data;
		} catch (err) {
			console.error(err.response.data);
			throw new NotFoundException('Error fetching data');
		}
	}
	/**
     * @Params 
     * @Return 
     */
	public async getAirQualityByNearestCity() {
		const airQuality = await this.FetchAirQualityByNearestCity();
		return airQuality;
	}
	/**
     * @Params 
     * @Return 
     */
	public async getAirQualityByLatAndLong(airQualityDto: AirQualityDto) {
		const { longitude, latitude } = airQualityDto;
		const airQuality = await this.FetchAirQualityByLatAndLong(latitude, longitude);
		return { result: { pollution: airQuality.data.current.pollution } };
	}
}
