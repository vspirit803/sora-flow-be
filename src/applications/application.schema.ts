import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

export type ApplicationStatus = 'Designing' | 'Published' | 'Archive';

@Schema({
  toJSON: { getters: true, virtuals: false },
})
export class Application extends BaseSchema {
  @Prop()
  /**应用名称 */
  name: string;

  @Prop()
  /**所属组织 */
  organization: string;

  @Prop({
    get() {
      return this.populatedCreator ?? this._doc.creator;
    },
  })
  /**创建者 */
  creator: string;

  @Prop({
    get() {
      return this.populatedLastModifier ?? this._doc.lastModifier;
    },
  })
  /**最后修改者 */
  lastModifier?: string;

  @Prop({ default: 'Designing' })
  /**状态 */
  status: ApplicationStatus;

  @Prop({ default: [] })
  /**模型 */
  formModel: Array<any>;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
ApplicationSchema.set('timestamps', true);

ApplicationSchema.virtual('populatedCreator', {
  ref: 'Account',
  localField: 'creator',
  foreignField: 'id',
  justOne: true,
});

ApplicationSchema.virtual('populatedLastModifier', {
  ref: 'Account',
  localField: 'lastModifier',
  foreignField: 'id',
  justOne: true,
});
