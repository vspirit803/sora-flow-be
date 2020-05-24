import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Role extends Document {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop({ required: false, select: false })
  __v: number;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
