import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

@Schema({ toJSON: { getters: true, virtuals: false } })
export class Menu extends BaseSchema {
  @Prop({ required: true })
  name: string;

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

  @Prop({ default: '' })
  url: string;

  @Prop({ default: true })
  enable: boolean;

  @Prop({ required: true })
  type: 'directory' | 'item';

  @Prop({ default: true })
  visible: boolean;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
