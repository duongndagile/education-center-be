import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Class } from './class.schema';
import { Lesson } from './lesson.schema';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop()
  birthday?: Date;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop()
  address?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true })
  class: Class;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', default: [] })
  lessons?: Lesson[];
}
