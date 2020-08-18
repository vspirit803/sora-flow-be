import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

export enum ApplicationStatus {
  Designing = 'Designing',
  Published = 'Published',
  Archive = 'Archive',
}

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

  @Prop()
  /**创建者 */
  creator: string;

  @Prop()
  /**最后修改者 */
  lastModifier?: string;

  @Prop()
  /**状态 */
  status: ApplicationStatus;

  @Prop({ default: [] })
  /**模型 */
  formModel: Array<any>;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
ApplicationSchema.set('timestamps', true);
