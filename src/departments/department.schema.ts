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

  @Prop({
    get() {
      return this.supervisorInfo ?? this._doc.supervisor;
    },
  })
  supervisor: string;

  @Prop({
    default: [],
    get() {
      return this.membersInfo ?? this._doc.members;
    },
  })
  members: Array<string>;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
DepartmentSchema.set('timestamps', true);

DepartmentSchema.virtual('supervisorInfo', {
  ref: 'Account',
  localField: 'supervisor',
  foreignField: 'id',
  options: { select: { id: true, name: true, nickname: true } },
  justOne: true,
});

DepartmentSchema.virtual('membersInfo', {
  ref: 'Account',
  localField: 'members',
  foreignField: 'id',
  options: { select: { id: true, name: true, nickname: true } },
});
