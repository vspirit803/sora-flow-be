import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

@Schema({ toJSON: { getters: true, virtuals: false } })
export class Department extends BaseSchema {
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

  @Prop()
  organization: string;

  @Prop()
  supervisor: string;

  @Prop({ default: [] })
  members: Array<string>;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
DepartmentSchema.set('timestamps', true);
