import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

@Schema({
  toJSON: { getters: true, virtuals: false },
})
export class Account extends BaseSchema {
  @Prop()
  name: string;

  @Prop({ select: false })
  password: string;

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
  foreignField: 'id',
  justOne: true,
});
