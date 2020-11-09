import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

@Schema({
  toJSON: { getters: true, virtuals: false },
})
export class ApplicationRecordCollectionTask extends BaseSchema {
  @Prop({
    get: function () {
      return this.populatedOrganization ?? this._doc.organization;
    },
  })
  /**组织 */
  organization: string;

  @Prop({
    get: function () {
      return this.populatedPublisher ?? this._doc.publisher;
    },
  })
  /**任务发布人 */
  publisher: string;

  @Prop({
    get: function () {
      return this.populatedApplication ?? this._doc.application;
    },
  })
  /**关联的应用id */
  application: string;

  @Prop()
  /**状态 */
  status: string;

  @Prop()
  /**截止时间 */
  finalTime: Date;

  @Prop({
    default: [],
    get: function () {
      return this.populatedTasks ?? this._doc.tasks;
    },
  })
  /**关联任务id */
  tasks: Array<string>;
}

export const ApplicationRecordCollectionTaskSchema = SchemaFactory.createForClass(
  ApplicationRecordCollectionTask,
);
ApplicationRecordCollectionTaskSchema.set('timestamps', true);

ApplicationRecordCollectionTaskSchema.virtual('populatedOrganization', {
  ref: 'Organization',
  localField: 'organization',
  foreignField: 'id',
  justOne: true,
});

ApplicationRecordCollectionTaskSchema.virtual('populatedApplication', {
  ref: 'Application',
  localField: 'application',
  foreignField: 'id',
  justOne: true,
});

ApplicationRecordCollectionTaskSchema.virtual('populatedPublisher', {
  ref: 'Account',
  localField: 'publisher',
  foreignField: 'id',
  justOne: true,
});

ApplicationRecordCollectionTaskSchema.virtual('populatedTasks', {
  ref: 'Tasks',
  localField: 'tasks',
  foreignField: 'id',
});
