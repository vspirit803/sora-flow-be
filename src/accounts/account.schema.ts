import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Account extends Document {
  @Prop()
  name: string;

  @Prop({ select: false })
  password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
