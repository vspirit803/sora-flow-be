import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Account extends Document {
  @Prop()
  name: string;

  @Prop({ select: false })
  password: string;

  @Prop({ required: false, select: false })
  __v: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
