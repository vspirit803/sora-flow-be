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
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.virtual('authorizedOperationsList', {
  ref: 'Menu',
  localField: 'authorizedOperations',
  foreignField: 'id',
  justOne: true,
});
