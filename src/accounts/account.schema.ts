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

  @Prop({
    default: [],
    get: function () {
      return this.organizationsList ?? this._doc.organizations;
    },
  })
  /**组织列表 */
  organizations: Array<string>;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
AccountSchema.virtual('role', {
  ref: 'Role',
  localField: 'roleId',
  foreignField: 'id',
  justOne: true,
});
AccountSchema.virtual('organizationsList', {
  ref: 'Organization',
  localField: 'organizations',
  foreignField: 'id',
  options: { select: { versionId: false, supervisorId: false } },
});
