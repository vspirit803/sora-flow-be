import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: { getters: true, virtuals: false },
})
export class Account extends Document {
  @Prop()
  name: string;

  @Prop({ select: false })
  password: string;

  @Prop({ required: false, select: false })
  __v: number;

  @Prop()
  roleId: string;

  @Prop({
    get: function () {
      return this.role.name;
    },
  })
  roleName: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
AccountSchema.virtual('role', {
  ref: 'Role',
  localField: 'roleId',
  foreignField: '_id',
  justOne: true,
});
