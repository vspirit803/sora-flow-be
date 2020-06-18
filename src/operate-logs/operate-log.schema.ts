import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';
import { Account } from 'src/accounts/account.schema';

@Schema({ toJSON: { getters: true, virtuals: false } })
export class OperateLog extends Document {
  @Prop({ default: () => new ObjectId(), select: false })
  _id: ObjectId;

  @Prop({ default: () => new ObjectId() })
  id: string;

  @Prop({ required: false, select: false })
  __v: number;

  @Prop({ required: false, default: () => new Date() })
  timestamp?: Date;

  @Prop()
  user: Account;

  @Prop()
  operateType: 'create' | 'update' | 'delete' | 'unknown';

  @Prop()
  operateTarget: string;

  @Prop({ required: false, default: () => ({}) })
  operateRawObject?: Types.Map<any>;

  @Prop({ required: false, default: () => 'success' })
  operateStatus?: 'success' | 'failed';

  @Prop({ required: false, default: () => ({}) })
  error?: Types.Map<any>;

  @Prop()
  ip: string;

  @Prop({ required: false, default: () => ({}) })
  requestBody?: Types.Map<any>;
}

export const OperateLogSchema = SchemaFactory.createForClass(OperateLog);
