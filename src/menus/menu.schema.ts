import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

@Schema({ toJSON: { getters: true, virtuals: false } })
export class Menu extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: () => new ObjectId() })
  id: string;

  @Prop({ default: () => new ObjectId(), select: false })
  _id: ObjectId;

  @Prop({ default: [] })
  namePath: Array<string>;

  @Prop({ default: [] })
  idPath: Array<string>;

  @Prop({ default: '' })
  parentId: string;

  @Prop({ default: '' })
  parentName: string;

  @Prop({ default: '' })
  icon: string;

  @Prop({ default: true })
  enable: boolean;

  @Prop({ required: true })
  type: string;

  @Prop({ default: true })
  visible: boolean;

  @Prop({ required: false, select: false })
  __v: number;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
