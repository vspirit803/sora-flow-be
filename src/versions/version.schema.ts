import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

@Schema({
  toJSON: { getters: true, virtuals: true },
})
export class Version extends BaseSchema {
  @Prop()
  /**版本名称 */
  name: string;

  @Prop()
  roleId: string;
}

export const VersionSchema = SchemaFactory.createForClass(Version);
VersionSchema.set('timestamps', true);

VersionSchema.virtual('role', {
  ref: 'Role',
  localField: 'roleId',
  foreignField: 'id',
  justOne: true,
});
