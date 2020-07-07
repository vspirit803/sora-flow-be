import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

@Schema({ toJSON: { getters: true, virtuals: false } })
export class BaseSchema extends Document {
  /**mongodb内部唯一标识id */
  @Prop({ default: () => new ObjectId(), select: false })
  _id: ObjectId;

  /**版本号 */
  @Prop({ required: false, select: false })
  __v: number;

  /**业务唯一标识id */
  @Prop({ default: () => new ObjectId() })
  id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
