import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

@Schema({
  toJSON: { getters: true, virtuals: false },
})
export class Task extends BaseSchema {
  @Prop({
    get: function () {
      return this.populatedOrganization ?? this._doc.organization;
    },
  })
  /**组织 */
  organization: string;

  @Prop({
    get: function () {
      return this.populatedAccount ?? this._doc.account;
    },
  })
  /**填写人 */
  account: string;

  @Prop()
  /**类别 */
  type: string;

  @Prop()
  /**状态 */
  status: string;

  @Prop()
  /**截止时间 */
  finalTime: Date;

  @Prop({ default: {} })
  /**填的数据 */
  metadata: Types.Map<any>;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.set('timestamps', true);

TaskSchema.virtual('populatedOrganization', {
  ref: 'Organization',
  localField: 'organization',
  foreignField: 'id',
  justOne: true,
});

TaskSchema.virtual('populatedAccount', {
  ref: 'Account',
  localField: 'account',
  foreignField: 'id',
  justOne: true,
});
