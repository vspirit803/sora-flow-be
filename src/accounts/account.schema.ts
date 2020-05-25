import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: { virtuals: true },
})
export class Account extends Document {
  @Prop({ select: false })
  id: string;

  @Prop()
  name: string;

  @Prop({ select: false })
  password: string;

  @Prop({ required: false, select: false })
  __v: number;

  @Prop()
  roleId: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
AccountSchema.virtual('role', {
  ref: 'Role',
  localField: 'roleId',
  foreignField: '_id',
  justOne: true,
});
