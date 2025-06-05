import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from 'src/common/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.GUEST })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
