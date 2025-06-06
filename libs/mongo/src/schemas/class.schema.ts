/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Room } from './room.schema';
import { Teacher } from './teacher.schema';

@Schema({ timestamps: true })
export class Class extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true })
  room: Room;

  @Prop()
  schedule?: string; // e.g., Thứ 2,4,6

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  teacher?: Teacher;
}

export type ClassDocument = Class & Document;

export const ClassSchema = SchemaFactory.createForClass(Class);
