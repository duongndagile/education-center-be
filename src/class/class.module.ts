import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schemas } from 'libs/mongo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Room', schema: Schemas.RoomSchema }]),
    MongooseModule.forFeature([{ name: 'Class', schema: Schemas.ClassSchema }]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
