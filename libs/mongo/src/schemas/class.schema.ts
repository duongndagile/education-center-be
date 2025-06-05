import { Prop, Schema } from '@nestjs/mongoose';
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
  email?: string;

  @Prop()
  phone?: string;

  @Prop()
  address?: string;

  @Prop()
  schedule?: string; // e.g., Thứ 2,4,6

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  teacher?: Teacher;
}
