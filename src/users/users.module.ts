import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { Schemas } from 'libs/mongo';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: Schemas.UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
