import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Teacher } from './teacher.schema';

export enum LessonStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Schema({ timestamps: true })
export class Lesson extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  class: Types.ObjectId;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop()
  content: string; // Nội dung bài học

  @Prop({ type: [Types.ObjectId], ref: 'Student' })
  absents: Types.ObjectId[]; // Học sinh vắng mặt

  @Prop({ type: Number })
  totalStudents: number; // sĩ số buổi học

  @Prop({
    type: String,
    enum: LessonStatus,
    default: LessonStatus.UPCOMING,
  })
  status: LessonStatus; // Trạng thái buổi học

  @Prop({ type: String })
  reasonCancelled?: string; // Lý do hủy buổi học

  @Prop({ type: Types.ObjectId, ref: 'Teacher' })
  teacher?: Teacher; // Giáo viên dạy buổi học

  @Prop({ type: Types.ObjectId, ref: 'Room' })
  room?: Types.ObjectId; // Phòng học

  @Prop({ type: File, default: [] })
  documents?: File[]; // Tập tin được tải lên
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
