import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaType, Types } from 'mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

@Schema({
  toJSON: { getters: true, virtuals: false },
})
export class ApplicationRecord extends BaseSchema {
  @Prop()
  /**所属应用 */
  application: string;

  @Prop({
    get: function () {
      return this.populatedAccount ?? this._doc.account;
    },
  })
  /**填写人 */
  account: string;

  @Prop()
  /**组织 */
  organization: string;

  @Prop({ default: {} })
  /**填的数据 */
  data: Types.Map<any>;
}

export const ApplicationRecordSchema = SchemaFactory.createForClass(ApplicationRecord);
ApplicationRecordSchema.set('timestamps', true);

ApplicationRecordSchema.virtual('populatedApplication', {
  ref: 'Application',
  localField: 'application',
  foreignField: 'id',
  justOne: true,
});

ApplicationRecordSchema.virtual('populatedAccount', {
  ref: 'Account',
  localField: 'account',
  foreignField: 'id',
  justOne: true,
});

ApplicationRecordSchema.virtual('populatedOrganization', {
  ref: 'Organization',
  localField: 'organization',
  foreignField: 'id',
  justOne: true,
});
