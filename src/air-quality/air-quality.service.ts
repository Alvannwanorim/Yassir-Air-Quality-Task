import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { AirQualityDto, CreateAirQualityDto } from './dto/air-quality.dto';
import { AirQuality, AirQualityDocument } from './schema/air-quality.schema';
import { Model } from 'mongoose';
@Injectable()
export class AirQualityService {
	constructor(@InjectModel(AirQuality.name) private airQualityModel: Model<AirQualityDocument>) {}
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

	/**
     * @Params 
     * @Return 
     */
	public async createAirQualityObject(latitude: string, longitude: string) {
		const airQuality = await this.FetchAirQualityByLatAndLong(latitude, longitude);
		const pollution = airQuality.data.current.pollution;
		const newAirQuality = new this.airQualityModel({
			ts: pollution,
			aqius: pollution.aqius,
			mainus: pollution.mainus,
			aqicn: pollution.aqicn,
			maincn: pollution.maincn
		});
		await newAirQuality.save();
		return newAirQuality;
	}
}
