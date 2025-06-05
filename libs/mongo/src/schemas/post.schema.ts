import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String }) title: string;
  @Prop({ type: String }) content: string;
  @Prop({ type: Types.ObjectId, ref: 'User' }) author: Types.ObjectId;
  @Prop({ default: false }) published: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
