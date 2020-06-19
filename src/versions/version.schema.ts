import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

@Schema({
  toJSON: { getters: true, virtuals: true },
})
export class Version extends BaseSchema {
  @Prop()
  /**版本名称 */
  name: string;

  @Prop({ default: [], select: false })
  /**授权操作列表 */
  authorizedOperations: Array<string>;
}

export const VersionSchema = SchemaFactory.createForClass(Version);
VersionSchema.virtual('authorizedOperationsList', {
  ref: 'Menu',
  localField: 'authorizedOperations',
  foreignField: 'id',
  justOne: true,
});
