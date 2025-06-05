import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Teacher } from './teacher.schema';

export type FileDocument = HydratedDocument<File>;

@Schema()
export class File {
  @Prop({ type: mongoose.Schema.Types.String })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String })
  mimetype: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  size: number;

  @Prop({ type: mongoose.Schema.Types.String })
  key: string;

  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  url: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  teacher: Teacher;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({
    type: mongoose.Schema.Types.Date,
    default: Date.now,
    updatedAt: Date.now,
  })
  updatedAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: String })
  createdBy: string;

  @Prop({ type: Boolean, default: false })
  isPublic: boolean;
}

export const FileSchema = SchemaFactory.createForClass(File);
