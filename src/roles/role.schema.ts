import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

@Schema({
  toJSON: { getters: true, virtuals: false },
})
export class Role extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop({
    default: [],
    get() {
      return this.authorizedOperationsList ?? this._doc.authorizedOperations;
    },
  })
  /**授权操作列表 */
  authorizedOperations: Array<string>;

  @Prop({ default: 'normal' })
  type: 'normal' | 'version';

  @Prop()
  /**组织id */
  organizationId: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.set('timestamps', true);

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
