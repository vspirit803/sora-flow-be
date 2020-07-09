import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

@Schema({
  toJSON: { getters: true, virtuals: false },
})
export class Organization extends BaseSchema {
  @Prop()
  /**组织名称 */
  name: string;

  @Prop()
  /**版本id */
  versionId: string;

  @Prop({
    type: Object,
    get: function () {
      return this.versionInfo;
    },
  })
  /**版本 */
  version?: { id: string; name: string };

  @Prop()
  /**主管id */
  supervisorId: string;

  @Prop({
    type: Object,
    get: function () {
      return this.supervisorInfo;
    },
  })
  /**主管 */
  supervisor?: { id: string; name: string; nickname: string };

  @Prop({ default: 0 })
  totalMembers: number;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
OrganizationSchema.set('timestamps', true);

OrganizationSchema.virtual('supervisorInfo', {
  ref: 'Account',
  localField: 'supervisorId',
  foreignField: 'id',
  options: { select: { id: true, name: true, nickname: true } },
  justOne: true,
});

OrganizationSchema.virtual('versionInfo', {
  ref: 'Version',
  localField: 'versionId',
  foreignField: 'id',
  options: { select: { id: true, name: true } },
  justOne: true,
});
