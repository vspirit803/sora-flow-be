import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

@Schema({
  toJSON: { getters: true, virtuals: false },
})
export class Account extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  nickname: string;

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
    type: [],
    get: function () {
      const organizationList = this.organizationList ?? this._doc.organizations;
      const result = [];
      for (let i = 0; i < organizationList.length; i++) {
        const curr: Record<string, any> = {};
        curr.id = organizationList[i].id;
        //组织信息
        if (organizationList[i].name) {
          curr.name = organizationList[i].name;
        }

        //角色信息
        if (this.organizationRolesList) {
          //populate过,是对象
          curr.roles = this.organizationRolesList[i];
        } else {
          //未populate,取原值
          curr.roles = this._doc.organizations[i].roles;
        }
        result.push(curr);
      }
      return result;
    },
  })
  /**组织列表 */
  organizations: Array<{ id: string; roles: Array<string> }>;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
AccountSchema.virtual('role', {
  ref: 'Role',
  localField: 'roleId',
  foreignField: 'id',
  justOne: true,
});
AccountSchema.virtual('organizationList', {
  ref: 'Organization',
  localField: 'organizations.id',
  foreignField: 'id',
  options: { select: { versionId: false, supervisorId: false } },
});
AccountSchema.virtual('organizationRolesList', {
  ref: 'Role',
  localField: 'organizations.roles',
  foreignField: 'id',
});
