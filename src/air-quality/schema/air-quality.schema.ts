import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
export type AirQualityDocument = AirQuality & Document;

@Schema({
	toJSON: {
		virtuals: true
	},
	toObject: {
		virtuals: true
	},
	timestamps: true
})
export class AirQuality {
	@Prop({
		type: String
	})
	ts: string;

	@Prop({
		type: Number
	})
	aqius: number;
	@Prop({
		type: String
	})
	mainus: string;

	@Prop({
		type: Number
	})
	aqicn: number;

	@Prop({
		type: String
	})
	maincn: string;
}
export const AirQualitySchema = SchemaFactory.createForClass(AirQuality);

AirQualitySchema.virtual('id').get(function() {
	return this._id;
});

AirQualitySchema.virtual('aqu_id').get(function() {
	return this._id;
});

AirQualitySchema.methods.toJSON = function() {
	const obj = this.toObject();

	delete obj._id;
	delete obj._iv;
	delete obj['updatedAt'];
	delete obj['createdAt'];
};
