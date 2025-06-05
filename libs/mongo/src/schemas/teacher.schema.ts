import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Class } from './class.schema';

@Schema({ timestamps: true })
export class Teacher extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Class', default: [] })
  classes: Class[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
