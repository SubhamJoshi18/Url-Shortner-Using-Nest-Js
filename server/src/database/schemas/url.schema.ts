import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UrlDocuments = Url & Document;
@Schema()
export class Url {
  @Prop({ unique: true, required: true })
  shortId: string;

  @Prop({ required: true, unique: true })
  redirectUrl: string;

  @Prop({ unique: true })
  shortUrl: string;

  @Prop({ default: 0 })
  totalClicks: number;

  @Prop()
  visitHistory: [{ timestamp: number }];
}

const urlSchema = SchemaFactory.createForClass(Url);
export default urlSchema;
