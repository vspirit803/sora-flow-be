import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

@Schema({
  toJSON: { getters: true, virtuals: true },
})
export class Role extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop({ default: [], select: false })
  /**授权操作列表 */
  authorizedOperations: Array<string>;

  @Prop({ default: 'normal' })
  type: 'normal' | 'version';

  @Prop()
  /**组织id */
  organizationId: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.virtual('authorizedOperationsList', {
  ref: 'Menu',
  localField: 'authorizedOperations',
  foreignField: 'id',
});
RoleSchema.virtual('organization', {
  ref: 'Organization',
  localField: 'organizationId',
  foreignField: 'id',
  justOne: true,
});
