import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/Common/BaseSchema';

@Schema()
export class Role extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  text: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
