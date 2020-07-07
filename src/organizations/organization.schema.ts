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

  @Prop()
  /**主管id */
  supervisorId: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
OrganizationSchema.set('timestamps', true);
