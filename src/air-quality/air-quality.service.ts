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
			return data.data.current.pollution;
		} catch (err) {
			throw new NotFoundException('Record not found.');
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
			return data.data.current.pollution;
		} catch (err) {
			throw new Error('Record not found.');
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
		return airQuality;
	}

	/**
     * @Params 
     * @Return 
     */
	public async createAirQualityObject(latitude: string, longitude: string) {
		const airQuality = await this.FetchAirQualityByLatAndLong(latitude, longitude);
		const pollution = airQuality.data.current.pollution;

		const newAirQuality = new this.airQualityModel({
			ts: pollution.ts,
			aqius: pollution.aqius,
			mainus: pollution.mainus,
			aqicn: pollution.aqicn,
			maincn: pollution.maincn
		});
		await newAirQuality.save();
		return newAirQuality;
	}

	public async getMaxPollution() {
		return new Promise((resolve, reject) => {
			this.airQualityModel
				.find({})
				.select([ 'aqius', 'createdAt', 'updatedAt' ])
				.sort({ aqius: -1 })
				.limit(1)
				.exec(function(err, doc) {
					if (err) reject(err);
					return resolve(doc);
				});
		});
	}

	/**
     * @Params 
     * @Return 
     */
	public async getPairHighestAirPollution() {
		const airQuality = await this.getMaxPollution();
		return { aqius: airQuality[0].aqius, datetime: airQuality[0].createdAt };
	}
}
